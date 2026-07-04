import React, { useState } from 'react'
import { FiBriefcase, FiSend } from 'react-icons/fi'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function RecruiterHub() {
  const [form, setForm] = useState({
    requestType: 'interview',
    recruiterName: '',
    companyName: '',
    email: '',
    phone: '',
    role: '',
    interviewDate: '',
    interviewTime: '',
    interviewMode: 'Google Meet',
    assignmentTitle: '',
    assignmentDetails: '',
    message: '',
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
      const res = await fetch(`${API_URL}/api/recruiter/schedule`, {
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
        requestType: 'interview',
        recruiterName: '',
        companyName: '',
        email: '',
        phone: '',
        role: '',
        interviewDate: '',
        interviewTime: '',
        interviewMode: 'Google Meet',
        assignmentTitle: '',
        assignmentDetails: '',
        message: '',
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
          <div className="badge mb-5">
            <FiBriefcase /> Recruiter Hub
          </div>
          <h1 className="page-title">
            Shortlist, interview or assign a task.
          </h1>
          <p className="page-subtitle mt-6">
            Recruiters can directly send interview requests or assignments. The request gets saved in my backend and notifies me.
          </p>

          <div className="soft-card mt-8 rounded-[2rem] p-6">
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">What you can do here</h2>
            <ul className="mt-4 space-y-3 text-sm font-bold leading-7 text-slate-600 dark:text-slate-400">
              <li>• Schedule an interview request</li>
              <li>• Send assignment/task details</li>
              <li>• Share company and role details</li>
              <li>• Contact me directly for internship opportunity</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="soft-card rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <select name="requestType" value={form.requestType} onChange={handleChange} className="input-field sm:col-span-2">
              <option value="interview">Schedule Interview</option>
              <option value="assignment">Send Assignment</option>
              <option value="shortlist">Shortlist Resume</option>
            </select>

            <input name="recruiterName" value={form.recruiterName} onChange={handleChange} placeholder="Recruiter name" className="input-field" required />
            <input name="companyName" value={form.companyName} onChange={handleChange} placeholder="Company name" className="input-field" required />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="input-field" required />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone optional" className="input-field" />
            <input name="role" value={form.role} onChange={handleChange} placeholder="Role e.g. MERN Stack Intern" className="input-field sm:col-span-2" required />

            <input name="interviewDate" value={form.interviewDate} onChange={handleChange} type="date" className="input-field" />
            <input name="interviewTime" value={form.interviewTime} onChange={handleChange} type="time" className="input-field" />
            <input name="interviewMode" value={form.interviewMode} onChange={handleChange} placeholder="Google Meet / Zoom / Offline" className="input-field sm:col-span-2" />

            <input name="assignmentTitle" value={form.assignmentTitle} onChange={handleChange} placeholder="Assignment title optional" className="input-field sm:col-span-2" />
            <textarea name="assignmentDetails" value={form.assignmentDetails} onChange={handleChange} placeholder="Assignment details optional" rows="4" className="input-field sm:col-span-2" />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" rows="4" className="input-field sm:col-span-2" />
          </div>

          <button disabled={loading} className="btn-primary mt-6 w-full">
            {loading ? 'Sending...' : 'Submit Request'} <FiSend />
          </button>

          {status === 'success' && (
            <p className="mt-4 rounded-2xl bg-emerald-500/10 p-4 text-sm font-black text-emerald-600 dark:text-emerald-300">
              Request submitted successfully.
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