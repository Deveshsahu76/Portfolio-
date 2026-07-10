import React, { useEffect, useState } from 'react'
import {
  FiCheckCircle,
  FiExternalLink,
  FiFileText,
  FiRefreshCw,
  FiSave,
  FiUploadCloud,
} from 'react-icons/fi'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-4b9u.onrender.com'

export default function ResumeManager({ adminKey }) {
  const [resumeUrl, setResumeUrl] = useState('')
  const [draftUrl, setDraftUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')

  const fetchResumeUrl = async () => {
    setLoading(true)
    setMessage('Loading resume...')

    try {
      const response = await fetch(`${API_URL}/api/site-settings/resume`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to load resume.')
      }

      setResumeUrl(data.resumeUrl || '/resume.pdf')
      setDraftUrl(data.resumeUrl || '/resume.pdf')
      setMessage('Resume loaded.')
    } catch (error) {
      setMessage(error.message || 'Failed to load resume.')
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

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      setSelectedFile(null)
      return
    }

    if (file.type !== 'application/pdf') {
      setSelectedFile(null)
      setMessage('Only PDF file allowed.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setSelectedFile(null)
      setMessage('PDF size must be less than 5MB.')
      return
    }

    setSelectedFile(file)
    setMessage(`Selected: ${file.name}`)
  }

  const uploadResumePdf = async () => {
    if (!adminKey) {
      setMessage('Please save admin key first.')
      return
    }

    if (!selectedFile) {
      setMessage('Please choose a PDF file first.')
      return
    }

    setUploading(true)
    setMessage('Uploading resume PDF...')

    try {
      const response = await fetch(`${API_URL}/api/site-settings/resume/upload`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/pdf',
          'x-admin-key': adminKey,
          'x-file-name': encodeURIComponent(selectedFile.name),
        },
        body: selectedFile,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to upload resume PDF.')
      }

      setResumeUrl(data.resumeUrl)
      setDraftUrl(data.resumeUrl)
      setSelectedFile(null)
      setMessage('Resume PDF uploaded successfully. All resume buttons updated.')
    } catch (error) {
      setMessage(error.message || 'Failed to upload resume PDF.')
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    fetchResumeUrl()
  }, [])

  return (
    <section className="mt-6 rounded-[2rem] border border-slate-900/10 bg-white/90 p-6 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-indigo-600 dark:bg-cyan-400/10 dark:text-cyan-300">
            <FiFileText />
            Resume Manager
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-4xl">
            Upload resume from your PC
          </h2>

          <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300 md:text-base">
            Yahan se PDF upload karo. Portfolio me Home, Navbar, Recruiter Hub,
            About aur Contact page ke sab resume buttons automatically latest PDF
            open karenge.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchResumeUrl}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-900/10 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <FiRefreshCw />
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-slate-900/10 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
            <FiUploadCloud />
            Upload PDF from PC
          </div>

          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-[1.25rem] border-2 border-dashed border-slate-300 bg-white px-5 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-white/15 dark:bg-white/5 dark:hover:border-cyan-300 dark:hover:bg-cyan-400/10">
            <FiFileText className="text-4xl text-indigo-600 dark:text-cyan-300" />

            <span className="mt-3 text-base font-black text-slate-950 dark:text-white">
              {selectedFile ? selectedFile.name : 'Choose resume PDF'}
            </span>

            <small className="mt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
              PDF only · Max 5MB
            </small>

            <input
              type="file"
              accept="application/pdf,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={uploadResumePdf}
            disabled={uploading || !selectedFile}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiUploadCloud />
            {uploading ? 'Uploading...' : 'Upload Resume PDF'}
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-slate-900/10 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-slate-950/40">
          <div className="flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
            <FiExternalLink />
            Or use public resume URL
          </div>

          <label className="mt-4 grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
            Latest Resume URL
            <input
              type="url"
              value={draftUrl}
              onChange={(event) => setDraftUrl(event.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-sm font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </label>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={saveResumeUrl}
              disabled={loading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950"
            >
              <FiSave />
              {loading ? 'Saving...' : 'Save URL'}
            </button>

            <a
              href={resumeUrl || '/resume.pdf'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-900/10 bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <FiExternalLink />
              View Current
            </a>
          </div>
        </div>
      </div>

      {message && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          <FiCheckCircle className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}
    </section>
  )
}