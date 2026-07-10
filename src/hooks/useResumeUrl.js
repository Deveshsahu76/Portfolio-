import { useEffect, useState } from 'react'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-4b9u.onrender.com'

const DEFAULT_RESUME_URL = '/resume.pdf'

export default function useResumeUrl() {
  const [resumeUrl, setResumeUrl] = useState(DEFAULT_RESUME_URL)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchResumeUrl = async () => {
      try {
        const response = await fetch(`${API_URL}/api/site-settings/resume`)
        const data = await response.json()

        if (isMounted && data?.resumeUrl) {
          setResumeUrl(data.resumeUrl)
        }
      } catch {
        if (isMounted) {
          setResumeUrl(DEFAULT_RESUME_URL)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchResumeUrl()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    resumeUrl,
    loading,
  }
}