import {
  useEffect,
  useState,
} from 'react'

const CACHE_TIME_MS =
  5 * 60 * 1000

let cachedSnapshot = null
let pendingRequest = null

const fallbackData = {
  services: [],
  totalServices: 0,
  onlineServices: 0,
  offlineServices: 0,
  allOnline: false,
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

const loadStatuses = () => {
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

  pendingRequest = fetch(
    `${getApiUrl()}/api/projects/status`
  )
    .then(async (response) => {
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
            'Unable to load project status.'
        )
      }

      cachedSnapshot = {
        savedAt: Date.now(),
        data: result.data,
      }

      return result.data
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

export default function useProjectStatuses() {
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

    loadStatuses()
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
            'Project status unavailable.',
        }))
      })

    return () => {
      active = false
    }
  }, [])

  return state
}