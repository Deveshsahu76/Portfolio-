import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiCode,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
  FiPrinter,
  FiShare2,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUserCheck,
  FiZap,
} from 'react-icons/fi'
import { FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import SEO from '../components/SEO'
import { recruiterSchema } from '../seo/schema'
import projects from '../data/projects'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const quickStats = [
  { value: '170+', label: 'LeetCode Problems', icon: FiCode },
  { value: '4+', label: 'Projects Built', icon: FiBriefcase },
  { value: 'MERN', label: 'Primary Stack', icon: FiZap },
  { value: 'Open', label: 'Internship Status', icon: FiUserCheck },
]

const hiringSnapshot = [
  { label: 'Preferred Role', value: 'Software Developer Intern / MERN Stack Intern' },
  { label: 'Current Status', value: 'B.Tech IT Student · Open to Internship' },
  { label: 'Location', value: 'India · Open to Remote / Hybrid / On-site' },
  { label: 'Availability', value: 'Available for interview and assignments' },
  { label: 'Primary Stack', value: 'React.js, Node.js, Express.js, MongoDB' },
  { label: 'Languages', value: 'JavaScript, C++, SQL' },
]

const skills = [
  {
    title: 'Frontend',
    items: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Validation', 'MVC Structure'],
  },
  {
    title: 'Database',
    items: ['MongoDB', 'Mongoose', 'CRUD', 'Schema Design', 'Data Modelling', 'Atlas'],
  },
  {
    title: 'Tools',
    items: ['Git', 'GitHub', 'Vercel', 'Render', 'Postman', 'VS Code'],
  },
]

const whyHire = [
  'Builds complete project flows from frontend to backend',
  'Understands deployment, APIs, authentication and database integration',
  'Has live projects instead of only theory-based resume points',
  'Comfortable with React components, REST APIs and MongoDB schemas',
  'Actively improving DSA with 170+ LeetCode problems solved',
  'Can learn fast and contribute in startup-style engineering teams',
]

const education = [
  {
    title: 'B.Tech Information Technology',
    institute: 'Kanpur Institute of Technology',
    meta: '2023 - 2027',
  },
  {
    title: 'Core Focus',
    institute: 'Full Stack Development, DSA, DBMS, OS and Web Technologies',
    meta: 'Current',
  },
]

const contactLinks = [
  {
    label: 'Email',
    value: 'deveshsahu567@gmail.com',
    href: 'mailto:deveshsahu567@gmail.com',
    icon: FiMail,
  },
  {
    label: 'WhatsApp',
    value: '+91 7607997416',
    href: 'https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20visited%20your%20recruiter%20hub.',
    icon: FaWhatsapp,
  },
  {
    label: 'LinkedIn',
    value: 'Professional profile',
    href: 'https://www.linkedin.com/in/devesh-sahu-560608270/',
    icon: FaLinkedin,
  },
  {
    label: 'GitHub',
    value: 'Code repositories',
    href: 'https://github.com/Deveshsahu76',
    icon: FiGithub,
  },
]

export default function RecruiterHub() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    preferredDate: '',
    message: '',
  })

  const [status, setStatus] = useState({
    type: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const featuredProjects = projects.slice(0, 3)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch(`${API_URL}/api/recruiter/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recruiterName: formData.name,
          companyName: formData.company,
          preferredRole: formData.role,
          source: 'Recruiter Hub',
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit request right now.')
      }

      setStatus({
        type: 'success',
        message: 'Thanks! Your request has been submitted successfully.',
      })

      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        phone: '',
        preferredDate: '',
        message: '',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message ||
          'Something went wrong. You can also contact me directly through Email or WhatsApp.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShare = async () => {
    const url = 'https://deveshsahuportfolio.vercel.app/recruiter'

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Devesh Sahu | Recruiter Hub',
          text: 'Recruiter-ready profile of Devesh Sahu, MERN Stack Developer.',
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        setStatus({
          type: 'success',
          message: 'Recruiter Hub link copied to clipboard.',
        })
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not share right now. You can copy the URL manually.',
      })
    }
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('deveshsahu567@gmail.com')
      setStatus({
        type: 'success',
        message: 'Email copied to clipboard.',
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not copy email.',
      })
    }
  }

  return (
    <>
      <SEO
        title="Recruiter Hub | Hire Devesh Sahu MERN Stack Developer"
        description="Recruiter dashboard for Devesh Sahu: resume, skills, MERN projects, availability, education, coding profiles and interview booking."
        path="/recruiter"
        schema={recruiterSchema}
      />

      <main className="recruiter-page">
        <section className="recruiter-hero">
          <div className="recruiter-hero-copy">
            <div className="recruiter-badge">
              <span />
              Recruiter-ready profile
            </div>

            <h1>
              Shortlist a developer who can <span>build, deploy and explain.</span>
            </h1>

            <p>
              I’m <strong>Devesh Sahu</strong>, a MERN Stack Developer and B.Tech
              IT student. This recruiter hub is designed to help HR quickly review
              my skills, projects, resume, education and contact options.
            </p>

            <div className="recruiter-cta-row">
              <a href="/resume.pdf" download className="recruiter-primary-btn">
                <FiDownload /> Download Resume
              </a>

              <a href="/resume.pdf" download className="recruiter-secondary-btn">
                <FiShield /> ATS Resume
              </a>

              <a
                href="mailto:deveshsahu567@gmail.com?subject=Interview%20Opportunity%20for%20Devesh%20Sahu"
                className="recruiter-secondary-btn"
              >
                <FiMail /> Email Me
              </a>
            </div>

            <div className="recruiter-action-mini">
              <button type="button" onClick={() => window.print()}>
                <FiPrinter /> Print profile
              </button>

              <button type="button" onClick={handleShare}>
                <FiShare2 /> Share profile
              </button>

              <button type="button" onClick={handleCopyEmail}>
                <FiCopy /> Copy email
              </button>
            </div>
          </div>

          <aside className="recruiter-score-card">
            <div className="recruiter-score-top">
              <div>
                <span>Candidate Snapshot</span>
                <h2>Devesh Sahu</h2>
                <p>MERN Stack Developer · Open to Internship</p>
              </div>

              <div className="recruiter-open-pill">
                <span />
                Available
              </div>
            </div>

            <div className="recruiter-score-grid">
              {quickStats.map(({ value, label, icon: Icon }) => (
                <div key={label}>
                  <Icon />
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="recruiter-fit-card">
              <FiStar />
              <div>
                <strong>Best fit for</strong>
                <span>Frontend Intern · MERN Intern · Full Stack Intern</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="recruiter-section recruiter-snapshot-section">
          <div className="recruiter-section-head">
            <span>15-second HR summary</span>
            <h2>Everything important, visible instantly.</h2>
            <p>
              This section gives recruiters quick clarity before opening resume or
              project pages.
            </p>
          </div>

          <div className="recruiter-snapshot-grid">
            {hiringSnapshot.map((item) => (
              <article key={item.label} className="recruiter-snapshot-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="recruiter-section recruiter-two-col">
          <div className="recruiter-panel">
            <div className="recruiter-section-head small">
              <span>Technical skills</span>
              <h2>Skills matrix</h2>
              <p>Organized by practical engineering areas recruiters usually check.</p>
            </div>

            <div className="recruiter-skills-grid">
              {skills.map((group) => (
                <article key={group.title} className="recruiter-skill-card">
                  <h3>{group.title}</h3>

                  <div>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="recruiter-panel">
            <div className="recruiter-section-head small">
              <span>Why hire me</span>
              <h2>Recruiter trust signals</h2>
              <p>Proof points that reduce shortlisting risk.</p>
            </div>

            <div className="recruiter-check-list">
              {whyHire.map((item) => (
                <div key={item}>
                  <FiCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="recruiter-section">
          <div className="recruiter-section-head recruiter-section-head-row">
            <div>
              <span>Project proof</span>
              <h2>Projects that show real execution.</h2>
              <p>
                These projects prove frontend, backend, database, authentication,
                deployment and problem-solving ability.
              </p>
            </div>

            <Link to="/projects" className="recruiter-secondary-btn">
              View all projects <FiExternalLink />
            </Link>
          </div>

          <div className="recruiter-project-proof-grid">
            {featuredProjects.map((project) => (
              <article key={project.id || project.title} className="recruiter-project-card">
                <div>
                  <span>Featured Project</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <div className="recruiter-project-tags">
                  {(project.techStack || []).slice(0, 4).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="recruiter-project-links">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      Live <FiExternalLink />
                    </a>
                  )}

                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer">
                      Code <FiGithub />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="recruiter-section recruiter-two-col">
          <div className="recruiter-panel">
            <div className="recruiter-section-head small">
              <span>Education</span>
              <h2>Academic background</h2>
            </div>

            <div className="recruiter-education-list">
              {education.map((item) => (
                <article key={item.title}>
                  <FiBookOpen />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.institute}</p>
                    <span>{item.meta}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="recruiter-panel">
            <div className="recruiter-section-head small">
              <span>Coding & profiles</span>
              <h2>Verification links</h2>
            </div>

            <div className="recruiter-profile-links">
              <a
                href="https://github.com/Deveshsahu76"
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub />
                <div>
                  <strong>GitHub</strong>
                  <span>Repositories and project code</span>
                </div>
                <FiArrowRight />
              </a>

              <a
                href="https://www.linkedin.com/in/devesh-sahu-560608270/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
                <div>
                  <strong>LinkedIn</strong>
                  <span>Professional profile and network</span>
                </div>
                <FiArrowRight />
              </a>

              <a
                href="mailto:deveshsahu567@gmail.com"
              >
                <FiMail />
                <div>
                  <strong>Email</strong>
                  <span>Direct recruiter contact</span>
                </div>
                <FiArrowRight />
              </a>
            </div>
          </div>
        </section>

        <section className="recruiter-section recruiter-contact-section">
          <div className="recruiter-contact-copy">
            <span>Interview request</span>
            <h2>Send interview, assignment or hiring inquiry.</h2>
            <p>
              Submit this form and I will receive your recruiter request. You can
              also contact me directly through Email, WhatsApp or LinkedIn.
            </p>

            <div className="recruiter-contact-list">
              {contactLinks.map(({ label, value, href, icon: Icon }) => (
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
                  <FiArrowRight />
                </a>
              ))}
            </div>
          </div>

          <form className="recruiter-form" onSubmit={handleSubmit}>
            <div className="recruiter-form-grid">
              <label>
                Your Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Recruiter / HR name"
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
                  placeholder="official@email.com"
                  required
                />
              </label>

              <label>
                Company
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company name"
                />
              </label>

              <label>
                Role
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="MERN Intern / SDE Intern"
                />
              </label>

              <label>
                Phone / Contact
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91..."
                />
              </label>

              <label>
                Preferred Date
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share interview details, assignment, role link or next step..."
                rows="5"
              />
            </label>

            {status.message && (
              <div className={`recruiter-form-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Recruiter Request'}
              <FiArrowRight />
            </button>
          </form>
        </section>
      </main>
    </>
  )
}