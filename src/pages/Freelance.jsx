import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Freelance() {
  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    phone: '',
    service: 'Portfolio Website',
    budget: '',
    deadline: '',
    projectDetails: '',
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const res = await fetch(`${API_URL}/api/freelance/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || 'Request failed')
      }

      setStatus('success')
      setForm({
        clientName: '',
        clientEmail: '',
        phone: '',
        service: 'Portfolio Website',
        budget: '',
        deadline: '',
        projectDetails: '',
      })
    } catch (error) {
      setStatus(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="section-container">
      <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="badge mb-5">Freelance Portal</div>
          <h1 className="page-title">
            Need a website, dashboard or MERN app?
          </h1>
          <p className="page-subtitle mt-6">
            Submit your project details and I’ll review the requirements. This is connected to my backend request system.
          </p>

          <div className="mt-8 grid gap-4">
            {['Portfolio Website', 'Business Website', 'MERN App', 'Bug Fixing', 'Deployment Help'].map((item) => (
              <div key={item} className="soft-card rounded-2xl p-5 font-black text-slate-800 dark:text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="soft-card rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="clientName" value={form.clientName} onChange={handleChange} placeholder="Your name" className="input-field" required />
            <input name="clientEmail" value={form.clientEmail} onChange={handleChange} placeholder="Email" type="email" className="input-field" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone optional" className="input-field" />
            <select name="service" value={form.service} onChange={handleChange} className="input-field">
              <option>Portfolio Website</option>
              <option>Business Website</option>
              <option>MERN App</option>
              <option>Bug Fixing</option>
              <option>Deployment Help</option>
              <option>Other</option>
            </select>
            <input name="budget" value={form.budget} onChange={handleChange} placeholder="Budget optional" className="input-field" />
            <input name="deadline" value={form.deadline} onChange={handleChange} type="date" className="input-field" />
            <textarea name="projectDetails" value={form.projectDetails} onChange={handleChange} placeholder="Project details" rows="6" className="input-field sm:col-span-2" required />
          </div>

          <button disabled={loading} className="btn-primary mt-6 w-full">
            {loading ? 'Sending...' : 'Submit Project Request'} <FiSend />
          </button>

          {status === 'success' && (
            <p className="mt-4 rounded-2xl bg-emerald-500/10 p-4 text-sm font-black text-emerald-600 dark:text-emerald-300">
              Project request submitted successfully.
            </p>
          )}

          {status && status !== 'success' && (
            <p className="mt-4 rounded-2xl bg-red-500/10 p-4 text-sm font-black text-red-600 dark:text-red-300">
              {status}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}