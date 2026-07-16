import React from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiGlobe,
  FiMapPin,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUserCheck,
  FiZap,
} from 'react-icons/fi'
import { FaLinkedin } from 'react-icons/fa'
import SEO from '../components/SEO'
import ResumeLink from '../components/ResumeLink'
import LiveLeetCodeStat from '../components/LiveLeetCodeStat'
import { personSchema } from '../seo/schema'

const journey = [
  {
    year: '2023',
    title: 'Started B.Tech IT',
    desc: 'Started engineering journey with focus on programming, web development and computer science fundamentals.',
  },
  {
    year: '2024',
    title: 'Built frontend foundation',
    desc: 'Learned HTML, CSS, JavaScript, React and started building responsive user interfaces.',
  },
  {
    year: '2025',
    title: 'Moved into MERN stack',
    desc: 'Started building complete applications with React, Node.js, Express and MongoDB.',
  },
  {
    year: '2026',
    title: 'Building real product portfolio',
    desc: 'Focused on deployed projects, recruiter-ready portfolio, backend APIs, DSA and internship opportunities.',
  },
]

const values = [
  {
    icon: FiTarget,
    title: 'Product Thinking',
    desc: 'I do not only build UI. I think about user flow, CTAs, conversion, data and real usage.',
  },
  {
    icon: FiCode,
    title: 'Clean Engineering',
    desc: 'I prefer reusable components, clear file structure, clean APIs and maintainable code.',
  },
  {
    icon: FiTrendingUp,
    title: 'Continuous Improvement',
    desc: 'I keep improving projects, resume, DSA, deployment and portfolio quality step by step.',
  },
  {
    icon: FiUserCheck,
    title: 'Recruiter Ready',
    desc: 'My portfolio is built to help HR quickly verify skills, projects, resume and contact details.',
  },
]

const highlights = [
  'B.Tech Information Technology student',
  'MERN Stack Developer',
  'Live LeetCode problem-solving progress',
  'React, Node.js, Express, MongoDB',
  'Live projects with deployment',
  'Open to internship and freelance work',
]

