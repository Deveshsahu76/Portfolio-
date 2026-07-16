import express from 'express'

const router = express.Router()

const CACHE_TIME_MS =
  5 * 60 * 1000

let cachedStatuses = null
let cacheExpiresAt = 0

const projectMonitors = [
  {
    id: 'portfolio-frontend',
    projectId: 'portfolio',
    name: 'Portfolio Website',
    service: 'Frontend',
    url:
      'https://deveshsahuportfolio.vercel.app/',
  },

  {
    id: 'portfolio-backend',
    projectId: 'portfolio',
    name: 'Portfolio API',
    service: 'Backend',
    url:
      'https://portfolio-backend-4b9u.onrender.com/api/health',
  },

  {
    id: 'queens-arena-frontend',
    projectId: 'queens-arena',
    name: 'Queens Arena',
    service: 'Frontend',
    url:
      'https://queens-arena.vercel.app/',
  },

  {
    id: 'ecommerce-frontend',
    projectId: 'ecommerce-store',
    name: 'E-Commerce Store',
    service: 'Frontend',
    url:
      'https://e-commerce-nu-bay.vercel.app/',
  },
]

const checkService = async (
  monitor
) => {
  const startedAt = Date.now()

  const controller =
    new AbortController()

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, 12000)

  try {
    const response = await fetch(
      monitor.url,
      {
        method: 'HEAD',

        redirect:
          'follow',

        headers: {
          'User-Agent':
            'Devesh-Sahu-Portfolio-Monitor',
        },

        signal:
          controller.signal,
      }
    )

    const responseTimeMs =
      Date.now() - startedAt

    const online =
      response.status < 500

    return {
      ...monitor,
      online,

      state:
        online
          ? 'online'
          : 'degraded',

      httpStatus:
        response.status,

      responseTimeMs,

      checkedAt:
        new Date().toISOString(),
    }
  } catch (error) {
    return {
      ...monitor,
      online: false,
      state: 'offline',
      httpStatus: null,

      responseTimeMs:
        Date.now() - startedAt,

      error:
        error.name ===
        'AbortError'
          ? 'Request timed out.'
          : 'Unable to reach service.',

      checkedAt:
        new Date().toISOString(),
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

router.get(
  '/projects/status',
  async (req, res) => {
    res.set(
      'Cache-Control',
      'public, max-age=60, s-maxage=300, stale-while-revalidate=3600'
    )

    if (
      cachedStatuses &&
      Date.now() < cacheExpiresAt
    ) {
      return res.status(200).json({
        success: true,
        cached: true,
        stale: false,
        data: cachedStatuses,
      })
    }

    try {
      const services =
        await Promise.all(
          projectMonitors.map(
            checkService
          )
        )

      const onlineServices =
        services.filter(
          (service) =>
            service.online
        ).length

      const data = {
        services,
        totalServices:
          services.length,

        onlineServices,

        offlineServices:
          services.length -
          onlineServices,

        allOnline:
          onlineServices ===
          services.length,

        checkedAt:
          new Date().toISOString(),
      }

      cachedStatuses = data

      cacheExpiresAt =
        Date.now() +
        CACHE_TIME_MS

      return res.status(200).json({
        success: true,
        cached: false,
        stale: false,
        data,
      })
    } catch (error) {
      console.error(
        'Project status error:',
        error.message
      )

      if (cachedStatuses) {
        return res.status(200).json({
          success: true,
          cached: true,
          stale: true,
          data: cachedStatuses,
        })
      }

      return res.status(502).json({
        success: false,

        message:
          'Project status is temporarily unavailable.',
      })
    }
  }
)

export default router