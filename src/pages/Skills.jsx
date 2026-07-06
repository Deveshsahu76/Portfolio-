import React from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiGitBranch,
  FiGlobe,
  FiLayers,
  FiMonitor,
  FiServer,
  FiShield,
  FiTarget,
  FiTerminal,
  FiTool,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import { websiteSchema } from '../seo/schema'

const skillGroups = [
  {
    icon: FiMonitor,
    title: 'Frontend Development',
    level: 82,
    desc: 'Building responsive, reusable and clean user interfaces with React and modern CSS.',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    icon: FiServer,
    title: 'Backend Development',
    level: 76,
    desc: 'Creating REST APIs, route handling, authentication and backend logic with Node and Express.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Validation', 'MVC Structure'],
  },
  {
    icon: FiDatabase,
    title: 'Database & Data',
    level: 72,
    desc: 'Designing MongoDB schemas, CRUD operations and practical app data flows.',
    skills: ['MongoDB', 'Mongoose', 'CRUD', 'Schema Design', 'MongoDB Atlas', 'Data Modelling'],
  },
  {
    icon: FiGitBranch,
    title: 'Tools & Deployment',
    level: 78,
    desc: 'Using Git, GitHub, Vercel, Render and Postman to ship and test projects.',
    skills: ['Git', 'GitHub', 'Vercel', 'Render', 'Postman', 'VS Code'],
  },
]

const coreStack = [
  {
    title: 'React.js',
    type: 'Frontend',
    desc: 'Components, routing, state, hooks, UI sections and reusable design patterns.',
  },
  {
    title: 'Node.js',
    type: 'Backend',
    desc: 'Server-side logic, API structure, middleware and backend project setup.',
  },
  {
    title: 'Express.js',
    type: 'Backend',
    desc: 'Routes, controllers, validation, API endpoints and request/response handling.',
  },
  {
    title: 'MongoDB',
    type: 'Database',
    desc: 'Collections, schemas, CRUD operations and app-level data persistence.',
  },
  {
    title: 'JavaScript',
    type: 'Language',
    desc: 'DOM, async workflows, arrays, objects, functions, APIs and app logic.',
  },
  {
    title: 'C++',
    type: 'DSA',
    desc: 'Problem solving, data structures, algorithms and LeetCode practice.',
  },
]

const proofPoints = [
  '170+ LeetCode problems solved',
  'MERN stack project development',
  'Frontend + backend integration',
  'Authentication and protected routes',
  'MongoDB schema design',
  'Vercel and Render deployment',
  'REST API development',
  'Responsive UI implementation',
]

const workflow = [
  {
    icon: FiTarget,
    title: 'Plan',
    desc: 'Understand requirement, user flow, features and data structure.',
  },
  {
    icon: FiLayers,
    title: 'Design',
    desc: 'Break UI into sections, components, cards, forms and responsive layouts.',
  },
  {
    icon: FiCode,
    title: 'Build',
    desc: 'Develop React frontend, APIs, backend logic and MongoDB models.',
  },
  {
    icon: FiShield,
    title: 'Test & Deploy',
    desc: 'Check forms, routes, responsiveness, build output and deployment.',
  },
]

const learningNow = [
  'Advanced React patterns',
  'Backend architecture',
  'DSA consistency',
  'System design basics',
  'API security',
  'SEO and performance',
]

