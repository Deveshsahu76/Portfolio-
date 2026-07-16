import React from 'react'
import {
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiServer,
} from 'react-icons/fi'
import useProjectStatuses from '../hooks/useProjectStatuses'

const staticStatusMap = {
  live: {
    label: 'Live Project',
    className: 'online',
  },

  'code-available': {
    label: 'Code Available',
    className: 'code',
  },

  'in-development': {
    label: 'In Development',
    className: 'development',
  },
}

export default function ProjectRuntimeStatus({
  project,
}) {
  const runtime = useProjectStatuses()

  const services =
    runtime.data.services.filter(
      (service) =>
        service.projectId === project.id
    )

  if (services.length > 0) {
    const onlineCount =
      services.filter(
        (service) => service.online
      ).length

    const allOnline =
      onlineCount === services.length

    return (
      <section className="projectdetail-runtime">
        <div className="projectdetail-runtime-head">
          <div>
            <FiActivity />
            <span>Live Deployment Status</span>
          </div>

          <strong
            className={
              allOnline
                ? 'online'
                : onlineCount > 0
                  ? 'partial'
                  : 'offline'
            }
          >
            <i />

            {allOnline
              ? 'ALL ONLINE'
              : `${onlineCount}/${services.length} ONLINE`}
          </strong>
        </div>

        <div className="projectdetail-runtime-grid">
          {services.map((service) => (
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
                <span>{service.service}</span>
                <strong>{service.name}</strong>
              </section>

              <aside>
                <b>
                  {service.online
                    ? 'ONLINE'
                    : 'OFFLINE'}
                </b>

                <small>
                  {service.responseTimeMs} ms
                </small>
              </aside>
            </a>
          ))}
        </div>

        <p>
          Status is checked automatically by the portfolio backend.
        </p>
      </section>
    )
  }

  const fallback =
    staticStatusMap[project.status] ||
    staticStatusMap['in-development']

  return (
    <section className="projectdetail-runtime">
      <div className="projectdetail-runtime-head">
        <div>
          <FiServer />
          <span>Project Status</span>
        </div>

        <strong className={fallback.className}>
          <i />
          {fallback.label}
        </strong>
      </div>

      <div className="projectdetail-static-status">
        {project.status === 'code-available' && (
          <>
            <FiCheckCircle />

            <div>
              <strong>Repository available for review</strong>
              <span>
                The project source code can be inspected through GitHub.
              </span>
            </div>
          </>
        )}

        {project.status === 'in-development' && (
          <>
            <FiClock />

            <div>
              <strong>Active development case study</strong>
              <span>
                Architecture, planned APIs and future roadmap are documented.
              </span>
            </div>
          </>
        )}

        {project.status === 'live' && (
          <>
            <FiCheckCircle />

            <div>
              <strong>Public application available</strong>
              <span>
                Use the live demo button to review the deployed project.
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}