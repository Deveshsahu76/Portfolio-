import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

const links = [
  { label: 'Email', value: 'deveshsahu567@gmail.com', href: 'mailto:deveshsahu567@gmail.com', icon: FaEnvelope },
  { label: 'GitHub', value: 'github.com/Deveshsahu76', href: 'https://github.com/Deveshsahu76', icon: FaGithub },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/devesh-sahu-560608270',
    href: 'https://www.linkedin.com/in/devesh-sahu-560608270/',
    icon: FaLinkedin,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!form.name.trim()) return setError('Please enter your name.')
    if (!form.email.trim()) return setError('Please enter your email.')
    if (!form.message.trim()) return setError('Please enter your message.')

    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)

    window.location.href = `mailto:deveshsahu567@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="section-container">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
            Contact
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Let’s build something impactful.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Open for Software Development, Full-Stack and MERN internship opportunities. You can reach out directly
            through email, GitHub or LinkedIn.
          </p>

          <div className="mt-8 space-y-4">
            {links.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="card-3d glass-3d flex items-center gap-4 rounded-3xl p-5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
                  <Icon />
                </span>
                <span>
                  <span className="block text-sm font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    {label}
                  </span>
                  <span className="mt-1 block break-all font-black text-slate-950 dark:text-white">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card-3d glass-3d rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="mb-2 block text-sm font-black text-slate-700 dark:text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="input-field min-h-[190px] resize-y"
              placeholder="Tell me about the internship, role or project requirement"
            />
          </div>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-700 dark:text-red-200">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
            <FiSend /> Send Message
          </button>
        </form>
      </div>
    </section>
  )
}