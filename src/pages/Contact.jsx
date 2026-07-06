import React, { useMemo, useState } from 'react'
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
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiShield,
  FiStar,
  FiTarget,
  FiUserCheck,
  FiZap,
} from 'react-icons/fi'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import SEO from '../components/SEO'
import { personSchema } from '../seo/schema'

const contactOptions = [
  {
    icon: FiBriefcase,
    title: 'Recruiter / HR',
    desc: 'Interview, internship, assignment, shortlisting or resume review.',
    action: 'Open Recruiter Hub',
    href: '/recruiter',
    type: 'internal',
  },
  {
    icon: FiGlobe,
    title: 'Freelance Client',
    desc: 'Portfolio, business website, dashboard, admin panel or MERN app.',
    action: 'Open Freelance Page',
    href: '/freelance',
    type: 'internal',
  },
  {
    icon: FiCode,
    title: 'Project Review',
    desc: 'GitHub, live demo, architecture, APIs and project explanation.',
    action: 'View Projects',
    href: '/projects',
    type: 'internal',
  },
]

const directLinks = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'deveshsahu567@gmail.com',
    href: 'mailto:deveshsahu567@gmail.com',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+91 7607997416',
    href: 'https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20visited%20your%20portfolio%20and%20want%20to%20connect.',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'Professional profile',
    href: 'https://www.linkedin.com/in/devesh-sahu-560608270/',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'Code repositories',
    href: 'https://github.com/Deveshsahu76',
  },
]

const trustPoints = [
  'Open to software development internships',
  'Available for MERN stack freelance projects',
  'React, Node.js, Express and MongoDB focused',
  '170+ LeetCode problems solved',
  'Live projects and GitHub proof available',
  'Quick response through Email or WhatsApp',
]

