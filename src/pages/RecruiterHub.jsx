import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiClipboard,
  FiClock,
  FiCode,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiStar,
  FiTarget,
  FiUserCheck,
  FiZap,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import ResumeLink from '../components/ResumeLink'
import LiveProfileStatus, { RecruiterAvailabilityList } from '../components/LiveProfileStatus'
import LiveLeetCodeStat from '../components/LiveLeetCodeStat'
import InterviewBookingForm from '../components/InterviewBookingForm'
import projects from '../data/projects'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-4b9u.onrender.com'

const recruiterHighlights = [
  {
    icon: FiCode,
    title: 'MERN Stack Ready',
    desc: 'React, Node.js, Express, MongoDB, REST APIs and deployed full-stack projects.',
  },
  {
    icon: FiTarget,
    title: 'Project Proof',
    desc: 'Live apps, GitHub repositories, backend API structure and real deployment experience.',
  },
  {
    icon: FiZap,
    title: 'Fast Learner',
    desc: 'Quickly improves projects, fixes bugs, learns from feedback and ships updates.',
  },
  {
    icon: FiUserCheck,
    title: 'Internship Ready',
    desc: 'Open for software development, frontend, backend and full-stack internship roles.',
  },
]

const quickStats = [
  {
    liveLeetCode: true,
    label: 'LeetCode Problems',
  },
  { value: '4+', label: 'Projects Built' },
  { value: 'MERN', label: 'Primary Stack' },
  { value: '2027', label: 'Graduation Batch' },
]

const resumeSnapshot = [
  'B.Tech Information Technology student',
  'MERN Stack Developer',
  'React.js, Node.js, Express.js, MongoDB',
  'REST APIs, JWT Auth, Git, GitHub',
  'Live deployed projects on Vercel and Render',
  'Available for internship and entry-level opportunities',
]

const roleFit = [
  'Software Development Intern',
  'Full Stack Developer Intern',
  'Frontend Developer Intern',
  'Backend Developer Intern',
  'MERN Stack Intern',
]

const availability = [
  {
    label: 'Interview Mode',
    value: 'Online / Phone / Google Meet',
  },
  {
    label: 'Joining',
    value: 'As per company requirement',
  },
  {
    label: 'Preferred Roles',
    value: 'Full Stack, Frontend, Backend',
  },
  {
    label: 'Location',
    value: 'India Ã‚Â· Remote / Hybrid / On-site',
  },
]

const defaultForm = {
  recruiterName: '',
  companyName: '',
  email: '',
  role: '',
  message: '',
}

