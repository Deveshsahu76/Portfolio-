import {
  useEffect,
  useState,
} from 'react'

const CACHE_TIME_MS =
  90 * 1000

let cachedSnapshot = null
let pendingRequest = null

const fallbackData = {
  services: [],
  totalServices: 0,
  onlineServices: 0,
  degradedServices: 0,
  offlineServices: 0,
  allOnline: false,
  overallState: 'loading',
  averageResponseTimeMs: 0,
  fastestService: null,
  checkedAt: null,
}

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

const loadStatus = (
  force = false
) => {
  if (force) {
    cachedSnapshot = null
  }

  if (
    cachedSnapshot &&
    Date.now() -
      cachedSnapshot.savedAt <
      CACHE_TIME_MS
  ) {
    return Promise.resolve(
      cachedSnapshot.data
    )
  }

  if (pendingRequest) {
    return pendingRequest
  }

  pendingRequest =
    fetch(
      `${getApiUrl()}/api/projects/status`
    )
      .then(
        async (response) => {
          const result =
            await response
              .json()
              .catch(() => null)

          if (
            !response.ok ||
            !result?.success ||
            !result?.data
          ) {
            throw new Error(
              result?.message ||
                'Unable to load service status.'
            )
          }

          cachedSnapshot = {
            savedAt:
              Date.now(),

            data:
              result.data,
          }

          return result.data
        }
      )
      .finally(() => {
        pendingRequest = null
      })

  return pendingRequest
}

export default function useSystemStatus() {
  const [refreshKey, setRefreshKey] =
    useState(0)

  const [state, setState] =
    useState({
      data:
        cachedSnapshot?.data ||
        fallbackData,

      status:
        cachedSnapshot
          ? 'cached'
          : 'loading',

      error: '',
    })

  useEffect(() => {
    let active = true

    const update = (
      force = false
    ) => {
      loadStatus(force)
        .then((data) => {
          if (!active) return

          setState({
            data,
            status: 'live',
            error: '',
          })
        })
        .catch((error) => {
          if (!active) return

          setState((current) => ({
            ...current,

            status:
              cachedSnapshot
                ? 'cached'
                : 'offline',

            error:
              error.message ||
              'System status unavailable.',
          }))
        })
    }

    update(
      refreshKey > 0
    )

    const intervalId =
      window.setInterval(
        () => {
          update(true)
        },
        120000
      )

    return () => {
      active = false

      window.clearInterval(
        intervalId
      )
    }
  }, [refreshKey])

  const refresh = () => {
    cachedSnapshot = null

    setState((current) => ({
      ...current,
      status: 'loading',
      error: '',
    }))

    setRefreshKey(
      (current) =>
        current + 1
    )
  }

  return {
    ...state,
    refresh,
  }
}