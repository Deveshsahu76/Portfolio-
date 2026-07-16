import {
  useEffect,
  useState,
} from 'react'

const DEFAULT_RESUME_URL =
  '/resume.pdf'

const fallbackMeta = {
  resumeUrl:
    DEFAULT_RESUME_URL,

  version: '1.0',
  updatedAt: null,
  fileName: 'resume.pdf',
  fileSize: 0,
}

let cachedMeta = null
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

const loadResumeMeta = () => {
  if (cachedMeta) {
    return Promise.resolve(
      cachedMeta
    )
  }

  if (pendingRequest) {
    return pendingRequest
  }

  pendingRequest = fetch(
    `${getApiUrl()}/api/resume/meta`
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
          'Unable to load resume.'
        )
      }

      cachedMeta = {
        ...fallbackMeta,
        ...result.data,
      }

      return cachedMeta
    })
    .catch(async () => {
      try {
        const response = await fetch(
          `${getApiUrl()}/api/site-settings/resume`
        )

        const result =
          await response.json()

        cachedMeta = {
          ...fallbackMeta,

          resumeUrl:
            result?.resumeUrl ||
            DEFAULT_RESUME_URL,
        }

        return cachedMeta
      } catch {
        cachedMeta =
          fallbackMeta

        return fallbackMeta
      }
    })
    .finally(() => {
      pendingRequest = null
    })

  return pendingRequest
}

export const clearResumeMetaCache = () => {
  cachedMeta = null
}

export default function useResumeUrl() {
  const [meta, setMeta] =
    useState(
      cachedMeta ||
      fallbackMeta
    )

  const [loading, setLoading] =
    useState(!cachedMeta)

  useEffect(() => {
    let active = true

    loadResumeMeta()
      .then((data) => {
        if (!active) return

        setMeta(data)
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  return {
    ...meta,
    loading,
  }
}