import React, { useEffect, useState } from 'react'
import {
  FiDownload,
  FiEye,
  FiMessageSquare,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const fallbackStats = {
  uniqueVisitors: 0,
  pageViews: 0,
  resumeDownloads: 0,
  recruiterClicks: 0,
  freelanceClicks: 0,
  whatsappClicks: 0,
}

export default function LivePortfolioStats() {
  const [stats, setStats] = useState(fallbackStats)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function fetchStats() {
      try {
        const response = await fetch(`${API_URL}/api/analytics/public-stats`)
        const data = await response.json()

        if (isMounted && data.success) {
          setStats(data.stats)
        }
      } catch {
        if (isMounted) {
          setStats(fallbackStats)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchStats()

    return () => {
      isMounted = false
    }
  }, [])

  const items = [
    {
      label: 'Visitors',
      value: stats.uniqueVisitors,
      icon: FiUsers,
    },
    {
      label: 'Page Views',
      value: stats.pageViews,
      icon: FiEye,
    },
    {
      label: 'Resume Downloads',
      value: stats.resumeDownloads,
      icon: FiDownload,
    },
    {
      label: 'Recruiter Clicks',
      value: stats.recruiterClicks,
      icon: FiTrendingUp,
    },
    {
      label: 'Freelance Clicks',
      value: stats.freelanceClicks,
      icon: FiMessageSquare,
    },
  ]

  return (
    <section className="live-stats-widget">
      <div className="live-stats-head">
        <span>Live Portfolio Analytics</span>
        <h2>Real visitor signals.</h2>
        <p>
          Tracking portfolio engagement helps understand what recruiters and
          clients interact with most.
        </p>
      </div>

      <div className="live-stats-grid">
        {items.map(({ label, value, icon: Icon }) => (
          <article key={label}>
            <Icon />
            <strong>{loading ? '—' : value.toLocaleString('en-IN')}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}