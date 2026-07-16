import React from 'react'
import useResumeUrl from '../hooks/useResumeUrl'

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

export default function ResumeLink({
  children = 'Download Resume',
  className = '',
  onClick,
  title,
  downloadSource =
    'portfolio-resume-button',
}) {
  const {
    resumeUrl,
    version,
    updatedAt,
  } = useResumeUrl()

  const handleClick = (event) => {
    try {
      fetch(
        `${getApiUrl()}/api/resume/download`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            page:
              window.location.pathname,

            source:
              downloadSource,

            referrer:
              document.referrer || '',
          }),

          keepalive: true,
        }
      ).catch(() => {})
    } catch {
      // Analytics failure must not block resume.
    }

    onClick?.(event)
  }

  const formattedDate =
    updatedAt
      ? new Intl.DateTimeFormat(
          'en-IN',
          {
            dateStyle: 'medium',
          }
        ).format(
          new Date(updatedAt)
        )
      : ''

  const linkTitle =
    title ||
    `Open latest resume v${version}${
      formattedDate
        ? ` · Updated ${formattedDate}`
        : ''
    }`

  return (
    <a
      href={resumeUrl}
      className={className}
      target="_blank"
      rel="noreferrer"
      title={linkTitle}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}