import React, {
  useMemo,
  useState,
} from 'react'
import {
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiPhone,
  FiSend,
  FiVideo,
} from 'react-icons/fi'

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

const getMinimumDate = () => {
  const currentDate =
    new Date()

  const localDate =
    new Date(
      currentDate.getTime() -
        currentDate.getTimezoneOffset() *
          60000
    )

  return localDate
    .toISOString()
    .slice(0, 10)
}

const getDefaultForm = () => ({
  recruiterName: '',
  companyName: '',
  email: '',
  phone: '',
  role: '',

  preferredDate: '',
  preferredTime: '',

  timezone:
    'Asia/Kolkata',

  interviewMode:
    'Google Meet',

  duration:
    '30 minutes',

  message: '',
})

export default function InterviewBookingForm({
  compact = false,
}) {
  const [form, setForm] =
    useState(
      getDefaultForm
    )

  const [status, setStatus] =
    useState({
      type: '',
      message: '',
      reference: '',
    })

  const [submitting, setSubmitting] =
    useState(false)

  const minimumDate =
    useMemo(
      getMinimumDate,
      []
    )

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const openEmailFallback = () => {
    const subject =
      encodeURIComponent(
        `Interview Request - ${
          form.role ||
          'Software Development Role'
        }`
      )

    const body =
      encodeURIComponent(
        [
          'Hi Devesh,',
          '',
          'I would like to request an interview discussion.',
          '',
          `Recruiter: ${form.recruiterName}`,
          `Company: ${form.companyName}`,
          `Email: ${form.email}`,
          `Phone: ${form.phone || 'Not provided'}`,
          `Role: ${form.role}`,
          `Preferred date: ${form.preferredDate}`,
          `Preferred time: ${form.preferredTime}`,
          `Timezone: ${form.timezone}`,
          `Mode: ${form.interviewMode}`,
          `Duration: ${form.duration}`,
          '',
          `Message: ${form.message}`,
        ].join('\n')
      )

    window.location.href =
      `mailto:deveshsahu567@gmail.com?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault()

    setSubmitting(true)

    setStatus({
      type: 'loading',
      message:
        'Sending interview request...',
      reference: '',
    })

    try {
      const response =
        await fetch(
          `${getApiUrl()}/api/recruiter/schedule`,
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify(form),
          }
        )

      const result =
        await response
          .json()
          .catch(() => null)

      if (
        !response.ok ||
        !result?.success
      ) {
        throw new Error(
          result?.message ||
            'Unable to send request.'
        )
      }

      const reference =
        String(
          result.leadId || ''
        ).slice(-8)

      setStatus({
        type: 'success',

        message:
          'Request received. The preferred time is pending confirmation.',

        reference,
      })

      setForm(
        getDefaultForm()
      )
    } catch (error) {
      setStatus({
        type: 'fallback',

        message:
          'The backend is unavailable, so your email application has been opened.',

        reference: '',
      })

      openEmailFallback()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-[2rem] border border-slate-900/10 bg-white/90 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 ${
        compact
          ? 'lg:p-6'
          : 'lg:p-8'
      }`}
    >
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
          <span className="interview-live-dot" />
          Interview Request
        </div>

        <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 dark:text-white md:text-3xl">
          Request a preferred interview time
        </h2>

        <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
          This form sends a scheduling request. The meeting is confirmed only after Devesh replies.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          Recruiter Name

          <input
            type="text"
            name="recruiterName"
            value={form.recruiterName}
            onChange={handleChange}
            placeholder="Your name"
            maxLength="100"
            required
            className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          Company

          <input
            type="text"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Company name"
            maxLength="120"
            required
            className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          <span className="inline-flex items-center gap-2">
            <FiMail />
            Email
          </span>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="recruiter@company.com"
            maxLength="160"
            required
            className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          <span className="inline-flex items-center gap-2">
            <FiPhone />
            Phone
          </span>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91..."
            maxLength="30"
            className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
        Role

        <input
          type="text"
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Software Development Intern"
          maxLength="140"
          required
          className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          <span className="inline-flex items-center gap-2">
            <FiCalendar />
            Preferred Date
          </span>

          <input
            type="date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
            min={minimumDate}
            required
            className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </label>

        <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          <span className="inline-flex items-center gap-2">
            <FiClock />
            Preferred Time
          </span>

          <input
            type="time"
            name="preferredTime"
            value={form.preferredTime}
            onChange={handleChange}
            required
            className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          Timezone

          <select
            name="timezone"
            value={form.timezone}
            onChange={handleChange}
            className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
          >
            <option value="Asia/Kolkata">
              India - Asia/Kolkata
            </option>

            <option value="UTC">
              UTC
            </option>

            <option value="Asia/Dubai">
              Dubai - Asia/Dubai
            </option>

            <option value="Europe/London">
              UK - Europe/London
            </option>

            <option value="America/New_York">
              USA - New York
            </option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          <span className="inline-flex items-center gap-2">
            <FiVideo />
            Mode
          </span>

          <select
            name="interviewMode"
            value={form.interviewMode}
            onChange={handleChange}
            className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
          >
            <option value="Google Meet">
              Google Meet
            </option>

            <option value="Phone Call">
              Phone Call
            </option>

            <option value="Zoom">
              Zoom
            </option>

            <option value="Microsoft Teams">
              Microsoft Teams
            </option>
          </select>
        </label>

        <label className="grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
          Duration

          <select
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-slate-900 dark:text-white"
          >
            <option value="15 minutes">
              15 minutes
            </option>

            <option value="30 minutes">
              30 minutes
            </option>

            <option value="45 minutes">
              45 minutes
            </option>
          </select>
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-sm font-black text-slate-700 dark:text-slate-200">
        Interview or Role Details

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Share the role, location, interview process and any preparation details..."
          rows="5"
          maxLength="2000"
          required
          className="resize-y rounded-2xl border border-slate-900/10 bg-slate-50 px-4 py-3 font-bold leading-7 text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </label>

      {status.message && (
        <div
          className={`mt-5 flex items-start gap-3 rounded-2xl px-4 py-3 text-sm font-black ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'
              : status.type === 'loading'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300'
                : 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300'
          }`}
        >
          {status.type === 'success' ? (
            <FiCheckCircle className="mt-0.5 shrink-0" />
          ) : (
            <FiAlertCircle className="mt-0.5 shrink-0" />
          )}

          <div>
            <span>{status.message}</span>

            {status.reference && (
              <small className="mt-1 block">
                Request reference: {status.reference}
              </small>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-4 text-sm font-black text-white shadow-xl shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiSend />

        {submitting
          ? 'Sending Request...'
          : 'Request Interview Time'}
      </button>
    </form>
  )
}