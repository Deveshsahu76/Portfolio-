import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiAward,
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiFilter,
  FiGithub,
  FiGrid,
  FiLayers,
  FiMonitor,
  FiSearch,
  FiServer,
  FiShield,
  FiSmartphone,
  FiTarget,
  FiZap,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import ProjectEngineeringBadge from '../components/ProjectEngineeringBadge'
import ProjectOrbitShowcase from '../components/ProjectOrbitShowcase'
import projects from '../data/projects'

const filters = [
  'All',
  'MERN',
  'Full Stack',
  'Frontend',
  'Backend/API',
  'Mobile',
]

const projectStrengths = [
  {
    icon: FiCode,
    title: 'Frontend Skills',
    desc: 'React components, responsive UI, routing, forms and clean user experience.',
  },
  {
    icon: FiServer,
    title: 'Backend APIs',
    desc: 'Node.js, Express.js, REST APIs, auth flow and route-based backend structure.',
  },
  {
    icon: FiDatabase,
    title: 'Database Design',
    desc: 'MongoDB schemas, models, CRUD operations and data-driven project flow.',
  },
  {
    icon: FiShield,
    title: 'Deployment Ready',
    desc: 'Frontend deployment, backend deployment, environment setup and production flow.',
  },
]

const caseStudyFlow = [
  {
    title: 'Problem',
    desc: 'Identify a real use case like shopping flow, dashboard, game logic or file management.',
  },
  {
    title: 'Solution',
    desc: 'Build a practical web app with clean UI, backend APIs and structured data handling.',
  },
  {
    title: 'Tech',
    desc: 'Use React, Node.js, Express, MongoDB, REST APIs, JWT and deployment tools.',
  },
  {
    title: 'Impact',
    desc: 'Show proof through live demo, GitHub code, screenshots, API structure and features.',
  },
]

function getProjectCategory(project) {
  const text = [
    project.title,
    project.description,
    project.longDescription,
    ...(project.techStack || []),
    ...(project.features || []),
  ]
    .join(' ')
    .toLowerCase()

  if (
    text.includes('apk') ||
    text.includes('android') ||
    text.includes('mobile')
  ) {
    return 'Mobile'
  }

  if (
    text.includes('mern') ||
    (text.includes('react') &&
      text.includes('node') &&
      text.includes('mongodb'))
  ) {
    return 'MERN'
  }

  if (
    text.includes('api') ||
    text.includes('backend') ||
    text.includes('express')
  ) {
    return 'Backend/API'
  }

  if (
    text.includes('react') ||
    text.includes('frontend') ||
    text.includes('ui')
  ) {
    return 'Frontend'
  }

  return 'Full Stack'
}

function matchesFilter(project, activeFilter) {
  if (activeFilter === 'All') return true

  const category = getProjectCategory(project)

  const text = [
    category,
    project.title,
    project.description,
    project.longDescription,
    ...(project.techStack || []),
    ...(project.features || []),
  ]
    .join(' ')
    .toLowerCase()

  if (activeFilter === 'Full Stack') {
    return (
      text.includes('full') ||
      text.includes('mern') ||
      text.includes('backend')
    )
  }

  if (activeFilter === 'Backend/API') {
    return (
      text.includes('backend') ||
      text.includes('api') ||
      text.includes('express')
    )
  }

  return text.includes(activeFilter.toLowerCase())
}

