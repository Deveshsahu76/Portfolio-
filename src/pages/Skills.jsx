import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiFilter,
  FiGithub,
  FiGitBranch,
  FiGrid,
  FiLayers,
  FiMonitor,
  FiSearch,
  FiServer,
  FiSettings,
  FiShield,
  FiStar,
  FiTarget,
  FiTerminal,
  FiTool,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import SkillUniverse3D from '../components/three/SkillUniverse3D'
import LiveLeetCodeStat from '../components/LiveLeetCodeStat'
import projects from '../data/projects'

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Core']

const skills = [
  {
    name: 'React.js',
    category: 'Frontend',
    level: 82,
    status: 'Strong',
    icon: FiCode,
    usedIn: ['Portfolio', 'E-Commerce Store', 'Zerodha Clone', 'Queens Arena'],
    desc: 'Components, routing, state handling, forms, responsive UI and reusable layouts.',
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    level: 80,
    status: 'Strong',
    icon: FiTerminal,
    usedIn: ['Portfolio', 'E-Commerce Store', 'Queens Arena'],
    desc: 'DOM logic, arrays, objects, async code, API handling and frontend interactions.',
  },
  {
    name: 'HTML5',
    category: 'Frontend',
    level: 88,
    status: 'Strong',
    icon: FiMonitor,
    usedIn: ['All Web Projects'],
    desc: 'Semantic layout, page structure, SEO-friendly markup and clean section design.',
  },
  {
    name: 'CSS3',
    category: 'Frontend',
    level: 84,
    status: 'Strong',
    icon: FiMonitor,
    usedIn: ['Portfolio', 'Zerodha Clone', 'E-Commerce Store'],
    desc: 'Responsive design, animations, cards, layouts, dark mode and modern UI styling.',
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 76,
    status: 'Good',
    icon: FiZap,
    usedIn: ['Portfolio'],
    desc: 'Utility-first styling, responsive classes, spacing system and fast UI building.',
  },
  {
    name: 'Node.js',
    category: 'Backend',
    level: 76,
    status: 'Good',
    icon: FiServer,
    usedIn: ['E-Commerce Store', 'Queens Arena', 'Portfolio Backend'],
    desc: 'Server-side JavaScript, backend structure, environment setup and API handling.',
  },
  {
    name: 'Express.js',
    category: 'Backend',
    level: 78,
    status: 'Good',
    icon: FiServer,
    usedIn: ['E-Commerce Store', 'Queens Arena', 'Portfolio Backend'],
    desc: 'REST APIs, routes, middleware, request validation and backend endpoints.',
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    level: 78,
    status: 'Good',
    icon: FiCloud,
    usedIn: ['E-Commerce Store', 'Queens Arena', 'Analytics Backend'],
    desc: 'API routes, JSON request/response flow, frontend integration and testing.',
  },
  {
    name: 'JWT Auth',
    category: 'Backend',
    level: 70,
    status: 'Practicing',
    icon: FiShield,
    usedIn: ['E-Commerce Store', 'Zerodha Clone'],
    desc: 'Authentication flow, protected routes, token handling and user sessions.',
  },
  {
    name: 'MongoDB',
    category: 'Database',
    level: 76,
    status: 'Good',
    icon: FiDatabase,
    usedIn: ['E-Commerce Store', 'Queens Arena', 'Portfolio Backend'],
    desc: 'Collections, CRUD operations, database connection and document-based data modeling.',
  },
  {
    name: 'Mongoose',
    category: 'Database',
    level: 72,
    status: 'Good',
    icon: FiDatabase,
    usedIn: ['E-Commerce Store', 'Queens Arena', 'Analytics Backend'],
    desc: 'Schemas, models, validation, timestamps and MongoDB structure using Node.js.',
  },
  {
    name: 'MySQL',
    category: 'Database',
    level: 62,
    status: 'Learning',
    icon: FiDatabase,
    usedIn: ['Academic Practice'],
    desc: 'Tables, queries, relational concepts, joins and database fundamentals.',
  },
  {
    name: 'Git',
    category: 'Tools',
    level: 75,
    status: 'Good',
    icon: FiGitBranch,
    usedIn: ['All Projects'],
    desc: 'Version control, commits, branches, restore, status checks and workflow discipline.',
  },
  {
    name: 'GitHub',
    category: 'Tools',
    level: 78,
    status: 'Good',
    icon: FiGithub,
    usedIn: ['All Projects'],
    desc: 'Repository management, pushing code, project proof and public portfolio work.',
  },
  {
    name: 'Vercel',
    category: 'Tools',
    level: 74,
    status: 'Good',
    icon: FiCloud,
    usedIn: ['Portfolio', 'E-Commerce Store', 'Queens Arena'],
    desc: 'Frontend deployment, environment setup, route handling and production build.',
  },
  {
    name: 'Render',
    category: 'Tools',
    level: 66,
    status: 'Practicing',
    icon: FiCloud,
    usedIn: ['Portfolio Backend', 'Queens Arena Backend'],
    desc: 'Backend deployment, environment variables, server logs and live API hosting.',
  },
  {
    name: 'C++',
    category: 'Core',
    level: 70,
    status: 'Practicing',
    icon: FiCpu,
    usedIn: ['DSA Practice'],
    desc: 'Problem solving, arrays, strings, recursion, sorting, searching and DSA practice.',
  },
  {
    name: 'DSA',
    category: 'Core',
    level: 68,
    status: 'Practicing',
    icon: FiTarget,
    usedIn: ['Live LeetCode Profile'],
    desc: 'Arrays, strings, two pointers, recursion, backtracking, sorting and problem solving.',
  },
  {
    name: 'DBMS',
    category: 'Core',
    level: 66,
    status: 'Practicing',
    icon: FiDatabase,
    usedIn: ['Academic + Project Design'],
    desc: 'Schemas, normalization basics, relationships, transactions and database thinking.',
  },
  {
    name: 'Software Engineering',
    category: 'Core',
    level: 64,
    status: 'Learning',
    icon: FiSettings,
    usedIn: ['Project Planning'],
    desc: 'Requirement analysis, design, implementation, testing, deployment and maintenance.',
  },
]

