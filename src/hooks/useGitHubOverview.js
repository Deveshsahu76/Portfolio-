import {
  useEffect,
  useState,
} from 'react'

const CACHE_TIME_MS =
  20 * 60 * 1000

let cachedSnapshot = null
let pendingRequest = null

const fallbackData = {
  username: 'Deveshsahu76',
  name: 'Devesh Sahu',
  avatarUrl: '',
  profileUrl:
    'https://github.com/Deveshsahu76',
  followers: 0,
  following: 0,
  publicRepositories: 0,
  totalStars: 0,
  totalForks: 0,
  lastActivityAt: null,
  latestRepository: null,
  topLanguages: [],
  recentRepositories: [],
  recentActivity: [],
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

const loadOverview = () => {
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
    `${getApiUrl()}/api/github/overview`
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
            'Unable to load GitHub activity.'
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

export default function useGitHubOverview() {
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

    loadOverview()
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
            'GitHub activity unavailable.',
        }))
      })

    return () => {
      active = false
    }
  }, [])

  return state
}