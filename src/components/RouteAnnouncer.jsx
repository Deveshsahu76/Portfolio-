import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const routeNames = {
  '/': 'Home',
  '/projects': 'Projects',
  '/engineering': 'Engineering Dashboard',
  '/status': 'System Status',
  '/skills': 'Skills',
  '/about': 'About',
  '/contact': 'Contact',
  '/recruiter': 'Recruiter Hub',
  '/recruiter/quick-view': 'Recruiter Quick View',
  '/freelance': 'Freelance Services',
}

const getRouteName = (pathname) => {
  if (routeNames[pathname]) {
    return routeNames[pathname]
  }

  if (pathname.startsWith('/projects/')) {
    return 'Project Case Study'
  }

  return 'Portfolio Page'
}

export default function RouteAnnouncer() {
  const { pathname } = useLocation()
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage(`${getRouteName(pathname)} loaded`)
  }, [pathname])

  return (
    <div
      className="route-announcer"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  )
}