const skillStats = [
  {
    value: '20+',
    label: 'Skills Mapped',
  },
  {
    value: 'MERN',
    label: 'Primary Stack',
  },
  {
    liveLeetCode: true,
    label: 'DSA Problems',
  },
  {
    value: 'Live',
    label: 'Deployment Proof',
  },
]

const skillGroups = [
  {
    icon: FiCode,
    title: 'Frontend Development',
    desc: 'React, JavaScript, HTML, CSS, Tailwind, routing, forms and responsive UI.',
  },
  {
    icon: FiServer,
    title: 'Backend Development',
    desc: 'Node.js, Express.js, REST APIs, JWT auth, validation and backend structure.',
  },
  {
    icon: FiDatabase,
    title: 'Database Handling',
    desc: 'MongoDB, Mongoose schemas, CRUD operations and database-driven features.',
  },
  {
    icon: FiTool,
    title: 'Tools & Deployment',
    desc: 'Git, GitHub, Vercel, Render, environment variables and production builds.',
  },
]

const interviewReadiness = [
  {
    icon: FiTarget,
    title: 'DSA Practice',
    desc: 'Live LeetCode progress with regular improvement in problem-solving.',
  },
  {
    icon: FiLayers,
    title: 'Project Explanation',
    desc: 'Can explain project architecture, APIs, database schema and feature flow.',
  },
  {
    icon: FiShield,
    title: 'Backend Concepts',
    desc: 'Understands auth flow, routes, CRUD APIs, MongoDB schemas and deployments.',
  },
  {
    icon: FiMonitor,
    title: 'Frontend Confidence',
    desc: 'Can build responsive UI, forms, pages, reusable components and clean layouts.',
  },
]

