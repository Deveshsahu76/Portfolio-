import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiStar,
  FiTarget,
  FiUser,
  FiZap,
} from 'react-icons/fi'
import SEO from '../components/SEO'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-4b9u.onrender.com'

const defaultForm = {
  name: '',
  email: '',
  subject: '',
  category: '',
  message: '',
}

const contactOptions = [
  {
    icon: FiBriefcase,
    title: 'Recruiter / HR',
    desc: 'For internship, interview, job opportunity, assessment or resume screening.',
    cta: 'Open Recruiter Hub',
    link: '/recruiter',
  },
  {
    icon: FiGlobe,
    title: 'Freelance Client',
    desc: 'For website, MERN app, dashboard, e-commerce or business project inquiry.',
    cta: 'Start Freelance Project',
    link: '/freelance',
  },
  {
    icon: FiCode,
    title: 'Project Review',
    desc: 'For GitHub review, live project check, collaboration or technical discussion.',
    cta: 'View Projects',
    link: '/projects',
  },
]

const quickLinks = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'deveshsahu567@gmail.com',
    href: 'mailto:deveshsahu567@gmail.com',
  },
  {
    icon: FiPhone,
    label: 'Phone / WhatsApp',
    value: '+91 7607997416',
    href: 'tel:+917607997416',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'Connect professionally',
    href: 'https://www.linkedin.com/in/devesh-sahu-560608270/',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'Check repositories',
    href: 'https://github.com/Deveshsahu76',
  },
]

const availability = [
  'Open to MERN Stack Internship',
  'Open to Frontend / Backend roles',
  'Available for freelance web projects',
  'Remote / Hybrid / On-site flexible',
]

const responsePromise = [
  {
    icon: FiClock,
    title: 'Fast Response',
    desc: 'I usually try to respond as soon as possible for genuine opportunities.',
  },
  {
    icon: FiTarget,
    title: 'Clear Discussion',
    desc: 'Share role, project, deadline or requirements and I will reply with next steps.',
  },
  {
    icon: FiZap,
    title: 'Action Oriented',
    desc: 'I can share resume, GitHub, live demos, availability or project plan quickly.',
  },
]