export default function RecruiterHub() {
  const [form, setForm] = useState(defaultForm)
  const [status, setStatus] = useState({
    type: '',
    message: '',
  })
  const [copied, setCopied] = useState(false)

  const featuredProjects = useMemo(() => projects.slice(0, 3), [])

  const email = 'deveshsahu567@gmail.com'
  const phone = '+91 7607997416'

  const whatsappLink =
    'https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20visited%20your%20portfolio%20and%20want%20to%20discuss%20an%20opportunity.'

  const mailLink =
    'mailto:deveshsahu567@gmail.com?subject=Software%20Development%20Opportunity%20for%20Devesh%20Sahu&body=Hi%20Devesh%2C%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity.%0A%0ACompany%3A%0ARole%3A%0ALocation%3A%0ANext%20steps%3A%0A%0ARegards%2C'

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
      message: 'Sending recruiter request...',
    })

    try {
      const response = await fetch(`${API_URL}/api/recruiter/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recruiterName: form.recruiterName,
          companyName: form.companyName,
          email: form.email,
          role: form.role,
          message: form.message,
        }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(data?.message || 'Request failed')
      }

      setStatus({
        type: 'success',
        message: 'Request sent successfully. Devesh will respond soon.',
      })

      setForm(defaultForm)
    } catch (error) {
      const fallbackSubject = encodeURIComponent(
        `Recruiter Inquiry - ${form.role || 'Software Development Role'}`
      )

      const fallbackBody = encodeURIComponent(
        `Hi Devesh,\n\nI visited your portfolio and want to discuss an opportunity.\n\nRecruiter Name: ${form.recruiterName}\nCompany: ${form.companyName}\nEmail: ${form.email}\nRole: ${form.role}\nMessage: ${form.message}\n\nRegards,\n${form.recruiterName}`
      )

      window.location.href = `mailto:${email}?subject=${fallbackSubject}&body=${fallbackBody}`

      setStatus({
        type: 'success',
        message:
          error?.message ||
          'Backend is unavailable right now, so your email app has been opened.',
      })
    }
  }

  return (
    <>
      <SEO
        title="Recruiter Hub | Hire Devesh Sahu"
        description="Recruiter hub for Devesh Sahu, MERN Stack Developer and B.Tech IT student. Review resume, skills, projects, availability and contact details."
        path="/recruiter"
      />

      <main className="recruiterx-page">
        <section className="recruiterx-hero">
          <div className="recruiterx-hero-copy">
            <div className="recruiterx-kicker">
              <span />
              Recruiter Hub
            </div>

            <h1>
              Hire a MERN developer who can build, debug and deploy real
              projects.
            </h1>

            <p>
              I'm <strong>Devesh Sahu</strong>, a B.Tech IT student and MERN
              Stack Developer. This page is designed to help HR and recruiters
              quickly check my skills, projects, resume, availability and contact
              options.
            </p>

            <div className="recruiterx-actions">
              <ResumeLink className="recruiterx-primary-btn">
                <FiDownload /> Download Resume
              </ResumeLink>

              <Link
                to="/recruiter/quick-view"
                className="recruiterx-secondary-btn"
              >
                <FiZap />
                60-Second View
              </Link>

              <a href={mailLink} className="recruiterx-secondary-btn">
                <FiMail /> Email Me
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="recruiterx-secondary-btn"
              >
                <FiMessageCircle /> WhatsApp
              </a>
            </div>

            <div className="recruiterx-contact-strip">
              <button type="button" onClick={handleCopyEmail}>
                <FiClipboard />
                {copied ? 'Email copied' : email}
              </button>

              <a href="tel:+917607997416">
                <FiPhone /> {phone}
              </a>

              <a
                href="https://www.linkedin.com/in/devesh-sahu-560608270/"
                target="_blank"
                rel="noreferrer"
              >
                <FiLinkedin /> LinkedIn
              </a>

              <a
                href="https://github.com/Deveshsahu76"
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub /> GitHub
              </a>
            </div>
          </div>

          <aside className="recruiterx-profile-card">
            <div className="recruiterx-profile-top">
              <span>Candidate Snapshot</span>
              <h2>Devesh Sahu</h2>
              <p>MERN Stack Developer &middot; B.Tech IT</p>
            </div>

            <div className="recruiterx-score-card">
              <div>
                <strong>Internship Ready</strong>
                <span>Frontend / Backend / Full Stack</span>
              </div>

              <FiCheckCircle />
            </div>

            <div className="recruiterx-profile-list">
              <RecruiterAvailabilityList />
            </div>
          </aside>
        </section>

        <section className="recruiterx-stats">
          {quickStats.map((item) =>
            item.liveLeetCode ? (
              <LiveLeetCodeStat
                key={item.label}
                label={item.label}
                fallback={127}
              />
            ) : (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            )
          )}
        </section>

        <LiveProfileStatus />

        <section className="recruiterx-section">
          <div className="recruiterx-section-head">
            <span>Why hire me</span>
            <h2>Quick reasons to shortlist my profile.</h2>
            <p>
              I focus on practical projects, clean UI, backend integration,
              deployment and continuous improvement.
            </p>
          </div>

          <div className="recruiterx-grid">
            {recruiterHighlights.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="recruiterx-card">
                <div className="recruiterx-icon">
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="recruiterx-two-col">
          <div className="recruiterx-panel">
            <div className="recruiterx-section-head small">
              <span>Resume Snapshot</span>
              <h2>Profile summary for HR screening.</h2>
            </div>

            <div className="recruiterx-check-list">
              {resumeSnapshot.map((item) => (
                <div key={item}>
                  <FiCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="recruiterx-panel">
            <div className="recruiterx-section-head small">
              <span>Role Fit</span>
              <h2>Best matching opportunities.</h2>
            </div>

            <div className="recruiterx-role-list">
              {roleFit.map((role) => (
                <div key={role}>
                  <FiBriefcase />
                  <span>{role}</span>
                </div>
              ))}
            </div>

            <div className="recruiterx-note">
              <FiStar />
              <p>
                Best fit for internship roles where I can contribute to React,
                Node.js, REST APIs, MongoDB, dashboards and product features.
              </p>
            </div>
          </div>
        </section>

        <section className="recruiterx-section">
          <div className="recruiterx-section-head">
            <span>Project Proof</span>
            <h2>Projects recruiters can review quickly.</h2>
            <p>
              These projects show frontend, backend, database, deployment and
              real-world implementation skills.
            </p>
          </div>

          <div className="recruiterx-projects">
            {featuredProjects.map((project) => (
              <article key={project.id || project.title}>
                <div className="recruiterx-project-image">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <FiAward />
                  )}
                </div>

                <div className="recruiterx-project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="recruiterx-project-tech">
                    {(project.techStack || []).slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="recruiterx-project-actions">
                    <Link to={`/projects/${project.id}`}>
                      View Case Study <FiArrowRight />
                    </Link>
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
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="recruiterx-contact-section">
          <div className="recruiterx-contact-copy">
            <span>Schedule Interview</span>
            <h2>Send a role or interview request.</h2>
            <p>
              Fill this form to share role details. If backend is unavailable,
              it will automatically open your email app with the same message.
            </p>

            <div className="recruiterx-mini-info">
              <div>
                <FiClock />
                <span>Usually replies fast</span>
              </div>

              <div>
                <FiMapPin />
                <span>India / Flexible location</span>
              </div>

              <div>
                <FiBriefcase />
                <span>Open to internship roles</span>
              </div>
            </div>
          </div>

          <InterviewBookingForm compact />
        </section>

        <section className="recruiterx-final-cta">
          <div>
            <span>Ready to review?</span>
            <h2>Download resume and check my projects.</h2>
            <p>
              For fast screening, start with resume, GitHub and live projects.
            </p>
          </div>

          <div>
            <ResumeLink>
              <FiDownload /> Resume
            </ResumeLink>

            <a href="/projects">
              Projects <FiArrowRight />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}

