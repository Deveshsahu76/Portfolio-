import {
  useEffect,
  useState,
} from 'react'

const CACHE_TIME_MS =
  5 * 60 * 1000

const fallbackData = {
  status: 'available',
  statusLabel: 'Available',

  internship: true,
  freelance: true,
  interview: true,

  joiningTime:
    'Within 7 days',

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
  updatedAt: null,
}

let cachedSnapshot = null
let pendingRequest = null

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

const loadAvailability = () => {
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
    `${getApiUrl()}/api/profile/availability`
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
            'Unable to load availability.'
        )
      }

      const data = {
        ...fallbackData,
        ...result.data,
      }

      cachedSnapshot = {
        savedAt: Date.now(),
        data,
      }

      return data
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

export const clearAvailabilityCache = () => {
  cachedSnapshot = null
}

export default function useAvailability() {
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

    loadAvailability()
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

        setState({
          data: fallbackData,
          status: 'fallback',

          error:
            error.message ||
            'Availability unavailable.',
        })
      })

    return () => {
      active = false
    }
  }, [])

  return state
}