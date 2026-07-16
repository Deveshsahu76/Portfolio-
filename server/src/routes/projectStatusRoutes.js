import express from 'express'

const router = express.Router()

const CACHE_TIME_MS =
  2 * 60 * 1000

let cachedStatuses = null
let cacheExpiresAt = 0

const projectMonitors = [
  {
    id:
      'portfolio-frontend',

    projectId:
      'portfolio',

    name:
      'Portfolio Website',

    service:
      'Frontend',

    method:
      'HEAD',

    url:
      'https://deveshsahuportfolio.vercel.app/',
  },

  {
    id:
      'portfolio-backend',

    projectId:
      'portfolio',

    name:
      'Portfolio API',

    service:
      'Backend',

    method:
      'GET',

    url:
      'https://portfolio-backend-4b9u.onrender.com/api/health',
  },

  {
    id:
      'queens-arena-frontend',

    projectId:
      'queens-arena',

    name:
      'Queens Arena',

    service:
      'Frontend',

    method:
      'HEAD',

    url:
      'https://queens-arena.vercel.app/',
  },

  {
    id:
      'ecommerce-frontend',

    projectId:
      'ecommerce-store',

    name:
      'E-Commerce Store',

    service:
      'Frontend',

    method:
      'HEAD',

    url:
      'https://e-commerce-nu-bay.vercel.app/',
  },
]

const checkService = async (
  monitor
) => {
  const startedAt =
    Date.now()

  const controller =
    new AbortController()

  const timeoutId =
    setTimeout(() => {
      controller.abort()
    }, 12000)

  try {
    const response =
      await fetch(
        monitor.url,
        {
          method:
            monitor.method ||
            'HEAD',

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
      Date.now() -
      startedAt

    const reachable =
      response.status < 500

    const state =
      !reachable
        ? 'offline'
        : response.status >= 400
          ? 'degraded'
          : 'online'

    return {
      ...monitor,

      online:
        reachable,

      state,

      httpStatus:
        response.status,

      responseTimeMs,

      checkedAt:
        new Date()
          .toISOString(),
    }
  } catch (error) {
    return {
      ...monitor,

      online: false,
      state: 'offline',
      httpStatus: null,

      responseTimeMs:
        Date.now() -
        startedAt,

      error:
        error.name ===
        'AbortError'
          ? 'Request timed out.'
          : 'Unable to reach service.',

      checkedAt:
        new Date()
          .toISOString(),
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
      'public, max-age=30, s-maxage=120, stale-while-revalidate=1800'
    )

    if (
      cachedStatuses &&
      Date.now() <
        cacheExpiresAt
    ) {
      return res
        .status(200)
        .json({
          success: true,
          cached: true,
          stale: false,
          data:
            cachedStatuses,
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

      const degradedServices =
        services.filter(
          (service) =>
            service.state ===
            'degraded'
        ).length

      const offlineServices =
        services.filter(
          (service) =>
            service.state ===
            'offline'
        ).length

      const responseTimes =
        services
          .map(
            (service) =>
              Number(
                service.responseTimeMs ||
                  0
              )
          )
          .filter(
            (value) =>
              Number.isFinite(
                value
              )
          )

      const averageResponseTimeMs =
        responseTimes.length > 0
          ? Math.round(
              responseTimes.reduce(
                (sum, value) =>
                  sum + value,
                0
              ) /
                responseTimes.length
            )
          : 0

      const fastestService =
        [...services]
          .filter(
            (service) =>
              service.online
          )
          .sort(
            (first, second) =>
              first.responseTimeMs -
              second.responseTimeMs
          )[0] || null

      const overallState =
        offlineServices > 0
          ? onlineServices > 0
            ? 'partial-outage'
            : 'major-outage'
          : degradedServices > 0
            ? 'degraded'
            : 'operational'

      const data = {
        services,

        totalServices:
          services.length,

        onlineServices,
        degradedServices,
        offlineServices,

        allOnline:
          onlineServices ===
          services.length,

        overallState,

        averageResponseTimeMs,

        fastestService:
          fastestService
            ? {
                id:
                  fastestService.id,

                name:
                  fastestService.name,

                responseTimeMs:
                  fastestService
                    .responseTimeMs,
              }
            : null,

        checkedAt:
          new Date()
            .toISOString(),
      }

      cachedStatuses =
        data

      cacheExpiresAt =
        Date.now() +
        CACHE_TIME_MS

      return res
        .status(200)
        .json({
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
        return res
          .status(200)
          .json({
            success: true,
            cached: true,
            stale: true,
            data:
              cachedStatuses,
          })
      }

      return res
        .status(502)
        .json({
          success: false,

          message:
            'Project status is temporarily unavailable.',
        })
    }
  }
)

export default router