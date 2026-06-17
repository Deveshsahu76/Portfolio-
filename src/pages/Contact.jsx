import React, {useState, useEffect} from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaRegCheckCircle, FaRegClock, FaRegLightbulb } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const isEmailJSConfigured = Boolean(
  EMAILJS_SERVICE_ID &&
  EMAILJS_TEMPLATE_ID &&
  EMAILJS_PUBLIC_KEY
)

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', message:''})
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if(isEmailJSConfigured) {
      emailjs.init(EMAILJS_PUBLIC_KEY)
    }
  }, [])

  function handleChange(event){
    const { name, value } = event.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validateForm(){
    if(!form.name.trim()) return 'Please enter your name.'
    if(!form.email.trim()) return 'Please enter your email address.'
    if(!/^([\w.%+-]+)@([\w-]+\.)+([a-zA-Z]{2,})$/.test(form.email)) return 'Please enter a valid email address.'
    if(!form.message.trim()) return 'Please enter your message.'
    return null
  }

  async function handleSubmit(event){
    event.preventDefault()

    const validationError = validateForm()
    if(validationError){
      setStatus({ type:'error', message: validationError })
      return
    }

    if(!isEmailJSConfigured){
      setStatus({
        type:'error',
        message: 'EmailJS is not configured. Please check your environment variables.'
      })
      return
    }

    setSending(true)
    setStatus(null)

    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
          subject: `Portfolio message from ${form.name}`
        }
      )

      if(response.status === 200){
        setStatus({ type:'success', message: 'Your message has been sent successfully. I will reply soon.' })
        setForm({ name:'', email:'', message:'' })
      } else {
        setStatus({ type:'error', message: 'Unable to send your message. Please try again.' })
      }
    } catch(error) {
      console.error('EmailJS send error:', error)
      setStatus({ type:'error', message: 'Failed to send message. Please email directly.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="pt-24">
      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr] items-start">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Get in touch</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-white">Let’s build something impactful together.</h1>
          <p className="text-slate-400 max-w-2xl leading-8">Send a message with your requirements, internship interest, or collaboration ideas. I’ll get back to you promptly with a thoughtful response.</p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass p-5 rounded-3xl border border-white/10 shadow-[0_25px_80px_-40px_rgba(99,102,241,0.45)]">
              <div className="flex items-center gap-3 text-primary mb-3"><FaRegCheckCircle /> <span className="font-semibold">Fast response</span></div>
              <p className="text-slate-300">I answer messages quickly and professionally.</p>
            </div>
            <div className="glass p-5 rounded-3xl border border-white/10 shadow-[0_25px_80px_-40px_rgba(139,92,246,0.35)]">
              <div className="flex items-center gap-3 text-secondary mb-3"><FaRegClock /> <span className="font-semibold">Availability</span></div>
              <p className="text-slate-300">Open for internships, part-time roles and creative collaborations.</p>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass p-6 rounded-[2rem] border border-white/10 shadow-2xl shadow-slate-950/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-primary">Reach out</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Email & Socials</h2>
              </div>
              <div className="rounded-3xl bg-white/5 px-4 py-3 text-primary">Contact</div>
            </div>
            <div className="mt-6 space-y-4 text-slate-300">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Email</p>
                <p className="mt-2 text-sm">deveshsahu567@gmail.com</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">GitHub</p>
                <a href="https://github.com/Deveshsahu76" target="_blank" rel="noreferrer" className="mt-2 block text-sm text-primary hover:text-white">github.com/Deveshsahu76</a>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">LinkedIn</p>
                <a href="https://www.linkedin.com/in/devesh-sahu-560608270/" target="_blank" rel="noreferrer" className="mt-2 block text-sm text-primary hover:text-white">linkedin.com/in/devesh-sahu-560608270</a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.9fr]">
        <form onSubmit={handleSubmit} className="glass p-8 rounded-[2rem] border border-white/10 shadow-2xl shadow-slate-950/15">
          <div className="grid gap-6">
            {status && (
              <div className={`rounded-3xl border p-4 text-sm ${status.type === 'success' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100' : 'border-rose-400/30 bg-rose-400/10 text-rose-100'}`}>
                {status.message}
              </div>
            )}

            <div>
              <label className="text-sm text-slate-300">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={sending}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-primary focus:bg-white/10"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={sending}
                className="mt-3 w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-primary focus:bg-white/10"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                disabled={sending}
                rows={7}
                className="mt-3 w-full rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none transition focus:border-primary focus:bg-white/10"
                placeholder="Describe your project or internship requirement"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-4 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/10 shadow-2xl shadow-slate-950/15">
            <p className="uppercase tracking-[0.3em] text-sm text-primary">Email Preview</p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200">
              <p className="text-sm text-slate-400">From:</p>
              <p className="mt-2 text-lg font-semibold">{form.name || 'Your Name'}</p>
              <p className="text-slate-500">{form.email || 'you@example.com'}</p>
              <div className="my-6 h-px bg-white/10" />
              <p className="text-sm text-slate-400">Message preview</p>
              <p className="mt-3 leading-7 text-slate-200">{form.message || 'Type your message here to preview what will be sent.'}</p>
            </div>
          </div>

          <div className="glass p-8 rounded-[2rem] border border-white/10 shadow-2xl shadow-slate-950/15">
            <p className="uppercase tracking-[0.3em] text-sm text-primary">Professional note</p>
            <h3 className="mt-4 text-2xl font-semibold text-white">Ready for your next role</h3>
            <p className="mt-4 text-slate-400 leading-7">I’m focused on building scalable web applications and solving real-world problems through clean code and modern product design.</p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-slate-400">Preferred roles</p>
                <p className="mt-2 font-medium text-white">Internships · Full-Stack · Software Engineering</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-sm text-slate-400">Response time</p>
                <p className="mt-2 font-medium text-white">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

