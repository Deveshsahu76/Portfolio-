import express from 'express'
import SiteSetting from '../models/SiteSetting.js'
import ResumeFile from '../models/ResumeFile.js'
import ResumeDownload from '../models/ResumeDownload.js'
import {
  getBearerToken,
  safeCompare,
  verifyAdminToken,
} from '../middleware/adminAuth.js'

const router = express.Router()

const DEFAULT_RESUME_URL =
  '/resume.pdf'

const DEFAULT_AVAILABILITY = {
  status: 'available',
  statusLabel: 'Available',

  internship: true,
  freelance: true,
  interview: true,

  joiningTime: 'Within 7 days',

  workModes: [
    'Remote',
    'Hybrid',
    'On-site',
  ],

  preferredRoles: [
    'Full Stack',
    'Frontend',
    'Backend',
  ],

  location: 'India',
}

const cleanText = (
  value,
  maximumLength = 120
) => {
  if (
    typeof value !==
    'string'
  ) {
    return ''
  }

  return value
    .trim()
    .slice(0, maximumLength)
}

const cleanArray = (
  value,
  maximumItems = 8
) => {
  if (!Array.isArray(value)) {
    return []
  }

  return [
    ...new Set(
      value
        .map((item) =>
          cleanText(item, 60)
        )
        .filter(Boolean)
    ),
  ].slice(0, maximumItems)
}

const statusLabels = {
  available: 'Available',
  limited: 'Limited Availability',
  unavailable: 'Not Available',
}

const requireAdminAccess = (
  req,
  res,
  next
) => {
  const bearerToken =
    getBearerToken(req)

  if (bearerToken) {
    const verification =
      verifyAdminToken(
        bearerToken
      )

    if (verification.valid) {
      req.adminSession =
        verification.payload

      return next()
    }
  }

  const configuredKey =
    String(
      process.env.ADMIN_KEY || ''
    ).trim()

  const providedKey =
    String(
      req.get('x-admin-key') || ''
    ).trim()

  if (
    configuredKey &&
    providedKey &&
    safeCompare(
      providedKey,
      configuredKey
    )
  ) {
    return next()
  }

  return res.status(401).json({
    success: false,
    message:
      'Unauthorized admin request.',
  })
}

const readAvailability = async () => {
  const setting =
    await SiteSetting.findOne({
      key: 'availabilityProfile',
    })

  if (!setting?.value) {
    return {
      ...DEFAULT_AVAILABILITY,
      updatedAt: null,
    }
  }

  try {
    const parsed =
      JSON.parse(setting.value)

    return {
      ...DEFAULT_AVAILABILITY,
      ...parsed,

      updatedAt:
        setting.updatedAt || null,
    }
  } catch {
    return {
      ...DEFAULT_AVAILABILITY,

      updatedAt:
        setting.updatedAt || null,
    }
  }
}

const getResumeMeta = async () => {
  const [
    resumeSetting,
    versionSetting,
    updatedSetting,
    latestResumeFile,
  ] = await Promise.all([
    SiteSetting.findOne({
      key: 'resumeUrl',
    }),

    SiteSetting.findOne({
      key: 'resumeVersion',
    }),

    SiteSetting.findOne({
      key: 'resumeUpdatedAt',
    }),

    ResumeFile.findOne()
      .sort({
        createdAt: -1,
      })
      .select(
        'originalName size createdAt'
      )
      .lean(),
  ])

  const updatedAt =
    updatedSetting?.value ||
    latestResumeFile?.createdAt ||
    resumeSetting?.updatedAt ||
    null

  return {
    resumeUrl:
      resumeSetting?.value ||
      DEFAULT_RESUME_URL,

    version:
      versionSetting?.value ||
      '1.0',

    updatedAt,

    fileName:
      latestResumeFile
        ?.originalName ||
      'resume.pdf',

    fileSize:
      Number(
        latestResumeFile?.size ||
          0
      ),
  }
}

router.get(
  '/profile/availability',
  async (req, res) => {
    try {
      const availability =
        await readAvailability()

      res.set(
        'Cache-Control',
        'public, max-age=60, s-maxage=300, stale-while-revalidate=3600'
      )

      return res.status(200).json({
        success: true,
        data: availability,
      })
    } catch (error) {
      console.error(
        'Availability fetch error:',
        error.message
      )

      return res.status(200).json({
        success: true,
        fallback: true,

        data: {
          ...DEFAULT_AVAILABILITY,
          updatedAt: null,
        },
      })
    }
  }
)