function getProjectImageClass(project) {
  if (project.id === 'queens-arena') {
    return 'projectsx-project-visual-portrait'
  }

  return 'projectsx-project-visual-landscape'
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [query, setQuery] = useState('')

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return projects.filter((project) => {
      const searchText = [
        project.title,
        project.description,
        project.longDescription,
        ...(project.techStack || []),
        ...(project.features || []),
      ]
        .join(' ')
        .toLowerCase()

      const queryMatch =
        normalizedQuery.length === 0 ||
        searchText.includes(normalizedQuery)

      const filterMatch = matchesFilter(project, activeFilter)

      return queryMatch && filterMatch
    })
  }, [activeFilter, query])

  return (
    <>
      <SEO
        title="Projects | Devesh Sahu MERN Stack Developer"
        description="Explore projects by Devesh Sahu including MERN stack apps, e-commerce website, Zerodha clone, Queens Arena game, APIs, database schemas and deployed web apps."
        path="/projects"
      />

      <main className="projectsx-page">
        <section className="projectsx-hero">
          <div className="projectsx-hero-copy">
            <div className="projectsx-kicker">
              <span />
              Project Case Studies
            </div>

            <h1>
              Projects that prove my full-stack development skills.
            </h1>

            <p>
              Here you can review my live projects, GitHub repositories,
              technology stack, backend APIs, database schemas, architecture
              and practical implementation approach.
            </p>

            <div className="projectsx-actions">
              <a
                href="#projects-list"
                className="projectsx-primary-btn"
              >
                View Projects
                <FiArrowRight />
              </a>

              <Link
                to="/recruiter"
                className="projectsx-secondary-btn"
              >
                <FiBriefcase />
                Recruiter Hub
              </Link>

              <Link
                to="/contact"
                className="projectsx-secondary-btn"
              >
                Contact Me
                <FiExternalLink />
              </Link>
            </div>
          </div>

          <aside className="projectsx-summary-card">
            <span>Developer Proof</span>
            <h2>Project Portfolio</h2>

            <div className="projectsx-summary-list">
              <div>
                <FiCheckCircle />
                <strong>Live deployed apps</strong>
              </div>

              <div>
                <FiCheckCircle />
                <strong>GitHub repositories</strong>
              </div>

              <div>
                <FiCheckCircle />
                <strong>API and schema details</strong>
              </div>

              <div>
                <FiCheckCircle />
                <strong>Full-stack architecture</strong>
              </div>
            </div>

            <div className="projectsx-mini-proof">
              <FiAward />

              <div>
                <strong>Built for recruiter review</strong>
                <span>
                  Quick proof of skills, code and project thinking.
                </span>
              </div>
            </div>
          </aside>
        </section>

        <section className="projectsx-stats">
          <div>
            <strong>{projects.length}+</strong>
            <span>Projects</span>
          </div>

          <div>
            <strong>MERN</strong>
            <span>Primary Stack</span>
          </div>

          <div>
            <strong>REST</strong>
            <span>API Structure</span>
          </div>

          <div>
            <strong>Live</strong>
            <span>Deployment Proof</span>
          </div>
        </section>

        <ProjectOrbitShowcase
          projects={projects}
          eyebrow="3D Project Navigator"
          title="Navigate the project portfolio in three dimensions."
          description="Select a project to preview its interface, technology stack, GitHub status and case study before exploring the complete technical details."
          id="projects-3d-showcase"
        />

        <section className="projectsx-section">
          <div className="projectsx-section-head">
            <span>Skill Proof</span>

            <h2>What these projects demonstrate.</h2>

            <p>
              These projects are structured to show frontend, backend,
              database, deployment and real product thinking.
            </p>
          </div>

          <div className="projectsx-strength-grid">
            {projectStrengths.map(({ icon: Icon, title, desc }) => (
              <article
                key={title}
                className="projectsx-strength-card"
              >
                <div className="projectsx-icon">
                  <Icon />
                </div>

                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="projectsx-section projectsx-case-flow">
          <div className="projectsx-section-head">
            <span>Case Study Format</span>
            <h2>How I explain every project.</h2>
          </div>

          <div className="projectsx-flow-grid">
            {caseStudyFlow.map((item, index) => (
              <article key={item.title}>
                <strong>
                  {String(index + 1).padStart(2, '0')}
                </strong>

                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="projects-list"
          className="projectsx-section"
        >
          <div className="projectsx-projects-head">
            <div>
              <span>Project Lab</span>
              <h2>Explore selected projects.</h2>

              <p>
                Filter projects by category or search by technology,
                feature or project name.
              </p>
            </div>

            <label className="projectsx-search">
              <FiSearch />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search React, MongoDB, API..."
                aria-label="Search projects"
              />
            </label>
          </div>

          <div className="projectsx-filter-bar">
            <div>
              <FiFilter />
              <span>Filter</span>
            </div>

            <div className="projectsx-tabs">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={
                    activeFilter === filter ? 'active' : ''
                  }
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="projectsx-project-grid">
            {filteredProjects.map((project) => {
              const techStack = project.techStack || []
              const features = project.features || []
              const apiDocs = project.apiDocs || []
              const schemas = project.schema || []
              const architecture = project.architecture || []
              const category = getProjectCategory(project)
              const imageClass = getProjectImageClass(project)

              return (
                <article
                  key={project.id || project.title}
                  className="projectsx-project-card projectsx-project-card-v2"
                >
                  <div className="projectsx-project-top">
                    <div
                      className={`projectsx-project-visual ${imageClass}`}
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} project preview`}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="projectsx-project-placeholder">
                          <FiLayers />
                        </div>
                      )}

                      <div className="projectsx-project-badge">
                        <FiGrid />
                        {category}
                      </div>

                      {project.apk && (
                        <div className="projectsx-apk-badge">
                          <FiSmartphone />
                          APK
                        </div>
                      )}
                    </div>

                    <div className="projectsx-project-overview">
                      <div className="projectsx-project-title-row">
                        <div>
                          <span>{category} Project</span>
                          <h3>{project.title}</h3>
                        </div>

                        <FiZap />
                      </div>

                      <p className="projectsx-project-desc">
                        {project.longDescription ||
                          project.description}
                      </p>

                      <ProjectEngineeringBadge
                        project={project}
                      />

                      <div className="projectsx-tech-list">
                        {techStack.slice(0, 7).map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>

                      <div className="projectsx-action-row">
                        <Link
                          to={`/projects/${project.id}`}
                          className="projectsx-case-study-link"
                          aria-label={`View ${project.title} case study`}
                        >
                          View Case Study
                          <FiArrowRight />
                        </Link>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.title} live demo`}
                          >
                            Live Demo
                            <FiExternalLink />
                          </a>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.title} GitHub repository`}
                          >
                            GitHub
                            <FiGithub />
                          </a>
                        )}

                        {project.apk && (
                          <a
                            href={project.apk}
                            download
                            aria-label={`Download ${project.title} APK`}
                          >
                            APK
                            <FiDownload />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="projectsx-project-details">
                    <div className="projectsx-case-grid">
                      <div>
                        <div className="projectsx-case-heading">
                          <FiTarget />
                          <strong>Key Features</strong>
                        </div>

                        <ul>
                          {features.slice(0, 5).map((feature) => (
                            <li key={feature}>
                              <FiCheckCircle />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="projectsx-case-heading">
                          <FiMonitor />
                          <strong>Architecture</strong>
                        </div>

                        <ul>
                          {architecture
                            .slice(0, 5)
                            .map((item) => (
                              <li key={item}>
                                <FiArrowRight />
                                <span>{item}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    {(apiDocs.length > 0 ||
                      schemas.length > 0) && (
                      <div className="projectsx-technical-grid">
                        {apiDocs.length > 0 && (
                          <div className="projectsx-api-box">
                            <div className="projectsx-box-head">
                              <FiServer />
                              <strong>
                                API Endpoints Preview
                              </strong>
                            </div>

                            <div className="projectsx-api-list">
                              {apiDocs
                                .slice(0, 4)
                                .map((api) => (
                                  <div
                                    key={`${api.method}-${api.endpoint}`}
                                  >
                                    <span>{api.method}</span>
                                    <code>{api.endpoint}</code>
                                    <p>{api.description}</p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {schemas.length > 0 && (
                          <div className="projectsx-schema-box">
                            <div className="projectsx-box-head">
                              <FiDatabase />
                              <strong>
                                Database Schema Preview
                              </strong>
                            </div>

                            <div className="projectsx-schema-list">
                              {schemas
                                .slice(0, 4)
                                .map((item) => (
                                  <div key={item.name}>
                                    <strong>{item.name}</strong>

                                    <p>
                                      {(item.fields || []).join(
                                        ', '
                                      )}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {project.credentials && (
                      <div className="projectsx-note">
                        <FiShield />
                        <p>{project.credentials}</p>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="projectsx-empty">
              <FiSearch />
              <h3>No project found</h3>

              <p>
                Try another category or search using a different
                project name, feature or technology.
              </p>

              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveFilter('All')
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        <section className="projectsx-final-cta">
          <div>
            <span>Interested in my work?</span>

            <h2>
              Review my profile or contact me for an opportunity.
            </h2>

            <p>
              Recruiters can evaluate my projects through the
              Recruiter Hub. Clients can contact me for websites,
              dashboards, APIs and full-stack applications.
            </p>
          </div>

          <div>
            <Link to="/recruiter">
              Recruiter Hub
              <FiBriefcase />
            </Link>

            <Link to="/freelance">
              Freelance Work
              <FiBarChart2 />
            </Link>

            <Link to="/contact">
              Contact Me
              <FiArrowRight />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}