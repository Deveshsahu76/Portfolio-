import React, { useMemo, useState } from 'react'
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiDatabase,
  FiDollarSign,
  FiExternalLink,
  FiGlobe,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiMonitor,
  FiSend,
  FiShield,
  FiShoppingCart,
  FiSmartphone,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import projects from '../data/projects'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-4b9u.onrender.com'

const services = [
  {
    icon: FiGlobe,
    title: 'Business Website',
    desc: 'Modern responsive website for shops, startups, coaching, portfolio, local business and service providers.',
    features: ['Responsive UI', 'SEO setup', 'Contact form', 'Fast deployment'],
  },
  {
    icon: FiShoppingCart,
    title: 'E-Commerce Store',
    desc: 'Product listing, cart, orders, authentication and payment gateway ready shopping website.',
    features: ['Products', 'Cart', 'Orders', 'Admin-ready structure'],
  },
  {
    icon: FiMonitor,
    title: 'Dashboard UI',
    desc: 'Clean dashboard for admin panels, analytics, orders, users, reports and internal business tools.',
    features: ['Charts-ready UI', 'Tables', 'Filters', 'Protected layout'],
  },
  {
    icon: FiCode,
    title: 'MERN Web App',
    desc: 'Full-stack app with React frontend, Node/Express backend, MongoDB database and REST APIs.',
    features: ['Frontend', 'Backend APIs', 'Database', 'Deployment'],
  },
]

const packages = [
  {
    name: 'Starter',
    price: '₹2,999 - ₹5,999',
    bestFor: 'Portfolio / landing page / basic business site',
    timeline: '2 - 4 days',
    points: [
      '1-3 responsive pages',
      'Modern UI design',
      'Contact section',
      'Basic SEO setup',
      'Vercel deployment',
    ],
  },
  {
    name: 'Growth',
    price: '₹6,999 - ₹14,999',
    bestFor: 'Business website / service website / small web app',
    timeline: '5 - 10 days',
    points: [
      '4-8 responsive pages',
      'Contact form integration',
      'Reusable React components',
      'SEO + performance basics',
      'Deployment support',
    ],
    popular: true,
  },
  {
    name: 'Pro MERN',
    price: '₹15,000+',
    bestFor: 'Full-stack app / dashboard / e-commerce structure',
    timeline: '10+ days',
    points: [
      'Frontend + backend',
      'MongoDB database',
      'REST API integration',
      'Authentication flow',
      'Frontend and backend deployment',
    ],
  },
]

const process = [
  {
    step: '01',
    title: 'Requirement Discussion',
    desc: 'We discuss business goal, pages, features, design style, deadline and budget.',
  },
  {
    step: '02',
    title: 'UI + Structure Planning',
    desc: 'I plan page sections, user flow, CTA placement, tech stack and project structure.',
  },
  {
    step: '03',
    title: 'Development',
    desc: 'Frontend, backend, APIs, database and responsive UI are built step by step.',
  },
  {
    step: '04',
    title: 'Testing + Deployment',
    desc: 'Final testing, bug fixing, deployment and handover with source code or live link.',
  },
]

const trustPoints = [
  {
    icon: FiZap,
    title: 'Fast Delivery',
    desc: 'Focused delivery with clear milestones and regular updates.',
  },
  {
    icon: FiShield,
    title: 'Clean Code',
    desc: 'Readable file structure, reusable components and maintainable code.',
  },
  {
    icon: FiTrendingUp,
    title: 'Business Focused',
    desc: 'Website is built for trust, conversions, leads and real users.',
  },
  {
    icon: FiDatabase,
    title: 'Backend Ready',
    desc: 'Can build APIs, MongoDB schema and full-stack logic when needed.',
  },
]

const defaultForm = {
  name: '',
  email: '',
  whatsapp: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
}

const projectTypes = [
  'Business Website',
  'Portfolio Website',
  'E-Commerce Website',
  'Dashboard / Admin Panel',
  'MERN Web App',
  'Bug Fixing / UI Improvement',
]

const budgetOptions = [
  'Below ₹3,000',
  '₹3,000 - ₹7,000',
  '₹7,000 - ₹15,000',
  '₹15,000+',
  'Need discussion',
]

const timelineOptions = [
  'Urgent',
  'Within 3-5 days',
  'Within 1-2 weeks',
  'Flexible',
]

