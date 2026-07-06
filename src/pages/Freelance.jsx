import React, { useMemo, useState } from 'react'
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiCreditCard,
  FiDatabase,
  FiExternalLink,
  FiGlobe,
  FiLayers,
  FiMail,
  FiMessageSquare,
  FiMonitor,
  FiPackage,
  FiPenTool,
  FiSend,
  FiServer,
  FiShield,
  FiShoppingCart,
  FiSmartphone,
  FiStar,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa'
import SEO from '../components/SEO'
import { freelanceSchema } from '../seo/schema'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const services = [
  {
    icon: FiGlobe,
    title: 'Portfolio Website',
    desc: 'Premium personal brand portfolio for students, developers, freelancers and professionals.',
    price: '₹2,999+',
  },
  {
    icon: FiBriefcase,
    title: 'Business Website',
    desc: 'Modern website for local business, shop, coaching, service brand or startup landing page.',
    price: '₹4,999+',
  },
  {
    icon: FiShoppingCart,
    title: 'E-Commerce Website',
    desc: 'Product listing, cart, order flow, admin-ready structure and payment gateway-ready setup.',
    price: '₹9,999+',
  },
  {
    icon: FiMonitor,
    title: 'Admin Dashboard',
    desc: 'Clean dashboard with charts, tables, CRUD, filters, authentication and protected routes.',
    price: '₹7,999+',
  },
  {
    icon: FiServer,
    title: 'Backend APIs',
    desc: 'Node.js, Express, MongoDB, REST APIs, authentication, validation and deployment support.',
    price: '₹5,999+',
  },
  {
    icon: FiLayers,
    title: 'MERN Web App',
    desc: 'Full-stack React + Node + MongoDB application with frontend, backend and database flow.',
    price: '₹14,999+',
  },
]

const packages = [
  {
    name: 'Starter',
    price: '₹2,999',
    timeline: '3 - 5 days',
    bestFor: 'Portfolio / Simple landing page',
    highlighted: false,
    features: [
      '1 - 3 pages',
      'Responsive design',
      'Modern UI sections',
      'Contact CTA',
      'Basic SEO setup',
      'Deployment support',
    ],
  },
  {
    name: 'Professional',
    price: '₹7,999',
    timeline: '7 - 12 days',
    bestFor: 'Business website / Service brand',
    highlighted: true,
    features: [
      '5 - 8 premium pages',
      'Contact form integration',
      'SEO metadata',
      'Animations and sections',
      'Google-ready structure',
      'Vercel deployment',
      'WhatsApp CTA',
    ],
  },
  {
    name: 'Full Stack',
    price: '₹14,999+',
    timeline: '15 - 25 days',
    bestFor: 'Dashboard / MERN app / E-Commerce',
    highlighted: false,
    features: [
      'React frontend',
      'Node + Express backend',
      'MongoDB database',
      'Authentication',
      'Admin dashboard',
      'API integration',
      'Deployment support',
    ],
  },
]

const projectTypes = [
  { label: 'Portfolio Website', value: 'portfolio', base: 2999 },
  { label: 'Business Website', value: 'business', base: 4999 },
  { label: 'Landing Page', value: 'landing', base: 3499 },
  { label: 'Admin Dashboard', value: 'dashboard', base: 7999 },
  { label: 'E-Commerce Website', value: 'ecommerce', base: 9999 },
  { label: 'MERN Web App', value: 'mern', base: 14999 },
]

const featureOptions = [
  { label: 'Contact Form', value: 'contactForm', price: 1000 },
  { label: 'Backend API', value: 'backendApi', price: 4000 },
  { label: 'Authentication', value: 'auth', price: 3000 },
  { label: 'Admin Panel', value: 'adminPanel', price: 5000 },
  { label: 'Payment Gateway Ready', value: 'payment', price: 3500 },
  { label: 'SEO Setup', value: 'seo', price: 1500 },
]

const workflow = [
  {
    step: '01',
    title: 'Requirement Discussion',
    desc: 'We discuss your business, goal, pages, features, timeline and expected outcome.',
  },
  {
    step: '02',
    title: 'Design Direction',
    desc: 'I plan layout, sections, content flow, CTA placement and premium UI direction.',
  },
  {
    step: '03',
    title: 'Development',
    desc: 'Frontend, backend, database and integrations are built based on the project scope.',
  },
  {
    step: '04',
    title: 'Testing & Delivery',
    desc: 'Responsive testing, deployment, final changes and handover are completed.',
  },
]

