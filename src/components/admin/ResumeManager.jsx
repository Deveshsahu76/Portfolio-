import React, { useEffect, useState } from 'react'
import { FiExternalLink, FiRefreshCw, FiSave } from 'react-icons/fi'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-4b9u.onrender.com'

export default function ResumeManager({ adminKey }) {
  const [resumeUrl, setResumeUrl] = useState('')
  const [draftUrl, setDraftUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const fetchResumeUrl = async () => {
    setLoading(true)
    setMessage('Loading resume URL...')

    try {
      const response = await fetch(`${API_URL}/api/site-settings/resume`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to load resume URL.')
      }

      setResumeUrl(data.resumeUrl || '/resume.pdf')
      setDraftUrl(data.resumeUrl || '/resume.pdf')
      setMessage('Resume URL loaded.')
    } catch (error) {
      setMessage(error.message || 'Failed to load resume URL.')
    } finally {
      setLoading(false)
    }
  }

  const saveResumeUrl = async () => {
    if (!adminKey) {
      setMessage('Please save admin key first.')
      return
    }

    if (!draftUrl.trim()) {
      setMessage('Resume URL is required.')
      return
    }

    setLoading(true)
    setMessage('Saving resume URL...')

    try {
      const response = await fetch(`${API_URL}/api/site-settings/resume`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({
          resumeUrl: draftUrl.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to save resume URL.')
      }

      setResumeUrl(data.resumeUrl)
      setDraftUrl(data.resumeUrl)
      setMessage('Resume URL updated successfully.')
    } catch (error) {
      setMessage(error.message || 'Failed to save resume URL.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResumeUrl()
  }, [])

  return (
    <section className="resume-manager-card">
      <div className="resume-manager-head">
        <div>
          <span>Resume Manager</span>
          <h2>Update resume everywhere</h2>
          <p>
            Yahan resume ka public URL paste karo. Portfolio me jaha bhi resume
            button hoga, wahi latest URL open karega.
          </p>
        </div>

        <button type="button" onClick={fetchResumeUrl} disabled={loading}>
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      <div className="resume-manager-form">
        <label>
          Latest Resume URL
          <input
            type="url"
            value={draftUrl}
            onChange={(event) => setDraftUrl(event.target.value)}
            placeholder="https://drive.google.com/..."
          />
        </label>

        <div className="resume-manager-actions">
          <button type="button" onClick={saveResumeUrl} disabled={loading}>
            <FiSave />
            {loading ? 'Saving...' : 'Save Resume URL'}
          </button>

          <a href={resumeUrl || '/resume.pdf'} target="_blank" rel="noreferrer">
            <FiExternalLink />
            View Current
          </a>
        </div>
      </div>

      {message && <div className="resume-manager-message">{message}</div>}
    </section>
  )
}