const faqs = [
  {
    q: 'What is the best way to contact you?',
    a: 'For fast response, WhatsApp or Email is best. Recruiters can also use the Recruiter Hub.',
  },
  {
    q: 'Are you available for internship?',
    a: 'Yes, I am open to software development, MERN stack, frontend and full-stack internship opportunities.',
  },
  {
    q: 'Do you take freelance projects?',
    a: 'Yes, I can build portfolio websites, business websites, dashboards, backend APIs and MERN apps.',
  },
  {
    q: 'Can I review your projects first?',
    a: 'Yes, open the Projects page to see live demos, GitHub links, tech stack, APIs and database schema.',
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Recruiter / HR',
    message: '',
  })

  const [status, setStatus] = useState('')

  const whatsappMessage = useMemo(() => {
    const text = `Hi Devesh, I visited your portfolio.

Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Category: ${formData.category}
Message: ${formData.message || 'I want to connect with you.'}`

    return `https://wa.me/917607997416?text=${encodeURIComponent(text)}`
  }, [formData])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const subject = encodeURIComponent(
      `Portfolio Contact: ${formData.category} - ${formData.name || 'Visitor'}`
    )

    const body = encodeURIComponent(`Hi Devesh,

I visited your portfolio and want to connect.

Name: ${formData.name}
Email: ${formData.email}
Category: ${formData.category}

Message:
${formData.message}

Regards,
${formData.name}`)

    window.location.href = `mailto:deveshsahu567@gmail.com?subject=${subject}&body=${body}`

    setStatus('Email app opened. You can send the message from there.')
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('deveshsahu567@gmail.com')
      setStatus('Email copied to clipboard.')
    } catch {
      setStatus('Could not copy email. Please copy it manually.')
    }
  }

  return (
    <>
      <SEO
        title="Contact Devesh Sahu | MERN Stack Developer"
        description="Contact Devesh Sahu for software development internships, MERN stack projects, freelance websites, recruiter inquiries and collaboration opportunities."
        path="/contact"
        schema={personSchema}
      />

      <main className="contact-premium-page">
        <section className="contact-premium-hero">
          <div className="contact-premium-copy">
            <div className="contact-premium-badge">
              <span />
              Contact Devesh Sahu
            </div>

            <h1>
              Let’s make the next step <span>simple and direct.</span>
            </h1>

            <p>
              Whether you are a recruiter, HR, freelance client, developer or
              collaborator, this page helps you contact me quickly with the right
              context.
            </p>

            <div className="contact-premium-actions">
              <a
                href="mailto:deveshsahu567@gmail.com"
                className="contact-premium-primary-btn"
              >
                <FiMail /> Email Me
              </a>

              <a
                href="https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20visited%20your%20portfolio."
                target="_blank"
                rel="noreferrer"
                className="contact-premium-secondary-btn"
              >
                <FaWhatsapp /> WhatsApp
              </a>

              <a href="/resume.pdf" download className="contact-premium-secondary-btn">
                <FiDownload /> Resume
              </a>
            </div>
          </div>

          <aside className="contact-premium-card">
            <div className="contact-premium-card-top">
              <span>Response Snapshot</span>
              <h2>Fast contact flow</h2>
              <p>Email, WhatsApp, LinkedIn and recruiter-specific pages.</p>
            </div>

            <div className="contact-premium-info-grid">
              <div>
                <FiClock />
                <strong>Quick</strong>
                <span>Response focused</span>
              </div>

              <div>
                <FiMapPin />
                <strong>India</strong>
                <span>Remote / Hybrid</span>
              </div>

              <div>
                <FiUserCheck />
                <strong>Open</strong>
                <span>Internship</span>
              </div>

              <div>
                <FiZap />
                <strong>MERN</strong>
                <span>Primary stack</span>
              </div>
            </div>

            <div className="contact-premium-terminal">
              <div>
                <span />
                <span />
                <span />
              </div>

              <p>
                <strong>$</strong> contact --devesh
              </p>

              <code>Email and WhatsApp routes are ready.</code>
            </div>
          </aside>
        </section>

        <section className="contact-premium-section">
          <div className="contact-premium-section-head">
            <span>Choose your path</span>
            <h2>Different visitors need different actions.</h2>
            <p>
              This section sends recruiters, clients and project reviewers to the
              right place without confusion.
            </p>
          </div>

          <div className="contact-premium-options-grid">
            {contactOptions.map(({ icon: Icon, title, desc, action, href }) => (
              <a key={title} href={href} className="contact-premium-option-card">
                <div>
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>

                <span>
                  {action} <FiArrowRight />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-premium-section contact-premium-main-grid">
          <div className="contact-premium-panel">
            <div className="contact-premium-section-head small">
              <span>Direct contact</span>
              <h2>Reach me instantly.</h2>
              <p>
                Use Email or WhatsApp for the fastest communication. LinkedIn and
                GitHub are also available for profile verification.
              </p>
            </div>

            <div className="contact-premium-links">
              {directLinks.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <Icon />
                  <div>
                    <strong>{label}</strong>
                    <span>{value}</span>
                  </div>
                  <FiExternalLink />
                </a>
              ))}
            </div>

            <button type="button" onClick={copyEmail} className="contact-copy-btn">
              <FiCopy /> Copy Email
            </button>
          </div>

          <form className="contact-premium-form" onSubmit={handleSubmit}>
            <div className="contact-premium-form-head">
              <span>Smart message</span>
              <h2>Send context clearly.</h2>
              <p>
                This form opens your email app with a ready-to-send message. No
                backend dependency, no delay.
              </p>
            </div>

            <div className="contact-premium-form-grid">
              <label>
                Name
                <input
                  name="name"
                  value={formData.name}
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
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  required
                />
              </label>
            </div>

            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Recruiter / HR</option>
                <option>Freelance Project</option>
                <option>Internship Opportunity</option>
                <option>Project Review</option>
                <option>Collaboration</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                placeholder="Write your message, role details, project idea or next step..."
                required
              />
            </label>

            {status && <div className="contact-premium-status">{status}</div>}

            <div className="contact-premium-form-actions">
              <button type="submit">
                Open Email <FiSend />
              </button>

              <a href={whatsappMessage} target="_blank" rel="noreferrer">
                WhatsApp Message <FaWhatsapp />
              </a>
            </div>
          </form>
        </section>

        <section className="contact-premium-section contact-premium-trust">
          <div>
            <span>Why contact me?</span>
            <h2>Clear profile. Real project proof. Fast next step.</h2>
            <p>
              I have structured my portfolio so recruiters and clients can verify
              my work quickly before contacting me.
            </p>
          </div>

          <div className="contact-premium-trust-list">
            {trustPoints.map((item) => (
              <div key={item}>
                <FiCheckCircle />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-premium-section">
          <div className="contact-premium-section-head">
            <span>Before contacting</span>
            <h2>Helpful quick links.</h2>
            <p>
              Review my work, skills and recruiter dashboard before starting the
              conversation.
            </p>
          </div>

          <div className="contact-premium-quick-grid">
            <a href="/projects">
              <FiCode />
              <strong>Projects</strong>
              <span>Live demos, GitHub, APIs and case studies.</span>
            </a>

            <a href="/skills">
              <FiTarget />
              <strong>Skills</strong>
              <span>React, Node, Express, MongoDB and DSA proof.</span>
            </a>

            <a href="/recruiter">
              <FiBriefcase />
              <strong>Recruiter Hub</strong>
              <span>Resume, availability, education and hiring snapshot.</span>
            </a>

            <a href="/freelance">
              <FiGlobe />
              <strong>Freelance</strong>
              <span>Services, pricing, workflow and project estimator.</span>
            </a>
          </div>
        </section>

        <section className="contact-premium-section">
          <div className="contact-premium-section-head">
            <span>FAQs</span>
            <h2>Common contact questions.</h2>
          </div>

          <div className="contact-premium-faq-grid">
            {faqs.map((item) => (
              <article key={item.q}>
                <FiStar />
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-premium-final-cta">
          <div>
            <span>Ready to connect?</span>
            <h2>Send a message and I’ll respond with the next step.</h2>
            <p>
              For hiring, freelance projects or collaboration, share the context
              and I’ll reply as soon as possible.
            </p>
          </div>

          <div className="contact-premium-final-actions">
            <a href="mailto:deveshsahu567@gmail.com">
              <FiMail /> Email
            </a>

            <a
              href="https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20want%20to%20connect."
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </section>
      </main>
    </>
  )
}