export default function Freelance() {
  const [form, setForm] = useState(defaultForm)
  const [status, setStatus] = useState({
    type: '',
    message: '',
  })

  const featuredProjects = useMemo(() => projects.slice(0, 3), [])

  const email = 'deveshsahu567@gmail.com'
  const whatsappLink =
    'https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20visited%20your%20portfolio%20and%20want%20to%20discuss%20a%20freelance%20project.'

  const mailLink =
    'mailto:deveshsahu567@gmail.com?subject=Freelance%20Project%20Inquiry&body=Hi%20Devesh%2C%0A%0AI%20visited%20your%20portfolio%20and%20want%20to%20discuss%20a%20project.%0A%0AProject%20Type%3A%0ABudget%3A%0ATimeline%3A%0ARequirements%3A%0A%0ARegards%2C'

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setStatus({
      type: 'loading',
      message: 'Sending project request...',
    })

    try {
      const response = await fetch(`${API_URL}/api/freelance/request`, {
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
        message: 'Project request sent successfully. I will respond soon.',
      })

      setForm(defaultForm)
    } catch {
      const fallbackSubject = encodeURIComponent(
        `Freelance Project Inquiry - ${form.projectType || 'Website Project'}`
      )

      const fallbackBody = encodeURIComponent(
        `Hi Devesh,\n\nI visited your portfolio and want to discuss a freelance project.\n\nName: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nProject Type: ${form.projectType}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\nRequirements: ${form.message}\n\nRegards,\n${form.name}`
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
        title="Freelance Services | Devesh Sahu"
        description="Hire Devesh Sahu for freelance website development, MERN stack web apps, business websites, dashboard UI, e-commerce websites and React projects."
        path="/freelance"
      />

      <main className="freelancex-page">
        <section className="freelancex-hero">
          <div className="freelancex-hero-copy">
            <div className="freelancex-kicker">
              <span />
              Freelance Web Development
            </div>

            <h1>
              Need a website or web app? I can build it with clean UI and real
              deployment.
            </h1>

            <p>
              I build responsive websites, business landing pages, dashboards,
              e-commerce structures and MERN stack apps using React, Node.js,
              Express and MongoDB.
            </p>

            <div className="freelancex-actions">
              <a href="#project-request" className="freelancex-primary-btn">
                Start a Project <FiArrowRight />
              </a>

              <a href={whatsappLink} target="_blank" rel="noreferrer" className="freelancex-secondary-btn">
                <FiMessageCircle /> WhatsApp
              </a>

              <a href={mailLink} className="freelancex-secondary-btn">
                <FiMail /> Email
              </a>
            </div>
          </div>

          <aside className="freelancex-quote-card">
            <span>Client Snapshot</span>
            <h2>What I can deliver</h2>

            <div className="freelancex-quote-list">
              <div>
                <FiCheckCircle />
                <strong>Responsive website</strong>
              </div>

              <div>
                <FiCheckCircle />
                <strong>Frontend + backend</strong>
              </div>

              <div>
                <FiCheckCircle />
                <strong>Contact form / lead form</strong>
              </div>

              <div>
                <FiCheckCircle />
                <strong>Deployment support</strong>
              </div>
            </div>

            <div className="freelancex-mini-price">
              <FiDollarSign />
              <div>
                <strong>Starting from ₹2,999</strong>
                <span>Final cost depends on features and timeline.</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="freelancex-stats">
          <div>
            <strong>4+</strong>
            <span>Project types</span>
          </div>

          <div>
            <strong>MERN</strong>
            <span>Full stack</span>
          </div>

          <div>
            <strong>SEO</strong>
            <span>Basic setup</span>
          </div>

          <div>
            <strong>Live</strong>
            <span>Deployment</span>
          </div>
        </section>

        <section className="freelancex-section">
          <div className="freelancex-section-head">
            <span>Services</span>
            <h2>Freelance services I can build for clients.</h2>
            <p>
              Choose a simple website, business website, dashboard or complete
              MERN stack application based on your requirement.
            </p>
          </div>

          <div className="freelancex-service-grid">
            {services.map(({ icon: Icon, title, desc, features }) => (
              <article key={title} className="freelancex-service-card">
                <div className="freelancex-icon">
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>

                <div className="freelancex-feature-list">
                  {features.map((feature) => (
                    <span key={feature}>
                      <FiCheckCircle /> {feature}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="freelancex-section">
          <div className="freelancex-section-head">
            <span>Packages</span>
            <h2>Simple pricing structure for quick decision.</h2>
            <p>
              These are starting ranges. Final price depends on pages, backend,
              deadline, design complexity and integrations.
            </p>
          </div>

          <div className="freelancex-package-grid">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`freelancex-package-card ${item.popular ? 'popular' : ''}`}
              >
                {item.popular && <div className="freelancex-popular">Most Popular</div>}

                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
                <p>{item.bestFor}</p>

                <div className="freelancex-timeline">
                  <FiClock />
                  <span>{item.timeline}</span>
                </div>

                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <FiCheckCircle />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a href="#project-request">
                  Choose Plan <FiArrowRight />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="freelancex-section freelancex-process-section">
          <div className="freelancex-section-head">
            <span>Process</span>
            <h2>How your project will move from idea to live website.</h2>
          </div>

          <div className="freelancex-process-grid">
            {process.map((item) => (
              <article key={item.step}>
                <strong>{item.step}</strong>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="freelancex-two-col">
          <div className="freelancex-panel">
            <div className="freelancex-section-head small">
              <span>Why work with me</span>
              <h2>Client-friendly development approach.</h2>
            </div>

            <div className="freelancex-trust-grid">
              {trustPoints.map(({ icon: Icon, title, desc }) => (
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

          <div className="freelancex-panel">
            <div className="freelancex-section-head small">
              <span>Deliverables</span>
              <h2>What you can expect.</h2>
            </div>

            <div className="freelancex-deliverables">
              {[
                'Responsive UI for mobile and desktop',
                'Clean React component structure',
                'Backend APIs when required',
                'MongoDB schema when required',
                'Basic SEO and meta tags',
                'Deployment support',
                'Source code handover',
              ].map((item) => (
                <div key={item}>
                  <FiCheckCircle />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="freelancex-section">
          <div className="freelancex-section-head">
            <span>Proof of Work</span>
            <h2>Projects that show my development ability.</h2>
          </div>

          <div className="freelancex-project-grid">
            {featuredProjects.map((project) => (
              <article key={project.id || project.title}>
                <div className="freelancex-project-image">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <FiLayers />
                  )}
                </div>

                <div className="freelancex-project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="freelancex-project-actions">
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer">
                        Live <FiExternalLink />
                      </a>
                    )}

                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer">
                        Code <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="project-request" className="freelancex-contact-section">
          <div className="freelancex-contact-copy">
            <span>Project Request</span>
            <h2>Tell me what you want to build.</h2>
            <p>
              Share project type, budget, timeline and requirements. I will reply
              with a practical plan and next steps.
            </p>

            <div className="freelancex-contact-pills">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <FiMessageCircle /> WhatsApp directly
              </a>

              <a href={mailLink}>
                <FiMail /> Send email
              </a>

              <a href="/projects">
                <FiTarget /> View projects
              </a>
            </div>
          </div>

          <form className="freelancex-form" onSubmit={handleSubmit}>
            <div className="freelancex-form-grid">
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

            <label>
              WhatsApp Number
              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
              />
            </label>

            <div className="freelancex-form-grid">
              <label>
                Project Type
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Budget
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select budget</option>
                  {budgetOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label>
              Timeline
              <select
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
                required
              >
                <option value="">Select timeline</option>
                {timelineOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Requirements
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Example: I need a business website with home, about, services, contact form and WhatsApp button..."
                rows="5"
                required
              />
            </label>

            {status.message && (
              <div className={`freelancex-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <button type="submit" className="freelancex-submit">
              <FiSend />
              {status.type === 'loading' ? 'Sending...' : 'Send Project Request'}
            </button>
          </form>
        </section>

        <section className="freelancex-final-cta">
          <div>
            <span>Ready to build?</span>
            <h2>Let’s turn your idea into a live website.</h2>
            <p>
              Send your project details and I will suggest the best plan, timeline
              and budget range.
            </p>
          </div>

          <div>
            <a href="#project-request">
              Start Project <FiArrowRight />
            </a>

            <a href={whatsappLink} target="_blank" rel="noreferrer">
              WhatsApp <FiMessageCircle />
            </a>
          </div>
        </section>
      </main>
    </>
  )
}