export default function Contact() {
  const [form, setForm] = useState(defaultForm)
  const [status, setStatus] = useState({
    type: '',
    message: '',
  })
  const [copied, setCopied] = useState(false)

  const email = 'deveshsahu567@gmail.com'

  const whatsappLink =
    'https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20visited%20your%20portfolio%20and%20want%20to%20connect%20with%20you.'

  const directMailLink =
    'mailto:deveshsahu567@gmail.com?subject=Portfolio%20Contact%20Inquiry&body=Hi%20Devesh%2C%0A%0AI%20visited%20your%20portfolio%20and%20want%20to%20connect.%0A%0AReason%3A%0AMessage%3A%0A%0ARegards%2C'

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1800)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setStatus({
      type: 'loading',
      message: 'Sending your message...',
    })

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setStatus({
        type: 'success',
        message: 'Message sent successfully. I will reply soon.',
      })

      setForm(defaultForm)
    } catch {
      const fallbackSubject = encodeURIComponent(
        form.subject || 'Portfolio Contact Inquiry'
      )

      const fallbackBody = encodeURIComponent(
        `Hi Devesh,\n\nI visited your portfolio and want to connect.\n\nName: ${form.name}\nEmail: ${form.email}\nCategory: ${form.category}\nSubject: ${form.subject}\nMessage: ${form.message}\n\nRegards,\n${form.name}`
      )

      window.location.href = `mailto:${email}?subject=${fallbackSubject}&body=${fallbackBody}`

      setStatus({
        type: 'success',
        message:
          'Backend is unavailable right now, so your email app has been opened.',
      })
    }
  }

  return (
    <>
      <SEO
        title="Contact Devesh Sahu | MERN Stack Developer"
        description="Contact Devesh Sahu for MERN stack internship, software development roles, freelance web development, React projects and collaboration opportunities."
        path="/contact"
      />

      <main className="contactx-page">
        <section className="contactx-hero">
          <div className="contactx-hero-copy">
            <div className="contactx-kicker">
              <span />
              Contact Center
            </div>

            <h1>
              Let’s connect for internships, freelance projects or technical
              collaboration.
            </h1>

            <p>
              I’m <strong>Devesh Sahu</strong>, a MERN Stack Developer and B.Tech
              IT student. Reach out for software development internships,
              freelance websites, full-stack projects, project reviews or
              collaboration.
            </p>

            <div className="contactx-actions">
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="contactx-primary-btn">
                <FiMessageCircle /> WhatsApp Me
              </a>

              <a href={directMailLink} className="contactx-secondary-btn">
                <FiMail /> Send Email
              </a>

              <a href="/resume.pdf" download className="contactx-secondary-btn">
                <FiDownload /> Resume
              </a>
            </div>

            <div className="contactx-copy-mail">
              <button type="button" onClick={handleCopyEmail}>
                <FiCopy />
                {copied ? 'Email copied' : 'Copy email address'}
              </button>

              <span>{email}</span>
            </div>
          </div>

          <aside className="contactx-profile-card">
            <div className="contactx-profile-top">
              <span>Available Now</span>
              <h2>Devesh Sahu</h2>
              <p>MERN Stack Developer · B.Tech IT</p>
            </div>

            <div className="contactx-location-card">
              <FiMapPin />
              <div>
                <strong>India</strong>
                <span>Remote / Hybrid / On-site flexible</span>
              </div>
            </div>

            <div className="contactx-availability-list">
              {availability.map((item) => (
                <div key={item}>
                  <FiCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="contactx-quick-grid">
          {quickLinks.map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
              <div>
                <Icon />
              </div>

              <span>{label}</span>
              <strong>{value}</strong>
            </a>
          ))}
        </section>

        <section className="contactx-section">
          <div className="contactx-section-head">
            <span>Choose Purpose</span>
            <h2>Where should your message go?</h2>
            <p>
              Pick the right path based on whether you are a recruiter, client,
              reviewer or collaborator.
            </p>
          </div>

          <div className="contactx-option-grid">
            {contactOptions.map(({ icon: Icon, title, desc, cta, link }) => (
              <Link key={title} to={link} className="contactx-option-card">
                <div className="contactx-icon">
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>

                <span>
                  {cta} <FiArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="contactx-two-col">
          <div className="contactx-panel">
            <div className="contactx-section-head small">
              <span>Response Promise</span>
              <h2>Simple and clear communication.</h2>
            </div>

            <div className="contactx-promise-list">
              {responsePromise.map(({ icon: Icon, title, desc }) => (
                <article key={title}>
                  <Icon />

                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="contactx-panel">
            <div className="contactx-section-head small">
              <span>Best For</span>
              <h2>Contact me for these opportunities.</h2>
            </div>

            <div className="contactx-best-list">
              {[
                'Software Development Internship',
                'MERN Stack Internship',
                'Frontend Developer Internship',
                'Backend Developer Internship',
                'Freelance Website Development',
                'React / Node.js project work',
                'Portfolio, dashboard or e-commerce project',
              ].map((item) => (
                <div key={item}>
                  <FiStar />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contactx-form-section">
          <div className="contactx-form-copy">
            <span>Send Message</span>
            <h2>Share details and I’ll reply with next steps.</h2>
            <p>
              Tell me who you are, what you need, and what timeline you have. If
              the backend is unavailable, this form will automatically open your
              email app.
            </p>

            <div className="contactx-form-pills">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <FiMessageCircle /> WhatsApp directly
              </a>

              <a href={directMailLink}>
                <FiMail /> Email directly
              </a>

              <Link to="/projects">
                <FiExternalLink /> View work
              </Link>
            </div>
          </div>

          <form className="contactx-form" onSubmit={handleSubmit}>
            <div className="contactx-form-grid">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </label>
            </div>

            <div className="contactx-form-grid">
              <label>
                Category
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Recruiter / HR">Recruiter / HR</option>
                  <option value="Freelance Client">Freelance Client</option>
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="Technical Review">Technical Review</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Subject
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Message subject"
                  required
                />
              </label>
            </div>

            <label>
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message, role details, project requirement or collaboration idea..."
                rows="6"
                required
              />
            </label>

            {status.message && (
              <div className={`contactx-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <button type="submit" className="contactx-submit">
              <FiSend />
              {status.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>

        <section className="contactx-final-cta">
          <div>
            <span>Ready to connect?</span>
            <h2>Start with resume, projects or a direct message.</h2>
            <p>
              Recruiters can review my resume and project proof. Clients can send
              project requirements directly.
            </p>
          </div>

          <div>
            <Link to="/recruiter">
              Recruiter Hub <FiBriefcase />
            </Link>

            <Link to="/freelance">
              Freelance Work <FiGlobe />
            </Link>

            <a href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp <FiMessageCircle />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}