export default function Skills() {
  return (
    <>
      <SEO
        title="Skills | Devesh Sahu MERN Stack Developer"
        description="Technical skills of Devesh Sahu: React.js, Node.js, Express.js, MongoDB, JavaScript, C++, REST APIs, JWT, Git, GitHub, Vercel and Render."
        path="/skills"
        schema={websiteSchema}
      />

      <main className="skills-premium-page">
        <section className="skills-premium-hero">
          <div className="skills-premium-copy">
            <div className="skills-premium-badge">
              <span />
              Engineering Skills
            </div>

            <h1>
              Skills organized like an{' '}
              <span>engineering capability dashboard.</span>
            </h1>

            <p>
              My skills are focused on building complete web products: React
              frontend, Node.js backend, Express APIs, MongoDB database,
              authentication, deployment and problem solving with DSA.
            </p>

            <div className="skills-premium-actions">
              <Link to="/projects" className="skills-premium-primary-btn">
                See Project Proof <FiArrowRight />
              </Link>

              <a href="/resume.pdf" download className="skills-premium-secondary-btn">
                <FiDownload /> Resume
              </a>
            </div>
          </div>

          <aside className="skills-premium-score-card">
            <div className="skills-premium-score-top">
              <span>Skill Snapshot</span>
              <h2>MERN Stack Focus</h2>
              <p>React · Node · Express · MongoDB</p>
            </div>

            <div className="skills-premium-score-grid">
              <div>
                <FiCode />
                <strong>170+</strong>
                <span>LeetCode solved</span>
              </div>

              <div>
                <FiZap />
                <strong>4+</strong>
                <span>Projects built</span>
              </div>

              <div>
                <FiGlobe />
                <strong>Live</strong>
                <span>Deployments</span>
              </div>

              <div>
                <FiTerminal />
                <strong>API</strong>
                <span>Backend work</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="skills-premium-section">
          <div className="skills-premium-section-head">
            <span>Skill matrix</span>
            <h2>Core technical capabilities.</h2>
            <p>
              These are the areas I currently use across my portfolio projects
              and internship preparation.
            </p>
          </div>

          <div className="skills-premium-matrix">
            {skillGroups.map(({ icon: Icon, title, level, desc, skills }) => (
              <article key={title} className="skills-premium-skill-card">
                <div className="skills-premium-skill-head">
                  <div>
                    <Icon />
                  </div>

                  <section>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </section>
                </div>

                <div className="skills-premium-progress">
                  <div>
                    <span>Current confidence</span>
                    <strong>{level}%</strong>
                  </div>

                  <div className="skills-premium-progress-track">
                    <span style={{ width: `${level}%` }} />
                  </div>
                </div>

                <div className="skills-premium-tags">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-premium-section">
          <div className="skills-premium-section-head skills-premium-section-head-row">
            <div>
              <span>Core stack</span>
              <h2>Technologies I use to build products.</h2>
              <p>
                This stack helps me build frontend, backend, database and
                deployment-ready applications.
              </p>
            </div>

            <Link to="/projects" className="skills-premium-secondary-btn">
              View Projects <FiExternalLink />
            </Link>
          </div>

          <div className="skills-premium-stack-grid">
            {coreStack.map((item) => (
              <article key={item.title} className="skills-premium-stack-card">
                <span>{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-premium-section skills-premium-proof-section">
          <div className="skills-premium-proof-copy">
            <span>Proof layer</span>
            <h2>Skills backed by real work.</h2>
            <p>
              Recruiters do not shortlist only based on skill names. They look for
              proof. My portfolio connects skills with projects, APIs, deployment
              and DSA practice.
            </p>

            <div className="skills-premium-proof-actions">
              <Link to="/recruiter" className="skills-premium-primary-btn">
                Recruiter Hub <FiArrowRight />
              </Link>

              <a href="/resume.pdf" download className="skills-premium-secondary-btn">
                Resume <FiDownload />
              </a>
            </div>
          </div>

          <div className="skills-premium-proof-list">
            {proofPoints.map((item) => (
              <div key={item}>
                <FiCheckCircle />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="skills-premium-section">
          <div className="skills-premium-section-head">
            <span>Execution process</span>
            <h2>How I apply my skills in projects.</h2>
            <p>
              A practical workflow helps me move from idea to deployed product
              with better clarity.
            </p>
          </div>

          <div className="skills-premium-workflow">
            {workflow.map(({ icon: Icon, title, desc }) => (
              <article key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-premium-section skills-premium-learning">
          <div>
            <span>Currently improving</span>
            <h2>Skills I am actively upgrading.</h2>
            <p>
              I am improving both interview preparation and production
              development skills to become internship-ready and job-ready.
            </p>
          </div>

          <div className="skills-premium-learning-list">
            {learningNow.map((item) => (
              <div key={item}>
                <FiTrendingUp />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="skills-premium-final-cta">
          <div>
            <span>Want proof?</span>
            <h2>Skills become stronger when they are visible in projects.</h2>
            <p>
              Open my project case studies to see how these skills are applied in
              real frontend, backend and database flows.
            </p>
          </div>

          <div className="skills-premium-final-actions">
            <Link to="/projects">
              Project Case Studies <FiArrowRight />
            </Link>

            <Link to="/contact">
              Contact Me <FiExternalLink />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}