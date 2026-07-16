import React from 'react'
import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiCode,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiMonitor,
  FiServer,
  FiShield,
  FiTarget,
  FiTool,
  FiTrendingUp,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import ProjectRuntimeStatus from '../components/ProjectRuntimeStatus'
import projects from '../data/projects'

const SITE_URL =
  'https://deveshsahuportfolio.vercel.app'

const formatDate = (dateValue) => {
  if (!dateValue) {
    return 'Recently updated'
  }

  try {
    return new Intl.DateTimeFormat(
      'en-IN',
      {
        dateStyle: 'medium',
      }
    ).format(
      new Date(dateValue)
    )
  } catch {
    return dateValue
  }
}

const getProjectSchema = (project) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',

    name: project.title,

    description:
      project.longDescription ||
      project.description,

    url:
      `${SITE_URL}/projects/${project.id}`,

    author: {
      '@type': 'Person',
      name: 'Devesh Sahu',
      url: SITE_URL,
    },

    programmingLanguage:
      project.techStack || [],

    codeRepository:
      project.github || undefined,

    runtimePlatform:
      'Web Browser',

    dateModified:
      project.caseStudyUpdated,
  }

  if (project.demo) {
    schema.targetProduct = {
      '@type': 'SoftwareApplication',
      name: project.title,
      url: project.demo,
      applicationCategory:
        'WebApplication',
    }
  }

  return schema
}