const education = [
  {
    title: 'B.Tech Information Technology',
    place: 'Kanpur Institute of Technology',
    meta: '2023 - 2027',
  },
  {
    title: 'Current Focus',
    place: 'Full Stack Development, DSA, DBMS, OS and Web Technologies',
    meta: 'Ongoing',
  },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Devesh Sahu | MERN Stack Developer"
        description="Learn about Devesh Sahu, a B.Tech IT student and MERN Stack Developer focused on React, Node.js, MongoDB, full-stack projects and software development internships."
        path="/about"
        schema={personSchema}
      />

      <main className="about-premium-page">
        <section className="about-premium-hero">
          <div className="about-premium-copy">
            <div className="about-premium-badge">
              <span />
              About Devesh Sahu
            </div>

            <h1>
              Iâ€™m building myself like a{' '}
              <span>software product, not just a resume.</span>
            </h1>

            <p>
              Iâ€™m <strong>Devesh Sahu</strong>, a B.Tech Information Technology
              student and MERN Stack Developer. I build full-stack web apps with
              React, Node.js, Express and MongoDB, while improving DSA, deployment
              skills and real-world project execution.
            </p>

            <div className="about-premium-actions">
              <Link to="/projects" className="about-premium-primary-btn">
                View Projects <FiArrowRight />
              </Link>

              <ResumeLink className="about-premium-secondary-btn">
                <FiDownload /> Resume
              </ResumeLink>

              <Link to="/recruiter" className="about-premium-secondary-btn">
                <FiBriefcase /> Recruiter Hub
              </Link>
            </div>
          </div>

          <aside className="about-premium-profile-card">
            <div className="about-premium-photo">
              <img
                src="/profile-image.webp"
                alt="Devesh Sahu MERN Stack Developer"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="about-premium-profile-info">
              <span>Developer Profile</span>
              <h2>Devesh Sahu</h2>
              <p>MERN Stack Developer Â· B.Tech IT</p>
            </div>

            <div className="about-premium-profile-grid">
              <div>
                <FiMapPin />
                <strong>India</strong>
                <span>Remote / Hybrid / On-site</span>
              </div>

              <div>
                <FiZap />
                <strong>Open</strong>
                <span>Internship + Freelance</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="about-premium-stats">
          <LiveLeetCodeStat
            label="LeetCode solved"
            fallback={127}
          />

          <div>
            <strong>4+</strong>
            <span>Projects built</span>
          </div>

          <div>
            <strong>MERN</strong>
            <span>Primary stack</span>
          </div>

          <div>
            <strong>2027</strong>
            <span>Graduation batch</span>
          </div>
        </section>

        <section className="about-premium-section about-premium-story">
          <div className="about-premium-section-head">
            <span>My story</span>
            <h2>From learning basics to building deployed products.</h2>
            <p>
              My goal is simple: become a strong software developer who can build
              practical products, understand backend systems, write clean frontend
              code and contribute in real teams.
            </p>
          </div>

          <div className="about-premium-story-grid">
            <div className="about-premium-story-card">
              <FiCpu />
              <h3>Mission</h3>
              <p>
                Build useful software products that solve real problems and help
                users complete tasks with clean, simple interfaces.
              </p>
            </div>

            <div className="about-premium-story-card">
              <FiGlobe />
              <h3>Vision</h3>
              <p>
                Grow from student developer to strong full-stack engineer with
                deep project experience, DSA practice and production thinking.
              </p>
            </div>

            <div className="about-premium-story-card">
              <FiStar />
              <h3>Career Goal</h3>
              <p>
                Get a software development internship where I can contribute to
                real engineering work, learn from senior developers and improve fast.
              </p>
            </div>
          </div>
        </section>

        <section className="about-premium-section about-premium-two-col">
          <div className="about-premium-panel">
            <div className="about-premium-section-head small">
              <span>Journey</span>
              <h2>Development timeline</h2>
            </div>

            <div className="about-premium-timeline">
              {journey.map((item) => (
                <article key={item.year}>
                  <div>{item.year}</div>

                  <section>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </section>
                </article>
              ))}
            </div>
          </div>

          <div className="about-premium-panel">
            <div className="about-premium-section-head small">
              <span>Education</span>
              <h2>Academic foundation</h2>
            </div>

            <div className="about-premium-education">
              {education.map((item) => (
                <article key={item.title}>
                  <FiBookOpen />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.place}</p>
                    <span>{item.meta}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="about-premium-highlight-box">
              <FiAward />
              <div>
                <strong>Current academic + career focus</strong>
                <span>
                  DSA, MERN projects, internship preparation, resume improvement
                  and deployment-ready portfolio.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="about-premium-section">
          <div className="about-premium-section-head">
            <span>Values</span>
            <h2>How I approach engineering and career growth.</h2>
            <p>
              These principles guide how I build projects and how I present my
              work to recruiters, clients and technical reviewers.
            </p>
          </div>

          <div className="about-premium-values-grid">
            {values.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="about-premium-value-card">
                <div>
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-premium-section about-premium-proof">
          <div>
            <span>Quick proof</span>
            <h2>What makes my profile different.</h2>
            <p>
              I am not trying to show only a static resume. I am building a full
              personal brand platform with recruiter flow, freelance flow, SEO and
              project case studies.
            </p>

            <div className="about-premium-proof-actions">
              <Link to="/skills" className="about-premium-primary-btn">
                View Skills <FiArrowRight />
              </Link>

              <Link to="/freelance" className="about-premium-secondary-btn">
                Freelance Services <FiExternalLink />
              </Link>
            </div>
          </div>

          <div className="about-premium-proof-list">
            {highlights.map((item) => (
              <div key={item}>
                <FiCheckCircle />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="about-premium-final-cta">
          <div>
            <span>Letâ€™s connect</span>
            <h2>Want to review my work or discuss an opportunity?</h2>
            <p>
              Explore my projects, open my recruiter hub, or connect with me on
              GitHub and LinkedIn.
            </p>
          </div>

          <div className="about-premium-final-actions">
            <a href="https://github.com/Deveshsahu76" target="_blank" rel="noreferrer">
              <FiGithub /> GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/devesh-sahu-560608270/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin /> LinkedIn
            </a>

            <Link to="/recruiter">
              Recruiter Hub <FiArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

