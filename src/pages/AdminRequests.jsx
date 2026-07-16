import React, { useEffect, useMemo, useState } from 'react'
import {
  FiArchive,
  FiBriefcase,
  FiCheckCircle,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiFilter,
  FiInbox,
  FiKey,
  FiMail,
  FiPhone,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
  FiUser,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import ResumeManager from '../components/admin/ResumeManager'
import AvailabilityManager from '../components/admin/AvailabilityManager'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-4b9u.onrender.com'

const typeTabs = ['all', 'recruiter', 'freelance', 'contact']
const statusTabs = ['all', 'new', 'reviewed', 'archived']

const formatDate = (date) => {
  if (!date) return 'N/A'

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

const getLeadTitle = (lead) => {
  if (lead.type === 'recruiter') {
    return lead.companyName || lead.company || 'Recruiter Lead'
  }

  if (lead.type === 'freelance') {
    return lead.projectType || 'Freelance Lead'
  }

  return lead.subject || 'Contact Message'
}

const getLeadName = (lead) => {
  return lead.name || lead.recruiterName || 'Unknown'
}

const normalizeStatus = (lead) => {
  return lead.status || 'new'
}

export default function AdminRequests() {
  const [adminKey, setAdminKey] = useState(
    localStorage.getItem('portfolio_admin_key') || ''
  )
  const [savedKey, setSavedKey] = useState(
    localStorage.getItem('portfolio_admin_key') || ''
  )
  const [leads, setLeads] = useState([])
  const [type, setType] = useState('all')
  const [status, setStatus] = useState('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const filteredLeads = useMemo(() => {
    const text = query.toLowerCase()

    return leads.filter((lead) => {
      const haystack = [
        lead.type,
        normalizeStatus(lead),
        lead.name,
        lead.recruiterName,
        lead.companyName,
        lead.company,
        lead.email,
        lead.phone,
        lead.whatsapp,
        lead.role,
        lead.subject,
        lead.category,
        lead.projectType,
        lead.budget,
        lead.timeline,
        lead.message,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(text)
    })
  }, [leads, query])

  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((lead) => normalizeStatus(lead) === 'new').length,
      recruiter: leads.filter((lead) => lead.type === 'recruiter').length,
      freelance: leads.filter((lead) => lead.type === 'freelance').length,
      contact: leads.filter((lead) => lead.type === 'contact').length,
    }
  }, [leads])

  const saveKey = () => {
    localStorage.setItem('portfolio_admin_key', adminKey)
    setSavedKey(adminKey)
    setMessage('Admin key saved. Now click Refresh.')
  }

  const clearKey = () => {
    localStorage.removeItem('portfolio_admin_key')
    setAdminKey('')
    setSavedKey('')
    setLeads([])
    setMessage('Admin key removed.')
  }

  const fetchLeads = async () => {
    if (!savedKey) {
      setMessage('Please enter admin key first.')
      return
    }

    setLoading(true)
    setMessage('Loading leads...')

    try {
      const response = await fetch(
        `${API_URL}/api/leads?type=${type}&status=${status}`,
        {
          headers: {
            'x-admin-key': savedKey,
          },
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to fetch leads.')
      }

      setLeads(data.leads || [])
      setMessage(`Loaded ${data.leads?.length || 0} leads.`)
    } catch (error) {
      setMessage(error.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (leadId, nextStatus) => {
    if (!savedKey) {
      setMessage('Please enter admin key first.')
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': savedKey,
        },
        body: JSON.stringify({
          status: nextStatus,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to update status.')
      }

      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === leadId ? { ...lead, status: nextStatus } : lead
        )
      )

      setMessage('Lead status updated.')
    } catch (error) {
      setMessage(error.message || 'Failed to update status.')
    }
  }

  const deleteLead = async (leadId) => {
    if (!savedKey) {
      setMessage('Please enter admin key first.')
      return
    }

    const confirmed = window.confirm('Delete this lead permanently?')

    if (!confirmed) return

    try {
      const response = await fetch(`${API_URL}/api/leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': savedKey,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to delete lead.')
      }

      setLeads((prev) => prev.filter((lead) => lead._id !== leadId))
      setMessage('Lead deleted successfully.')
    } catch (error) {
      setMessage(error.message || 'Failed to delete lead.')
    }
  }

  const copyText = async (value) => {
    if (!value) return

    await navigator.clipboard.writeText(value)
    setMessage('Copied to clipboard.')
  }

  const exportCsv = () => {
    const headers = [
      'type',
      'status',
      'name',
      'recruiterName',
      'companyName',
      'email',
      'phone',
      'whatsapp',
      'role',
      'projectType',
      'budget',
      'timeline',
      'subject',
      'category',
      'message',
      'createdAt',
    ]

    const rows = filteredLeads.map((lead) =>
      headers
        .map((key) => {
          const value =
            key === 'status' ? normalizeStatus(lead) : lead[key] || ''
          return `"${String(value).replaceAll('"', '""')}"`
        })
        .join(',')
    )

    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = 'portfolio-leads.csv'
    link.click()

    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    if (savedKey) {
      fetchLeads()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedKey, type, status])

  return (
    <>
      <SEO
        title="Admin Requests | Devesh Sahu Portfolio"
        description="Private admin dashboard for portfolio leads."
        path="/admin/requests"
      />

      <main className="adminleads-page">
        <section className="adminleads-hero">
          <div>
            <span>Private Dashboard</span>
            <h1>Portfolio Leads</h1>
            <p>
              Recruiter requests, freelance inquiries aur contact messages yahan
              dikhenge. Admin key ke bina data access nahi hoga.
            </p>
          </div>

          <div className="adminleads-key-card">
            <label>
              <FiKey />
              Admin Key
            </label>

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

              <button type="button" onClick={clearKey}>
                Clear
              </button>
            </div>
          </div>
        </section>

        <AvailabilityManager adminKey={savedKey} />

        <ResumeManager adminKey={savedKey} />

        <section className="adminleads-stats">
          <div>
            <strong>{stats.total}</strong>
            <span>Total Leads</span>
          </div>

          <div>
            <strong>{stats.new}</strong>
            <span>New Leads</span>
          </div>

          <div>
            <strong>{stats.recruiter}</strong>
            <span>Recruiter</span>
          </div>

          <div>
            <strong>{stats.freelance}</strong>
            <span>Freelance</span>
          </div>

          <div>
            <strong>{stats.contact}</strong>
            <span>Contact</span>
          </div>
        </section>

        <section className="adminleads-toolbar">
          <div className="adminleads-search">
            <FiSearch />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, email, company, message..."
            />
          </div>

          <div className="adminleads-actions">
            <button type="button" onClick={fetchLeads} disabled={loading}>
              <FiRefreshCw />
              {loading ? 'Loading...' : 'Refresh'}
            </button>

            <button type="button" onClick={exportCsv}>
              <FiDownload />
              Export CSV
            </button>
          </div>
        </section>

        <section className="adminleads-filters">
          <div>
            <FiFilter />
            <span>Type</span>

            {typeTabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setType(item)}
                className={type === item ? 'active' : ''}
              >
                {item}
              </button>
            ))}
          </div>

          <div>
            <FiArchive />
            <span>Status</span>

            {statusTabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStatus(item)}
                className={status === item ? 'active' : ''}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {message && <div className="adminleads-message">{message}</div>}

        <section className="adminleads-list">
          {filteredLeads.map((lead) => {
            const leadStatus = normalizeStatus(lead)

            return (
              <article key={lead._id} className={`adminlead-card ${lead.type}`}>
                <div className="adminlead-top">
                  <div>
                    <span>{lead.type}</span>
                    <h2>{getLeadTitle(lead)}</h2>
                    <p>{formatDate(lead.createdAt)}</p>
                  </div>

                  <strong className={`adminlead-status ${leadStatus}`}>
                    {leadStatus}
                  </strong>
                </div>

                <div className="adminlead-info-grid">
                  <div>
                    <FiUser />
                    <span>Name</span>
                    <strong>{getLeadName(lead)}</strong>
                  </div>

                  <div>
                    <FiMail />
                    <span>Email</span>
                    <strong>{lead.email || 'N/A'}</strong>
                  </div>

                  <div>
                    <FiPhone />
                    <span>Phone / WhatsApp</span>
                    <strong>{lead.whatsapp || lead.phone || 'N/A'}</strong>
                  </div>

                  <div>
                    <FiBriefcase />
                    <span>Role / Project</span>
                    <strong>
                      {lead.role || lead.projectType || lead.category || 'N/A'}
                    </strong>
                  </div>
                </div>

                {(lead.budget || lead.timeline || lead.subject) && (
                  <div className="adminlead-meta">
                    {lead.budget && <span>Budget: {lead.budget}</span>}
                    {lead.timeline && <span>Timeline: {lead.timeline}</span>}
                    {lead.subject && <span>Subject: {lead.subject}</span>}
                  </div>
                )}

                <div className="adminlead-message">
                  <strong>Message</strong>
                  <p>{lead.message}</p>
                </div>

                <div className="adminlead-actions">
                  {lead.email && (
                    <a href={`mailto:${lead.email}`}>
                      <FiExternalLink />
                      Email
                    </a>
                  )}

                  {(lead.whatsapp || lead.phone) && (
                    <a
                      href={`https://wa.me/91${String(
                        lead.whatsapp || lead.phone
                      )
                        .replace(/\D/g, '')
                        .slice(-10)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FiExternalLink />
                      WhatsApp
                    </a>
                  )}

                  <button type="button" onClick={() => copyText(lead.email)}>
                    <FiCopy />
                    Copy Email
                  </button>

                  <button
                    type="button"
                    onClick={() => updateStatus(lead._id, 'reviewed')}
                  >
                    <FiCheckCircle />
                    Reviewed
                  </button>

                  <button
                    type="button"
                    onClick={() => updateStatus(lead._id, 'archived')}
                  >
                    <FiArchive />
                    Archive
                  </button>

                  <button type="button" onClick={() => deleteLead(lead._id)}>
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </article>
            )
          })}

          {filteredLeads.length === 0 && (
            <div className="adminleads-empty">
              <FiInbox />
              <h2>No leads found</h2>
              <p>Submit a test form or change filters.</p>
            </div>
          )}
        </section>
      </main>
    </>
  )
}