router.put(
  '/profile/availability',
  requireAdminAccess,
  async (req, res) => {
    try {
      const requestedStatus =
        cleanText(
          req.body?.status,
          30
        ).toLowerCase()

      const status =
        Object.hasOwn(
          statusLabels,
          requestedStatus
        )
          ? requestedStatus
          : 'available'

      const availability = {
        status,

        statusLabel:
          statusLabels[status],

        internship:
          Boolean(
            req.body?.internship
          ),

        freelance:
          Boolean(
            req.body?.freelance
          ),

        interview:
          Boolean(
            req.body?.interview
          ),

        joiningTime:
          cleanText(
            req.body?.joiningTime,
            80
          ) ||
          DEFAULT_AVAILABILITY
            .joiningTime,

        workModes:
          cleanArray(
            req.body?.workModes,
            5
          ),

        preferredRoles:
          cleanArray(
            req.body
              ?.preferredRoles,
            8
          ),

        location:
          cleanText(
            req.body?.location,
            80
          ) ||
          DEFAULT_AVAILABILITY
            .location,
      }

      const setting =
        await SiteSetting
          .findOneAndUpdate(
            {
              key:
                'availabilityProfile',
            },

            {
              key:
                'availabilityProfile',

              value:
                JSON.stringify(
                  availability
                ),

              label:
                'Public Availability',

              description:
                'Live availability shown across the public portfolio.',
            },

            {
              new: true,
              upsert: true,
            }
          )

      return res.status(200).json({
        success: true,

        message:
          'Availability updated successfully.',

        data: {
          ...availability,

          updatedAt:
            setting.updatedAt,
        },
      })
    } catch (error) {
      console.error(
        'Availability update error:',
        error.message
      )

      return res.status(500).json({
        success: false,

        message:
          'Unable to update availability.',
      })
    }
  }
)

router.get(
  '/resume/meta',
  async (req, res) => {
    try {
      const meta =
        await getResumeMeta()

      res.set(
        'Cache-Control',
        'public, max-age=60, s-maxage=300, stale-while-revalidate=3600'
      )

      return res.status(200).json({
        success: true,
        data: meta,
      })
    } catch (error) {
      console.error(
        'Resume meta error:',
        error.message
      )

      return res.status(200).json({
        success: true,
        fallback: true,

        data: {
          resumeUrl:
            DEFAULT_RESUME_URL,

          version: '1.0',
          updatedAt: null,
          fileName: 'resume.pdf',
          fileSize: 0,
        },
      })
    }
  }
)

router.put(
  '/resume/meta',
  requireAdminAccess,
  async (req, res) => {
    try {
      const version =
        cleanText(
          req.body?.version,
          30
        ) || '1.0'

      const updatedAt =
        new Date().toISOString()

      await Promise.all([
        SiteSetting
          .findOneAndUpdate(
            {
              key:
                'resumeVersion',
            },

            {
              key:
                'resumeVersion',

              value: version,

              label:
                'Resume Version',

              description:
                'Public version of the active portfolio resume.',
            },

            {
              new: true,
              upsert: true,
            }
          ),

        SiteSetting
          .findOneAndUpdate(
            {
              key:
                'resumeUpdatedAt',
            },

            {
              key:
                'resumeUpdatedAt',

              value:
                updatedAt,

              label:
                'Resume Updated At',

              description:
                'Date when the active resume was last changed.',
            },

            {
              new: true,
              upsert: true,
            }
          ),
      ])

      const meta =
        await getResumeMeta()

      return res.status(200).json({
        success: true,

        message:
          'Resume metadata updated.',

        data: meta,
      })
    } catch (error) {
      console.error(
        'Resume meta update error:',
        error.message
      )

      return res.status(500).json({
        success: false,

        message:
          'Unable to update resume metadata.',
      })
    }
  }
)

router.post(
  '/resume/download',
  async (req, res) => {
    try {
      const page =
        cleanText(
          req.body?.page,
          120
        ) || '/'

      const source =
        cleanText(
          req.body?.source,
          80
        ) ||
        'portfolio'

      const referrer =
        cleanText(
          req.body?.referrer,
          300
        )

      await ResumeDownload.create({
        page,
        source,
        referrer,
      })

      return res.status(201).json({
        success: true,
      })
    } catch (error) {
      console.error(
        'Resume tracking error:',
        error.message
      )

      /*
       * Download should never fail
       * because tracking failed.
       */
      return res.status(200).json({
        success: true,
        tracked: false,
      })
    }
  }
)

router.get(
  '/resume/analytics',
  requireAdminAccess,
  async (req, res) => {
    try {
      const sevenDaysAgo =
        new Date(
          Date.now() -
            7 *
              24 *
              60 *
              60 *
              1000
        )

      const [
        totalDownloads,
        downloadsLast7Days,
        latestDownload,
        downloadsByPage,
        recentDownloads,
        meta,
      ] = await Promise.all([
        ResumeDownload
          .countDocuments(),

        ResumeDownload
          .countDocuments({
            createdAt: {
              $gte:
                sevenDaysAgo,
            },
          }),

        ResumeDownload
          .findOne()
          .sort({
            createdAt: -1,
          })
          .lean(),

        ResumeDownload.aggregate([
          {
            $group: {
              _id: '$page',
              count: {
                $sum: 1,
              },
            },
          },

          {
            $sort: {
              count: -1,
            },
          },

          {
            $limit: 10,
          },
        ]),

        ResumeDownload
          .find()
          .sort({
            createdAt: -1,
          })
          .limit(10)
          .lean(),

        getResumeMeta(),
      ])

      return res.status(200).json({
        success: true,

        data: {
          totalDownloads,

          downloadsLast7Days,

          lastDownloadAt:
            latestDownload
              ?.createdAt ||
            null,

          downloadsByPage:
            downloadsByPage.map(
              (item) => ({
                page:
                  item._id ||
                  '/',

                count:
                  item.count,
              })
            ),

          recentDownloads,

          resume: meta,
        },
      })
    } catch (error) {
      console.error(
        'Resume analytics error:',
        error.message
      )

      return res.status(500).json({
        success: false,

        message:
          'Unable to load resume analytics.',
      })
    }
  }
)

export default router