import React from 'react'
import {
  FiActivity,
  FiClock,
  FiExternalLink,
  FiGitCommit,
  FiGithub,
  FiServer,
  FiStar,
  FiUsers,
} from 'react-icons/fi'
import useGitHubOverview from '../hooks/useGitHubOverview'
import useProjectStatuses from '../hooks/useProjectStatuses'

const formatRelativeTime = (
  dateValue
) => {
  if (!dateValue) {
    return 'Not available'
  }

  const timestamp =
    new Date(dateValue).getTime()

  if (
    Number.isNaN(timestamp)
  ) {
    return 'Recently'
  }

  const difference =
    Date.now() - timestamp

  const minutes =
    Math.floor(
      difference / 60000
    )

  if (minutes < 1) {
    return 'Just now'
  }

  if (minutes < 60) {
    return `${minutes}m ago`
  }

  const hours =
    Math.floor(
      minutes / 60
    )

  if (hours < 24) {
    return `${hours}h ago`
  }

  const days =
    Math.floor(
      hours / 24
    )

  if (days < 30) {
    return `${days}d ago`
  }

  return new Intl.DateTimeFormat(
    'en-IN',
    {
      dateStyle: 'medium',
    }
  ).format(
    new Date(dateValue)
  )
}

export default function LiveEngineeringPulse() {
  const github =
    useGitHubOverview()

  const projects =
    useProjectStatuses()

  const githubLive =
    github.status === 'live'

  const projectsLive =
    projects.status === 'live'

  const fullyLive =
    githubLive &&
    projectsLive

  const recentActivity =
    github.data.recentActivity
      .slice(0, 5)

  return (
    <section className="engpulse-section">
      <div className="engpulse-glow engpulse-glow-one" />
      <div className="engpulse-glow engpulse-glow-two" />

      <div className="engpulse-heading">
        <div>
          <span className="engpulse-kicker">
            <i />
            Live Engineering Pulse
          </span>

          <h2>
            Real development activity,
            not static claims.
          </h2>

          <p>
            GitHub activity and deployed project
            health are fetched automatically from
            live sources.
          </p>
        </div>

        <a
          href={
            github.data.profileUrl ||
            'https://github.com/Deveshsahu76'
          }
          target="_blank"
          rel="noreferrer"
          className="engpulse-github-link"
        >
          <FiGithub />
          Open GitHub
          <FiExternalLink />
        </a>
      </div>

      <div className="engpulse-sync-bar">
        <div
          className={
            fullyLive
              ? 'live'
              : 'cached'
          }
        >
          <i />

          {fullyLive
            ? 'LIVE DATA SYNC'
            : 'CACHED DATA'}
        </div>

        <span>
          Last coding activity:{' '}
          <strong>
            {formatRelativeTime(
              github.data
                .lastActivityAt
            )}
          </strong>
        </span>
      </div>

      <div className="engpulse-stat-grid">
        <article>
          <FiGithub />

          <strong>
            {
              github.data
                .publicRepositories
            }
          </strong>

          <span>
            Public repositories
          </span>
        </article>

        <article>
          <FiUsers />

          <strong>
            {
              github.data.followers
            }
          </strong>

          <span>
            GitHub followers
          </span>
        </article>

        <article>
          <FiStar />

          <strong>
            {
              github.data.totalStars
            }
          </strong>

          <span>
            Repository stars
          </span>
        </article>

        <article>
          <FiServer />

          <strong>
            {projects.data.onlineServices}
            /
            {projects.data.totalServices}
          </strong>

          <span>
            Services online
          </span>
        </article>
      </div>

      <div className="engpulse-content-grid">
        <article className="engpulse-panel">
          <div className="engpulse-panel-head">
            <div>
              <FiActivity />
              <span>
                Recent Development Activity
              </span>
            </div>

            <strong>
              {githubLive
                ? 'LIVE'
                : 'CACHED'}
            </strong>
          </div>

          <div className="engpulse-activity-list">
            {recentActivity.map(
              (activity) => (
                <a
                  key={
                    activity.id ||
                    `${activity.title}-${activity.createdAt}`
                  }
                  href={
                    activity.repositoryUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <FiGitCommit />
                  </div>

                  <section>
                    <strong>
                      {activity.title}
                    </strong>

                    <span>
                      {
                        activity.description
                      }
                    </span>
                  </section>

                  <time>
                    {formatRelativeTime(
                      activity.createdAt
                    )}
                  </time>
                </a>
              )
            )}

            {recentActivity.length ===
              0 && (
              <div className="engpulse-empty">
                GitHub activity is
                syncing...
              </div>
            )}
          </div>
        </article>

        <article className="engpulse-panel">
          <div className="engpulse-panel-head">
            <div>
              <FiServer />
              <span>
                Deployment Health
              </span>
            </div>

            <strong>
              {projects.data.allOnline
                ? 'ALL ONLINE'
                : `${projects.data.onlineServices} ONLINE`}
            </strong>
          </div>

          <div className="engpulse-service-list">
            {projects.data.services.map(
              (service) => (
                <a
                  key={service.id}
                  href={service.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className={
                      service.online
                        ? 'online'
                        : 'offline'
                    }
                  >
                    <i />
                  </div>

                  <section>
                    <strong>
                      {service.name}
                    </strong>

                    <span>
                      {service.service}
                    </span>
                  </section>

                  <aside>
                    <b>
                      {service.online
                        ? 'ONLINE'
                        : 'OFFLINE'}
                    </b>

                    <small>
                      {
                        service.responseTimeMs
                      }
                      ms
                    </small>
                  </aside>
                </a>
              )
            )}

            {projects.data.services
              .length === 0 && (
              <div className="engpulse-empty">
                Project services are
                syncing...
              </div>
            )}
          </div>
        </article>
      </div>

      {github.data.latestRepository && (
        <a
          href={
            github.data
              .latestRepository.url
          }
          target="_blank"
          rel="noreferrer"
          className="engpulse-latest-repo"
        >
          <FiClock />

          <div>
            <span>
              Most recently updated repository
            </span>

            <strong>
              {
                github.data
                  .latestRepository.name
              }
            </strong>
          </div>

          <small>
            {formatRelativeTime(
              github.data
                .latestRepository
                .pushedAt
            )}
          </small>

          <FiExternalLink />
        </a>
      )}
    </section>
  )
}