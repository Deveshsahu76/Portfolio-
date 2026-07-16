import {
  useEffect,
  useState,
} from 'react'

const CACHE_TIME_MS =
  15 * 60 * 1000

let cachedSnapshot = null
let pendingRequest = null

const fallbackData = {
  username:
    'Deveshsahu76',

  name:
    'Devesh Sahu',

  profileUrl:
    'https://github.com/Deveshsahu76',

  avatarUrl: '',

  summary: {
    publicRepositories: 0,
    activeRepositories: 0,
    maintainedRepositories: 0,
    passingBuilds: 0,
    failingBuilds: 0,
    repositoriesWithWorkflows: 0,
    commitsLast30Days: 0,
    languageCount: 0,
  },

  currentlyBuilding: null,

  topLanguages: [],
  recentCommits: [],
  repositories: [],

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

export const clearEngineeringCache =
  () => {
    cachedSnapshot = null
  }

const loadDashboard = (
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
      `${getApiUrl()}/api/engineering/dashboard`
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
                'Unable to load engineering data.'
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

export default function useEngineeringDashboard() {
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

    loadDashboard(
      refreshKey > 0
    )
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
            'Engineering data unavailable.',
        }))
      })

    return () => {
      active = false
    }
  }, [refreshKey])

  const refresh = () => {
    clearEngineeringCache()

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