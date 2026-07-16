import React, {
  useEffect,
  useState,
} from 'react'
import {
  FiBarChart2,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiRefreshCw,
  FiSave,
  FiUploadCloud,
} from 'react-icons/fi'
import {
  clearResumeMetaCache,
} from '../../hooks/useResumeUrl'

const getApiUrl = () => {
  if (
    typeof window !==
    'undefined'
  ) {
    const local =
      window.location.hostname ===
        'localhost' ||
      window.location.hostname ===
        '127.0.0.1'

    if (local) {
      return 'http://localhost:5000'
    }
  }

  return (
    import.meta.env.VITE_API_URL ||
    'https://portfolio-backend-4b9u.onrender.com'
  )
}

const formatDate = (
  dateValue
) => {
  if (!dateValue) {
    return 'No downloads yet'
  }

  try {
    return new Intl.DateTimeFormat(
      'en-IN',
      {
        dateStyle: 'medium',
        timeStyle: 'short',
      }
    ).format(
      new Date(dateValue)
    )
  } catch {
    return 'N/A'
  }
}

export default function ResumeManager({
  adminKey,
}) {
  const [resumeUrl, setResumeUrl] =
    useState('')

  const [draftUrl, setDraftUrl] =
    useState('')

  const [version, setVersion] =
    useState('1.0')

  const [updatedAt, setUpdatedAt] =
    useState(null)

  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null)

  const [loading, setLoading] =
    useState(false)

  const [uploading, setUploading] =
    useState(false)

  const [message, setMessage] =
    useState('')

  const [analytics, setAnalytics] =
    useState({
      totalDownloads: 0,
      downloadsLast7Days: 0,
      lastDownloadAt: null,
      downloadsByPage: [],
    })

  const loadResumeData =
    async () => {
      setLoading(true)

      setMessage(
        'Loading resume data...'
      )

      try {
        const metaResponse =
          await fetch(
            `${getApiUrl()}/api/resume/meta`
          )

        const metaResult =
          await metaResponse.json()

        if (
          !metaResponse.ok ||
          !metaResult?.success
        ) {
          throw new Error(
            metaResult?.message ||
              'Unable to load resume.'
          )
        }

        const meta =
          metaResult.data

        setResumeUrl(
          meta.resumeUrl ||
            '/resume.pdf'
        )

        setDraftUrl(
          meta.resumeUrl ||
            '/resume.pdf'
        )

        setVersion(
          meta.version ||
            '1.0'
        )

        setUpdatedAt(
          meta.updatedAt ||
            null
        )

        if (adminKey) {
          const analyticsResponse =
            await fetch(
              `${getApiUrl()}/api/resume/analytics`,
              {
                headers: {
                  'x-admin-key':
                    adminKey,
                },
              }
            )

          const analyticsResult =
            await analyticsResponse
              .json()

          if (
            analyticsResponse.ok &&
            analyticsResult?.success
          ) {
            setAnalytics(
              analyticsResult.data
            )
          }
        }

        setMessage(
          'Resume data loaded.'
        )
      } catch (error) {
        setMessage(
          error.message ||
            'Unable to load resume.'
        )
      } finally {
        setLoading(false)
      }
    }

  const saveResumeMeta =
    async () => {
      if (!adminKey) {
        throw new Error(
          'Please save admin key first.'
        )
      }

      const response =
        await fetch(
          `${getApiUrl()}/api/resume/meta`,
          {
            method: 'PUT',

            headers: {
              'Content-Type':
                'application/json',

              'x-admin-key':
                adminKey,
            },

            body:
              JSON.stringify({
                version:
                  version.trim() ||
                  '1.0',
              }),
          }
        )

      const result =
        await response.json()

      if (!response.ok) {
        throw new Error(
          result?.message ||
            'Unable to update resume metadata.'
        )
      }

      clearResumeMetaCache()

      setUpdatedAt(
        result.data?.updatedAt ||
          new Date().toISOString()
      )

      return result
    }

  const saveResumeUrl =
    async () => {
      if (!adminKey) {
        setMessage(
          'Please save admin key first.'
        )

        return
      }

      if (!draftUrl.trim()) {
        setMessage(
          'Resume URL is required.'
        )

        return
      }

      setLoading(true)

      setMessage(
        'Saving resume URL...'
      )

      try {
        const response =
          await fetch(
            `${getApiUrl()}/api/site-settings/resume`,
            {
              method: 'PUT',

              headers: {
                'Content-Type':
                  'application/json',

                'x-admin-key':
                  adminKey,
              },

              body:
                JSON.stringify({
                  resumeUrl:
                    draftUrl.trim(),
                }),
            }
          )

        const result =
          await response.json()

        if (!response.ok) {
          throw new Error(
            result?.message ||
              'Unable to save resume URL.'
          )
        }

        await saveResumeMeta()

        setResumeUrl(
          result.resumeUrl
        )

        setDraftUrl(
          result.resumeUrl
        )

        setMessage(
          'Resume URL, version and update date saved.'
        )
      } catch (error) {
        setMessage(
          error.message ||
            'Unable to save resume URL.'
        )
      } finally {
        setLoading(false)
      }
    }

  const handleFileChange = (
    event
  ) => {
    const file =
      event.target.files?.[0]

    if (!file) {
      setSelectedFile(null)
      return
    }

    if (
      file.type !==
      'application/pdf'
    ) {
      setSelectedFile(null)

      setMessage(
        'Only PDF files are allowed.'
      )

      return
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setSelectedFile(null)

      setMessage(
        'PDF must be less than 5MB.'
      )

      return
    }

    setSelectedFile(file)

    setMessage(
      `Selected: ${file.name}`
    )
  }

  const uploadResumePdf =
    async () => {
      if (!adminKey) {
        setMessage(
          'Please save admin key first.'
        )

        return
      }

      if (!selectedFile) {
        setMessage(
          'Choose a PDF first.'
        )

        return
      }

      setUploading(true)

      setMessage(
        'Uploading resume PDF...'
      )

      try {
        const response =
          await fetch(
            `${getApiUrl()}/api/site-settings/resume/upload`,
            {
              method: 'PUT',

              headers: {
                'Content-Type':
                  'application/pdf',

                'x-admin-key':
                  adminKey,

                'x-file-name':
                  encodeURIComponent(
                    selectedFile.name
                  ),
              },

              body: selectedFile,
            }
          )

        const result =
          await response.json()

        if (!response.ok) {
          throw new Error(
            result?.message ||
              'Unable to upload resume.'
          )
        }

        await saveResumeMeta()

        setResumeUrl(
          result.resumeUrl
        )

        setDraftUrl(
          result.resumeUrl
        )

        setSelectedFile(null)

        setMessage(
          'Resume uploaded. Version and update date saved.'
        )
      } catch (error) {
        setMessage(
          error.message ||
            'Unable to upload resume.'
        )
      } finally {
        setUploading(false)
      }
    }

  useEffect(() => {
    loadResumeData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey])

  return (
    <section className="resumeadmin-section">
      <div className="resumeadmin-heading">
        <div>
          <span>
            <FiFileText />
            Resume Manager
          </span>

          <h2>
            Resume upload and
            download analytics
          </h2>

          <p>
            Latest resume, version and
            analytics yahan manage
            honge.
          </p>
        </div>

        <button
          type="button"
          onClick={loadResumeData}
          disabled={loading}
        >
          <FiRefreshCw />

          {loading
            ? 'Loading...'
            : 'Refresh'}
        </button>
      </div>

      <div className="resumeadmin-analytics">
        <article>
          <FiDownload />

          <strong>
            {
              analytics.totalDownloads
            }
          </strong>

          <span>
            Total Downloads
          </span>
        </article>

        <article>
          <FiBarChart2 />

          <strong>
            {
              analytics
                .downloadsLast7Days
            }
          </strong>

          <span>
            Last 7 Days
          </span>
        </article>

        <article>
          <FiClock />

          <strong className="resumeadmin-date">
            {formatDate(
              analytics
                .lastDownloadAt
            )}
          </strong>

          <span>
            Last Download
          </span>
        </article>

        <article>
          <FiFileText />

          <strong>
            v{version}
          </strong>

          <span>
            Current Version
          </span>
        </article>
      </div>

      <div className="resumeadmin-grid">
        <div className="resumeadmin-card">
          <h3>
            Upload PDF from PC
          </h3>

          <label className="resumeadmin-upload">
            <FiUploadCloud />

            <strong>
              {selectedFile
                ? selectedFile.name
                : 'Choose resume PDF'}
            </strong>

            <span>
              PDF only · Maximum 5MB
            </span>

            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={
                handleFileChange
              }
            />
          </label>

          <label>
            Resume Version

            <input
              value={version}
              onChange={(event) =>
                setVersion(
                  event.target.value
                )
              }
              placeholder="2.0"
            />
          </label>

          <button
            type="button"
            onClick={
              uploadResumePdf
            }
            disabled={
              uploading ||
              !selectedFile
            }
            className="resumeadmin-primary"
          >
            <FiUploadCloud />

            {uploading
              ? 'Uploading...'
              : 'Upload Resume'}
          </button>
        </div>

        <div className="resumeadmin-card">
          <h3>
            Public Resume URL
          </h3>

          <label>
            Resume URL

            <input
              type="text"
              value={draftUrl}
              onChange={(event) =>
                setDraftUrl(
                  event.target.value
                )
              }
              placeholder="/resume.pdf or public URL"
            />
          </label>

          <div className="resumeadmin-current">
            <span>
              Last Updated
            </span>

            <strong>
              {formatDate(
                updatedAt
              )}
            </strong>
          </div>

          <div className="resumeadmin-actions">
            <button
              type="button"
              onClick={
                saveResumeUrl
              }
              disabled={loading}
              className="resumeadmin-primary"
            >
              <FiSave />
              Save URL
            </button>

            <a
              href={
                resumeUrl ||
                '/resume.pdf'
              }
              target="_blank"
              rel="noreferrer"
            >
              <FiExternalLink />
              View Current
            </a>
          </div>
        </div>
      </div>

      {analytics
        .downloadsByPage
        ?.length > 0 && (
        <div className="resumeadmin-pages">
          <h3>
            Downloads by Page
          </h3>

          {analytics
            .downloadsByPage
            .map((item) => (
              <div key={item.page}>
                <span>
                  {item.page}
                </span>

                <strong>
                  {item.count}
                </strong>
              </div>
            ))}
        </div>
      )}

      {message && (
        <div className="resumeadmin-message">
          <FiCheckCircle />
          {message}
        </div>
      )}
    </section>
  )
}