const learningRoadmap = [
  {
    title: 'Current Focus',
    points: ['DSA consistency', 'MERN project polish', 'API debugging', 'Resume improvement'],
  },
  {
    title: 'Next Learning',
    points: ['TypeScript basics', 'Testing fundamentals', 'System design basics', 'Advanced MongoDB'],
  },
  {
    title: 'Career Focus',
    points: ['Internship applications', 'Project case studies', 'GitHub proof', 'Interview practice'],
  },
]

function getLevelClass(level) {
  if (level >= 80) return 'strong'
  if (level >= 70) return 'good'
  if (level >= 60) return 'practice'
  return 'learning'
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === 'All' || skill.category === activeCategory

      const searchText = [
        skill.name,
        skill.category,
        skill.status,
        skill.desc,
        ...(skill.usedIn || []),
      ]
        .join(' ')
        .toLowerCase()

      const matchesQuery = searchText.includes(query.toLowerCase())

      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const projectSkillMap = useMemo(() => {
    return projects.map((project) => ({
      title: project.title,
      description: project.description,
      image: project.image,
      demo: project.demo,
      github: project.github,
      techStack: project.techStack || [],
    }))
  }, [])

  return (
    <>
      <SEO
        title="Skills | Devesh Sahu MERN Stack Developer"
        description="Explore technical skills of Devesh Sahu including React, Node.js, Express, MongoDB, JavaScript, REST APIs, Git, GitHub, DSA and deployment tools."
        path="/skills"
      />

      <main className="skillsx-page">
        <section className="skillsx-hero">
          <div className="skillsx-hero-copy">
            <div className="skillsx-kicker">
              <span />
              Technical Skills
            </div>

            <h1>
              Skills mapped with real projects, not only resume keywords.
            </h1>

            <p>
              I'm focused on MERN Stack Development with React, Node.js, Express,
              MongoDB, REST APIs, GitHub, deployment and DSA practice. This page
              shows what I know, where I used it and what I am improving.
            </p>

            <div className="skillsx-actions">
              <Link to="/projects" className="skillsx-primary-btn">
                View Project Proof <FiArrowRight />
              </Link>

              <Link to="/recruiter" className="skillsx-secondary-btn">
                <FiBriefcase /> Recruiter Hub
              </Link>

              <a href="/resume.pdf" download className="skillsx-secondary-btn">
                <FiDownload /> Resume
              </a>
            </div>
          </div>

          <aside className="skillsx-summary-card">
            <span>Skill Snapshot</span>
            <h2>MERN Stack Focus</h2>

            <div className="skillsx-summary-list">
              <div>
                <FiCheckCircle />
                <strong>Frontend + backend development</strong>
              </div>

              <div>
                <FiCheckCircle />
                <strong>Database + API integration</strong>
              </div>

              <div>
                <FiCheckCircle />
                <strong>GitHub + deployment workflow</strong>
              </div>

              <div>
                <FiCheckCircle />
                <strong>DSA + interview preparation</strong>
              </div>
            </div>

            <div className="skillsx-mini-proof">
              <FiAward />
              <div>
                <strong>Recruiter-ready profile</strong>
                <span>Skills are connected with projects, proof and real usage.</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="skillsx-stats">
          {skillStats.map((item) =>
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

        <SkillUniverse3D
          skills={skills}
        />

        <section className="skillsx-section">
          <div className="skillsx-section-head">
            <span>Skill Dashboard</span>
            <h2>My development skill areas.</h2>
            <p>
              These are the main areas I use while building full-stack web apps,
              dashboards, APIs and deployed projects.
            </p>
          </div>

          <div className="skillsx-group-grid">
            {skillGroups.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="skillsx-group-card">
                <div className="skillsx-icon">
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skillsx-section">
          <div className="skillsx-skill-head">
            <div>
              <span>Skill Matrix</span>
              <h2>Filter and review skills.</h2>
              <p>
                Search by technology, project usage or category to quickly verify
                my technical profile.
              </p>
            </div>

            <div className="skillsx-search">
              <FiSearch />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search React, API, MongoDB..."
              />
            </div>
          </div>

          <div className="skillsx-filter-bar">
            <div>
              <FiFilter />
              <span>Category</span>
            </div>

            <div className="skillsx-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? 'active' : ''}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="skillsx-card-grid">
            {filteredSkills.map(({ icon: Icon, name, category, level, status, usedIn, desc }) => (
              <article key={name} className="skillsx-skill-card">
                <div className="skillsx-skill-top">
                  <div className="skillsx-icon">
                    <Icon />
                  </div>

                  <span className={`skillsx-level ${getLevelClass(level)}`}>
                    {status}
                  </span>
                </div>

                <h3>{name}</h3>
                <p>{desc}</p>

                <div className="skillsx-progress">
                  <div>
                    <span>Confidence</span>
                    <strong>{level}%</strong>
                  </div>

                  <div className="skillsx-progress-track">
                    <span style={{ width: `${level}%` }} />
                  </div>
                </div>

                <div className="skillsx-used">
                  <strong>Used in</strong>

                  <div>
                    {usedIn.slice(0, 4).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>

                <div className="skillsx-category-pill">
                  <FiGrid />
                  {category}
                </div>
              </article>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="skillsx-empty">
              <FiSearch />
              <h3>No skill found</h3>
              <p>Try another keyword or category.</p>
            </div>
          )}
        </section>

        <section className="skillsx-section">
          <div className="skillsx-section-head">
            <span>Project Mapping</span>
            <h2>Skills connected with project proof.</h2>
            <p>
              Recruiters can quickly see which technologies are used in my real
              projects.
            </p>
          </div>

          <div className="skillsx-project-map">
            {projectSkillMap.map((project) => (
              <article key={project.title}>
                <div className="skillsx-project-image">
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

                <div className="skillsx-project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="skillsx-project-tech">
                    {project.techStack.slice(0, 7).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <div className="skillsx-project-actions">
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

        <section className="skillsx-section">
          <div className="skillsx-section-head">
            <span>Interview Readiness</span>
            <h2>What I can discuss in an interview.</h2>
          </div>

          <div className="skillsx-readiness-grid">
            {interviewReadiness.map(({ icon: Icon, title, desc }) => (
              <article key={title}>
                <Icon />

                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skillsx-two-col">
          <div className="skillsx-panel">
            <div className="skillsx-section-head small">
              <span>Learning Roadmap</span>
              <h2>What I am improving next.</h2>
            </div>

            <div className="skillsx-roadmap">
              {learningRoadmap.map((item) => (
                <article key={item.title}>
                  <div>
                    <FiBookOpen />
                    <h3>{item.title}</h3>
                  </div>

                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>
                        <FiCheckCircle />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="skillsx-panel">
            <div className="skillsx-section-head small">
              <span>Recruiter Summary</span>
              <h2>Best fit roles.</h2>
            </div>

            <div className="skillsx-fit-list">
              {[
                'Software Development Intern',
                'MERN Stack Developer Intern',
                'Frontend Developer Intern',
                'Backend Developer Intern',
                'Full Stack Developer Intern',
              ].map((role) => (
                <div key={role}>
                  <FiStar />
                  <span>{role}</span>
                </div>
              ))}
            </div>

            <div className="skillsx-note">
              <FiTrendingUp />
              <p>
                My strongest profile is MERN stack internship where I can work
                on React UI, backend APIs, MongoDB, dashboards and real product
                features.
              </p>
            </div>
          </div>
        </section>

        <section className="skillsx-final-cta">
          <div>
            <span>Want to verify my work?</span>
            <h2>Check projects, resume and recruiter hub.</h2>
            <p>
              My skills are supported by live projects, GitHub repositories,
              API structure and deployment proof.
            </p>
          </div>

          <div>
            <Link to="/projects">
              Projects <FiLayers />
            </Link>

            <Link to="/recruiter">
              Recruiter Hub <FiBriefcase />
            </Link>

            <Link to="/contact">
              Contact Me <FiArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}