const faqs = [
  {
    q: 'Can you build a complete MERN stack website?',
    a: 'Yes. I can build React frontend, Node.js backend, Express APIs, MongoDB database and deployment-ready structure.',
  },
  {
    q: 'Do you provide deployment support?',
    a: 'Yes. I can help deploy frontend on Vercel and backend on Render or similar platforms.',
  },
  {
    q: 'Can you add payment gateway?',
    a: 'I can create payment gateway-ready structure and integrate Razorpay-style flow based on project need.',
  },
  {
    q: 'Will the website be responsive?',
    a: 'Yes. Every website will be responsive for mobile, tablet and desktop.',
  },
  {
    q: 'Do you provide source code?',
    a: 'Yes. Source code can be shared through GitHub or ZIP after project completion based on agreement.',
  },
]

const deliverables = [
  'Responsive frontend',
  'Clean UI sections',
  'Reusable React components',
  'Backend API setup',
  'MongoDB schema design',
  'Deployment guidance',
  'SEO metadata',
  'Contact / inquiry flow',
]

export default function Freelance() {
  const [calculator, setCalculator] = useState({
    projectType: 'business',
    pages: 5,
    speed: 'normal',
    features: ['contactForm', 'seo'],
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Business Website',
    budget: '',
    timeline: '',
    message: '',
  })

  const [status, setStatus] = useState({
    type: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const estimate = useMemo(() => {
    const selectedProject =
      projectTypes.find((item) => item.value === calculator.projectType) ||
      projectTypes[0]

    const pageCost = Math.max(Number(calculator.pages) - 3, 0) * 700

    const featuresCost = calculator.features.reduce((total, feature) => {
      const item = featureOptions.find((option) => option.value === feature)
      return total + (item?.price || 0)
    }, 0)

    const speedMultiplier = calculator.speed === 'urgent' ? 1.25 : 1

    const total = Math.round(
      (selectedProject.base + pageCost + featuresCost) * speedMultiplier
    )

    return {
      min: total,
      max: total + 5000,
    }
  }, [calculator])

  const handleCalculatorChange = (event) => {
    const { name, value } = event.target

    setCalculator((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleFeature = (value) => {
    setCalculator((prev) => {
      const exists = prev.features.includes(value)

      return {
        ...prev,
        features: exists
          ? prev.features.filter((item) => item !== value)
          : [...prev.features, value],
      }
    })
  }

  const handleInputChange = (event) => {
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
      const response = await fetch(`${API_URL}/api/freelance/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          estimatedBudget: `₹${estimate.min.toLocaleString('en-IN')} - ₹${estimate.max.toLocaleString('en-IN')}`,
          calculator,
          source: 'Freelance Page',
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Unable to submit request right now.')
      }

      setStatus({
        type: 'success',
        message:
          'Your project request has been submitted successfully. I will contact you soon.',
      })

      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Business Website',
        budget: '',
        timeline: '',
        message: '',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message:
          error.message ||
          'Something went wrong. You can also message directly on WhatsApp.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Freelance Web Development Services | Devesh Sahu"
        description="Hire Devesh Sahu for portfolio websites, business websites, MERN apps, dashboards, admin panels, backend APIs and e-commerce development."
        path="/freelance"
        schema={freelanceSchema}
      />

      <main className="freelance-page">
        <section className="freelance-hero">
          <div className="freelance-hero-copy">
            <div className="freelance-badge">
              <span />
              Freelance Web Development
            </div>

            <h1>
              Premium websites and full-stack apps for{' '}
              <span>brands, startups and professionals.</span>
            </h1>

            <p>
              I build clean, responsive and conversion-focused websites using
              React, Node.js, Express and MongoDB. From portfolio websites to
              dashboards and MERN applications, I help turn ideas into deployed
              products.
            </p>

            <div className="freelance-cta-row">
              <a href="#project-request" className="freelance-primary-btn">
                Start Project <FiArrowRight />
              </a>

              <a
                href="https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20want%20to%20discuss%20a%20website%20project."
                target="_blank"
                rel="noreferrer"
                className="freelance-secondary-btn"
              >
                <FaWhatsapp /> WhatsApp
              </a>

              <a href="#pricing" className="freelance-ghost-btn">
                View Pricing
              </a>
            </div>

            <div className="freelance-trust-strip">
              <div>
                <strong>MERN</strong>
                <span>Full-stack</span>
              </div>
              <div>
                <strong>SEO</strong>
                <span>Ready pages</span>
              </div>
              <div>
                <strong>Fast</strong>
                <span>Delivery focus</span>
              </div>
            </div>
          </div>

          <aside className="freelance-hero-card">
            <div className="freelance-card-top">
              <span>Client Project Flow</span>
              <h2>From idea to live website</h2>
              <p>Design, development, deployment and handover.</p>
            </div>

            <div className="freelance-mini-board">
              <div>
                <FiPenTool />
                <strong>Design</strong>
                <span>Premium UI layout</span>
              </div>

              <div>
                <FiCode />
                <strong>Build</strong>
                <span>React + Node</span>
              </div>

              <div>
                <FiZap />
                <strong>Deploy</strong>
                <span>Vercel / Render</span>
              </div>
            </div>

            <div className="freelance-live-card">
              <FiTrendingUp />
              <div>
                <strong>Best for</strong>
                <span>Portfolio, business websites, dashboards and MERN apps</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="freelance-section">
          <div className="freelance-section-head">
            <span>Services</span>
            <h2>What I can build for you.</h2>
            <p>
              Services are designed for students, freelancers, local businesses,
              coaches, startups and early-stage product ideas.
            </p>
          </div>

          <div className="freelance-services-grid">
            {services.map(({ icon: Icon, title, desc, price }) => (
              <article key={title} className="freelance-service-card">
                <div className="freelance-icon">
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>

                <div className="freelance-price-pill">{price}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="pricing" className="freelance-section">
          <div className="freelance-section-head freelance-section-head-row">
            <div>
              <span>Pricing</span>
              <h2>Simple packages to start fast.</h2>
              <p>
                Final pricing depends on pages, features, backend work and
                timeline. These packages give a clear starting point.
              </p>
            </div>

            <a
              href="https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20want%20a%20quotation%20for%20my%20website."
              target="_blank"
              rel="noreferrer"
              className="freelance-secondary-btn"
            >
              Get Quote <FiExternalLink />
            </a>
          </div>

          <div className="freelance-pricing-grid">
            {packages.map((item) => (
              <article
                key={item.name}
                className={`freelance-package-card ${
                  item.highlighted ? 'featured' : ''
                }`}
              >
                {item.highlighted && (
                  <div className="freelance-popular-badge">
                    <FiStar /> Most useful
                  </div>
                )}

                <span>{item.bestFor}</span>
                <h3>{item.name}</h3>

                <div className="freelance-package-price">{item.price}</div>

                <p>
                  <FiClock /> {item.timeline}
                </p>

                <div className="freelance-feature-list">
                  {item.features.map((feature) => (
                    <div key={feature}>
                      <FiCheckCircle />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <a href="#project-request">
                  Choose {item.name} <FiArrowRight />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="freelance-section freelance-calculator-section">
          <div className="freelance-calculator-copy">
            <span>Budget estimator</span>
            <h2>Estimate your project cost instantly.</h2>
            <p>
              This calculator gives an approximate range. Final quotation depends
              on exact features, content, pages and integrations.
            </p>

            <div className="freelance-estimate-card">
              <span>Estimated range</span>
              <strong>
                ₹{estimate.min.toLocaleString('en-IN')} - ₹
                {estimate.max.toLocaleString('en-IN')}
              </strong>
              <p>Approximate only. Final quote after discussion.</p>
            </div>
          </div>

          <div className="freelance-calculator">
            <label>
              Project Type
              <select
                name="projectType"
                value={calculator.projectType}
                onChange={handleCalculatorChange}
              >
                {projectTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Number of Pages
              <input
                type="number"
                name="pages"
                min="1"
                max="30"
                value={calculator.pages}
                onChange={handleCalculatorChange}
              />
            </label>

            <label>
              Timeline
              <select
                name="speed"
                value={calculator.speed}
                onChange={handleCalculatorChange}
              >
                <option value="normal">Normal timeline</option>
                <option value="urgent">Urgent delivery</option>
              </select>
            </label>

            <div className="freelance-feature-options">
              <span>Extra Features</span>

              <div>
                {featureOptions.map((feature) => (
                  <button
                    type="button"
                    key={feature.value}
                    onClick={() => toggleFeature(feature.value)}
                    className={
                      calculator.features.includes(feature.value) ? 'active' : ''
                    }
                  >
                    {feature.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="freelance-section freelance-workflow-section">
          <div className="freelance-section-head">
            <span>Workflow</span>
            <h2>Clear process. No confusion.</h2>
            <p>
              A simple project flow helps avoid delays and keeps both sides
              aligned from day one.
            </p>
          </div>

          <div className="freelance-workflow-grid">
            {workflow.map((item) => (
              <article key={item.step} className="freelance-workflow-card">
                <div>{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="freelance-section freelance-deliverables-section">
          <div className="freelance-deliverables-copy">
            <span>Deliverables</span>
            <h2>What you can expect in delivery.</h2>
            <p>
              Every project is built with a clean structure, responsive UI and
              practical deployment focus.
            </p>
          </div>

          <div className="freelance-deliverables-grid">
            {deliverables.map((item) => (
              <div key={item}>
                <FiCheckCircle />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="project-request" className="freelance-section freelance-request-section">
          <div className="freelance-request-copy">
            <span>Project inquiry</span>
            <h2>Tell me what you want to build.</h2>
            <p>
              Share your project idea, budget, timeline and required features. I
              will review it and contact you with the next step.
            </p>

            <div className="freelance-contact-cards">
              <a
                href="mailto:deveshsahu567@gmail.com"
                className="freelance-contact-card"
              >
                <FiMail />
                <div>
                  <strong>Email</strong>
                  <span>deveshsahu567@gmail.com</span>
                </div>
                <FiArrowRight />
              </a>

              <a
                href="https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20want%20to%20discuss%20a%20freelance%20project."
                target="_blank"
                rel="noreferrer"
                className="freelance-contact-card"
              >
                <FaWhatsapp />
                <div>
                  <strong>WhatsApp</strong>
                  <span>Direct project discussion</span>
                </div>
                <FiArrowRight />
              </a>

              <a
                href="https://www.linkedin.com/in/devesh-sahu-560608270/"
                target="_blank"
                rel="noreferrer"
                className="freelance-contact-card"
              >
                <FaLinkedin />
                <div>
                  <strong>LinkedIn</strong>
                  <span>Professional connection</span>
                </div>
                <FiArrowRight />
              </a>
            </div>
          </div>

          <form className="freelance-form" onSubmit={handleSubmit}>
            <div className="freelance-form-grid">
              <label>
                Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder="you@email.com"
                  required
                />
              </label>

              <label>
                Phone / WhatsApp
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91..."
                />
              </label>

              <label>
                Project Type
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                >
                  <option>Portfolio Website</option>
                  <option>Business Website</option>
                  <option>Landing Page</option>
                  <option>Admin Dashboard</option>
                  <option>E-Commerce Website</option>
                  <option>MERN Web App</option>
                  <option>Backend API</option>
                </select>
              </label>

              <label>
                Budget
                <input
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Example: ₹5,000 - ₹10,000"
                />
              </label>

              <label>
                Timeline
                <input
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="Example: 7 days"
                />
              </label>
            </div>

            <label>
              Project Details
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                placeholder="Describe your website/app idea, pages, features, references and deadline..."
                required
              />
            </label>

            <div className="freelance-form-estimate">
              <FiCreditCard />
              <div>
                <strong>
                  Calculator estimate: ₹{estimate.min.toLocaleString('en-IN')} - ₹
                  {estimate.max.toLocaleString('en-IN')}
                </strong>
                <span>This estimate will be sent with your request.</span>
              </div>
            </div>

            {status.message && (
              <div className={`freelance-form-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Project Request'}
              <FiSend />
            </button>
          </form>
        </section>

        <section className="freelance-section freelance-faq-section">
          <div className="freelance-section-head">
            <span>FAQs</span>
            <h2>Questions clients usually ask.</h2>
          </div>

          <div className="freelance-faq-grid">
            {faqs.map((item) => (
              <article key={item.q} className="freelance-faq-card">
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="freelance-final-cta">
          <div>
            <span>Ready to build?</span>
            <h2>Let’s turn your idea into a live product.</h2>
            <p>
              Message me with your project idea and I will help you choose the
              best scope, budget and timeline.
            </p>
          </div>

          <div className="freelance-final-actions">
            <a
              href="https://wa.me/917607997416?text=Hi%20Devesh%2C%20I%20want%20to%20start%20a%20project."
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp /> WhatsApp Now
            </a>

            <a href="mailto:deveshsahu567@gmail.com">
              <FiMail /> Email Project
            </a>
          </div>
        </section>
      </main>
    </>
  )
}