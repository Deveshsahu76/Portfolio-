import {
  useEffect,
  useState,
} from 'react'

const STORAGE_KEY =
  'portfolio_leetcode_stats'

const CACHE_TIME_MS =
  30 * 60 * 1000

const fallbackStats = {
  username: 'deveshsahu567',
  totalSolved: 127,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  profileUrl:
    'https://leetcode.com/u/deveshsahu567/',
}

let memorySnapshot = null
let pendingRequest = null

const getApiUrl = () => {
  if (typeof window === 'undefined') {
    return (
      import.meta.env.VITE_API_URL ||
      'https://portfolio-backend-4b9u.onrender.com'
    )
  }

  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'

  if (isLocal) {
    return 'http://localhost:5000'
  }

  return (
    import.meta.env.VITE_API_URL ||
    'https://portfolio-backend-4b9u.onrender.com'
  )
}

const readStoredStats = () => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedValue =
      sessionStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return null
    }

    const parsedValue =
      JSON.parse(storedValue)

    if (
      !parsedValue?.savedAt ||
      !parsedValue?.stats
    ) {
      return null
    }

    const cacheAge =
      Date.now() - parsedValue.savedAt

    if (cacheAge > CACHE_TIME_MS) {
      sessionStorage.removeItem(
        STORAGE_KEY
      )

      return null
    }

    return {
      ...parsedValue.stats,
      status: 'cached',
      error: '',
    }
  } catch {
    return null
  }
}

const saveStoredStats = (stats) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        savedAt: Date.now(),
        stats,
      })
    )
  } catch {
    // Storage failure should not break UI.
  }
}

const requestLeetCodeStats = () => {
  if (pendingRequest) {
    return pendingRequest
  }

  const API_URL = getApiUrl()

  pendingRequest = fetch(
    `${API_URL}/api/leetcode/stats`
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
            'Unable to load LeetCode stats.'
        )
      }

      const stats = {
        username:
          result.data.username ||
          fallbackStats.username,

        totalSolved:
          Number(
            result.data.totalSolved ??
              fallbackStats.totalSolved
          ),

        easySolved:
          Number(
            result.data.easySolved || 0
          ),

        mediumSolved:
          Number(
            result.data.mediumSolved || 0
          ),

        hardSolved:
          Number(
            result.data.hardSolved || 0
          ),

        profileUrl:
          result.data.profileUrl ||
          fallbackStats.profileUrl,

        updatedAt:
          result.data.updatedAt || null,
      }

      saveStoredStats(stats)

      return stats
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

export default function useLeetCodeStats() {
  const storedStats =
    memorySnapshot ||
    readStoredStats()

  const [snapshot, setSnapshot] =
    useState(
      storedStats || {
        ...fallbackStats,
        status: 'loading',
        error: '',
      }
    )

  useEffect(() => {
    let isMounted = true

    requestLeetCodeStats()
      .then((stats) => {
        if (!isMounted) return

        const liveSnapshot = {
          ...stats,
          status: 'live',
          error: '',
        }

        memorySnapshot =
          liveSnapshot

        setSnapshot(liveSnapshot)
      })
      .catch((error) => {
        if (!isMounted) return

        setSnapshot((current) => ({
          ...current,

          status:
            current.status === 'cached'
              ? 'cached'
              : 'offline',

          error:
            error.message ||
            'LeetCode stats unavailable.',
        }))
      })

    return () => {
      isMounted = false
    }
  }, [])

  return snapshot
}