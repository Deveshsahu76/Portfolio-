import React from 'react'
import useResumeUrl from '../hooks/useResumeUrl'

export default function ResumeLink({
  children = 'Download Resume',
  className = '',
  onClick,
  title = 'Open latest resume',
}) {
  const { resumeUrl } = useResumeUrl()

  return (
    <a
      href={resumeUrl}
      className={className}
      target="_blank"
      rel="noreferrer"
      title={title}
      onClick={onClick}
    >
      {children}
    </a>
  )
}