export default function ProjectDetails() {
  const { projectId } = useParams()

  const projectIndex =
    projects.findIndex(
      (item) =>
        item.id === projectId
    )

  if (projectIndex === -1) {
    return (
      <Navigate
        to="/projects"
        replace
      />
    )
  }

  const project =
    projects[projectIndex]

  const nextProject =
    projects[
      (projectIndex + 1) %
      projects.length
    ]

  const features =
    project.features || []

  const architecture =
    project.architecture || []

  const apiDocs =
    project.apiDocs || []

  const schemas =
    project.schema || []

  const challenges =
    project.challenges || []

  const learnings =
    project.learnings || []

  const changelog =
    project.changelog || []

  const roadmap =
    project.roadmap || []

  const images =
    project.images?.length
      ? project.images
      : project.image
        ? [project.image]
        : []

  return (
    <>
      <SEO
        title={`${project.title} Case Study | Devesh Sahu`}
        description={
          project.longDescription ||
          project.description
        }
        path={`/projects/${project.id}`}
        image={
          project.image ||
          '/og-image.png'
        }
        type="article"
        schema={getProjectSchema(project)}
        keywords={`${project.title}, Devesh Sahu project, MERN case study, React project, Node.js project, MongoDB project`}
      />

      <main className="projectdetail-page">
        <section className="projectdetail-hero">
          <div className="projectdetail-hero-copy">
            <Link
              to="/projects"
              className="projectdetail-back"
            >
              <FiArrowLeft />
              Back to Projects
            </Link>

            <div className="projectdetail-kicker">
              <span />
              Project Case Study
            </div>

            <div className="projectdetail-title-row">
              <div>
                <span>
                  {project.category}
                </span>

                <h1>{project.title}</h1>
              </div>

              <strong
                className={`projectdetail-main-status ${project.status}`}
              >
                <i />
                {project.statusLabel}
              </strong>
            </div>

            <p>
              {project.longDescription ||
                project.description}
            </p>

            <div className="projectdetail-actions">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="projectdetail-primary"
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
                  className="projectdetail-secondary"
                >
                  <FiGithub />
                  Source Code
                </a>
              )}

              {project.apk && (
                <a
                  href={project.apk}
                  download
                  className="projectdetail-secondary"
                >
                  <FiDownload />
                  Download APK
                </a>
              )}
            </div>

            <div className="projectdetail-meta">
              <div>
                <FiCode />
                <span>
                  {project.techStack.length} technologies
                </span>
              </div>

              <div>
                <FiCheckCircle />
                <span>
                  {features.length} documented features
                </span>
              </div>

              <div>
                <FiTrendingUp />
                <span>
                  Updated {formatDate(project.caseStudyUpdated)}
                </span>
              </div>
            </div>
          </div>

          <aside className="projectdetail-hero-visual">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} application preview`}
                loading="eager"
                fetchPriority="high"
              />
            ) : (
              <div className="projectdetail-placeholder">
                <FiLayers />
                <strong>
                  {project.title}
                </strong>
              </div>
            )}

            <div>
              <span>Built with</span>

              <strong>
                {project.techStack
                  .slice(0, 4)
                  .join(' + ')}
              </strong>
            </div>
          </aside>
        </section>

        <ProjectRuntimeStatus
          project={project}
        />

        <section className="projectdetail-overview-grid">
          <article>
            <div>
              <FiTarget />
            </div>

            <span>The Problem</span>
            <h2>What needed to be solved?</h2>
            <p>{project.problem}</p>
          </article>

          <article>
            <div>
              <FiTool />
            </div>

            <span>The Solution</span>
            <h2>How I approached it.</h2>
            <p>{project.solution}</p>
          </article>

          <article>
            <div>
              <FiTrendingUp />
            </div>

            <span>The Impact</span>
            <h2>What this project proves.</h2>
            <p>{project.impact}</p>
          </article>
        </section>

        {images.length > 0 && (
          <section className="projectdetail-section">
            <div className="projectdetail-section-head">
              <span>Application Preview</span>

              <h2>
                Screens and interface proof.
              </h2>

              <p>
                Real project images used to show the application interface and user flow.
              </p>
            </div>

            <div
              className={`projectdetail-gallery ${
                images.length === 1
                  ? 'single'
                  : ''
              }`}
            >
              {images.map(
                (image, index) => (
                  <figure
                    key={`${image}-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      loading="lazy"
                      decoding="async"
                    />

                    <figcaption>
                      {project.title} screen {index + 1}
                    </figcaption>
                  </figure>
                )
              )}
            </div>
          </section>
        )}

        <section className="projectdetail-section">
          <div className="projectdetail-section-head">
            <span>Feature Set</span>

            <h2>
              Core product capabilities.
            </h2>

            <p>
              The main features implemented or designed as part of this project.
            </p>
          </div>

          <div className="projectdetail-feature-grid">
            {features.map(
              (feature, index) => (
                <article key={feature}>
                  <strong>
                    {String(index + 1).padStart(2, '0')}
                  </strong>

                  <FiCheckCircle />

                  <p>{feature}</p>
                </article>
              )
            )}
          </div>
        </section>

        <section className="projectdetail-section">
          <div className="projectdetail-section-head">
            <span>Technology Stack</span>

            <h2>
              Tools used to build the project.
            </h2>
          </div>

          <div className="projectdetail-stack">
            {project.techStack.map(
              (technology) => (
                <div key={technology}>
                  <FiCode />
                  <span>{technology}</span>
                </div>
              )
            )}
          </div>
        </section>

        <section className="projectdetail-section projectdetail-architecture-section">
          <div className="projectdetail-section-head">
            <span>System Architecture</span>

            <h2>
              How data moves through the application.
            </h2>

            <p>
              A simplified engineering flow from user interaction to data storage.
            </p>
          </div>

          <div className="projectdetail-architecture">
            {architecture.map(
              (item, index) => (
                <React.Fragment key={item}>
                  <article>
                    <strong>
                      {String(index + 1).padStart(2, '0')}
                    </strong>

                    <div>
                      {index === 0 ? (
                        <FiMonitor />
                      ) : index ===
                        architecture.length - 1 ? (
                        <FiDatabase />
                      ) : (
                        <FiServer />
                      )}
                    </div>

                    <p>{item}</p>
                  </article>

                  {index <
                    architecture.length -
                      1 && (
                    <FiArrowRight className="projectdetail-architecture-arrow" />
                  )}
                </React.Fragment>
              )
            )}
          </div>
        </section>

        {(apiDocs.length > 0 ||
          schemas.length > 0) && (
          <section className="projectdetail-technical-grid">
            {apiDocs.length > 0 && (
              <article className="projectdetail-technical-panel">
                <div className="projectdetail-panel-head">
                  <FiServer />

                  <div>
                    <span>Backend Proof</span>
                    <h2>API Endpoints</h2>
                  </div>
                </div>

                <div className="projectdetail-api-list">
                  {apiDocs.map((api) => (
                    <div
                      key={`${api.method}-${api.endpoint}`}
                    >
                      <strong
                        className={api.method.toLowerCase()}
                      >
                        {api.method}
                      </strong>

                      <code>
                        {api.endpoint}
                      </code>

                      <p>
                        {api.description}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            )}

            {schemas.length > 0 && (
              <article className="projectdetail-technical-panel">
                <div className="projectdetail-panel-head">
                  <FiDatabase />

                  <div>
                    <span>Database Proof</span>
                    <h2>Data Models</h2>
                  </div>
                </div>

                <div className="projectdetail-schema-list">
                  {schemas.map((schema) => (
                    <div key={schema.name}>
                      <strong>
                        {schema.name}
                      </strong>

                      <div>
                        {schema.fields.map(
                          (field) => (
                            <code key={field}>
                              {field}
                            </code>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </section>
        )}

        <section className="projectdetail-section">
          <div className="projectdetail-section-head">
            <span>Engineering Experience</span>

            <h2>
              Challenges and technical learning.
            </h2>
          </div>

          <div className="projectdetail-learning-grid">
            <article>
              <div className="projectdetail-panel-head">
                <FiShield />

                <div>
                  <span>Challenges</span>
                  <h2>Problems handled</h2>
                </div>
              </div>

              <ul>
                {challenges.map(
                  (challenge) => (
                    <li key={challenge}>
                      <FiArrowRight />
                      <span>{challenge}</span>
                    </li>
                  )
                )}
              </ul>
            </article>

            <article>
              <div className="projectdetail-panel-head">
                <FiTrendingUp />

                <div>
                  <span>Learning</span>
                  <h2>Skills improved</h2>
                </div>
              </div>

              <ul>
                {learnings.map(
                  (learning) => (
                    <li key={learning}>
                      <FiCheckCircle />
                      <span>{learning}</span>
                    </li>
                  )
                )}
              </ul>
            </article>
          </div>
        </section>

        {changelog.length > 0 && (
          <section className="projectdetail-section">
            <div className="projectdetail-section-head">
              <span>Project Changelog</span>

              <h2>
                Development progress over time.
              </h2>
            </div>

            <div className="projectdetail-changelog">
              {changelog.map(
                (item, index) => (
                  <article
                    key={`${item.version}-${item.title}`}
                  >
                    <div>
                      <strong>
                        {item.version}
                      </strong>

                      <span>
                        {item.date}
                      </span>
                    </div>

                    <section>
                      <i />

                      <h3>{item.title}</h3>

                      <p>
                        {item.description}
                      </p>
                    </section>

                    <small>
                      {String(index + 1).padStart(2, '0')}
                    </small>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {roadmap.length > 0 && (
          <section className="projectdetail-roadmap">
            <div>
              <span>Future Roadmap</span>

              <h2>
                What I plan to improve next.
              </h2>

              <p>
                These items describe planned improvements rather than completed features.
              </p>
            </div>

            <div>
              {roadmap.map(
                (item, index) => (
                  <article key={item}>
                    <strong>
                      {String(index + 1).padStart(2, '0')}
                    </strong>

                    <p>{item}</p>
                  </article>
                )
              )}
            </div>
          </section>
        )}

        {project.credentials && (
          <section className="projectdetail-note">
            <FiShield />

            <div>
              <strong>
                Access and testing information
              </strong>

              <p>
                {project.credentials}
              </p>
            </div>
          </section>
        )}

        <section className="projectdetail-next">
          <div>
            <span>Continue Exploring</span>

            <h2>
              Next case study:
              {' '}
              {nextProject.title}
            </h2>

            <p>
              Review another project to see a different application flow and engineering approach.
            </p>
          </div>

          <Link
            to={`/projects/${nextProject.id}`}
          >
            Open {nextProject.title}
            <FiArrowRight />
          </Link>
        </section>
      </main>
    </>
  )
}