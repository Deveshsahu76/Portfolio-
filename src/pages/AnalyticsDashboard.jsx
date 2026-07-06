import React, { useEffect, useState } from 'react'
import {
  FiActivity,
  FiBarChart2,
  FiDownload,
  FiEye,
  FiKey,
  FiMessageSquare,
  FiMousePointer,
  FiRefreshCw,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'
import SEO from '../components/SEO'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const emptyDashboard = {
  totals: {
    uniqueVisitors: 0,
    totalEvents: 0,
    pageViews: 0,
    resumeDownloads: 0,
    recruiterClicks: 0,
    freelanceClicks: 0,
    whatsappClicks: 0,
    emailClicks: 0,
  },
  topPages: [],
  topEvents: [],
  dailyViews: [],
  recentEvents: [],
}

export default function AnalyticsDashboard() {
  const [adminKey, setAdminKey] = useState(
    localStorage.getItem('portfolio_admin_key') || ''
  )
  const [dashboard, setDashboard] = useState(emptyDashboard)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const saveKey = () => {
    localStorage.setItem('portfolio_admin_key', adminKey)
    setStatus('Admin key saved locally in this browser.')
  }

  const fetchDashboard = async () => {
    if (!adminKey) {
      setStatus('Enter ADMIN_KEY first.')
      return
    }

    setLoading(true)
    setStatus('')

    try {
      const response = await fetch(`${API_URL}/api/analytics/dashboard`, {
        headers: {
          'x-admin-key': adminKey,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to fetch analytics.')
      }

      setDashboard(data)
      setStatus('Analytics updated.')
    } catch (error) {
      setStatus(error.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (adminKey) {
      fetchDashboard()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const metricCards = [
    {
      label: 'Unique Visitors',
      value: dashboard.totals.uniqueVisitors,
      icon: FiUsers,
    },
    {
      label: 'Page Views',
      value: dashboard.totals.pageViews,
      icon: FiEye,
    },
    {
      label: 'Resume Downloads',
      value: dashboard.totals.resumeDownloads,
      icon: FiDownload,
    },
    {
      label: 'Recruiter Clicks',
      value: dashboard.totals.recruiterClicks,
      icon: FiTrendingUp,
    },
    {
      label: 'Freelance Clicks',
      value: dashboard.totals.freelanceClicks,
      icon: FiMessageSquare,
    },
    {
      label: 'Total Events',
      value: dashboard.totals.totalEvents,
      icon: FiActivity,
    },
  ]

  return (
    <>
      <SEO
        title="Analytics Dashboard | Devesh Sahu Portfolio"
        description="Private analytics dashboard for portfolio engagement, visitors, page views and conversions."
        path="/analytics"
      />

      <main className="analytics-page">
        <section className="analytics-hero">
          <div>
            <div className="analytics-badge">
              <span />
              Private Analytics
            </div>

            <h1>
              Portfolio conversion dashboard for{' '}
              <span>visitor and recruiter signals.</span>
            </h1>

            <p>
              Track page views, visitors, resume downloads, recruiter clicks,
              freelance clicks and top pages from your own backend.
            </p>
          </div>

          <aside className="analytics-key-card">
            <FiKey />

            <h2>Admin Access</h2>

            <p>Use your backend ADMIN_KEY. It is saved only in this browser.</p>

            <input
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              placeholder="Enter ADMIN_KEY"
            />

            <div>
              <button type="button" onClick={saveKey}>
                Save Key
              </button>

              <button type="button" onClick={fetchDashboard} disabled={loading}>
                <FiRefreshCw /> {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>

            {status && <span>{status}</span>}
          </aside>
        </section>

        <section className="analytics-metrics-grid">
          {metricCards.map(({ label, value, icon: Icon }) => (
            <article key={label}>
              <Icon />
              <strong>{Number(value || 0).toLocaleString('en-IN')}</strong>
              <span>{label}</span>
            </article>
          ))}
        </section>

        <section className="analytics-grid-section">
          <article className="analytics-panel">
            <div className="analytics-panel-head">
              <FiBarChart2 />
              <h2>Top Pages</h2>
            </div>

            <div className="analytics-list">
              {dashboard.topPages.length > 0 ? (
                dashboard.topPages.map((item) => (
                  <div key={item._id || 'unknown'}>
                    <span>{item._id || '/'}</span>
                    <strong>{item.count}</strong>
                  </div>
                ))
              ) : (
                <p>No page data yet.</p>
              )}
            </div>
          </article>

          <article className="analytics-panel">
            <div className="analytics-panel-head">
              <FiMousePointer />
              <h2>Top Events</h2>
            </div>

            <div className="analytics-list">
              {dashboard.topEvents.length > 0 ? (
                dashboard.topEvents.map((item) => (
                  <div key={item._id}>
                    <span>{item._id}</span>
                    <strong>{item.count}</strong>
                  </div>
                ))
              ) : (
                <p>No event data yet.</p>
              )}
            </div>
          </article>
        </section>

        <section className="analytics-panel analytics-recent-panel">
          <div className="analytics-panel-head">
            <FiActivity />
            <h2>Recent Events</h2>
          </div>

          <div className="analytics-table">
            <div className="analytics-table-head">
              <span>Event</span>
              <span>Path</span>
              <span>Device</span>
              <span>Time</span>
            </div>

            {dashboard.recentEvents.length > 0 ? (
              dashboard.recentEvents.map((event) => (
                <div key={event._id} className="analytics-table-row">
                  <span>{event.eventType}</span>
                  <span>{event.path}</span>
                  <span>{event.device}</span>
                  <span>
                    {new Date(event.createdAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              ))
            ) : (
              <p>No recent events yet.</p>
            )}
          </div>
        </section>
      </main>
    </>
  )
}