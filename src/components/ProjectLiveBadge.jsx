import React from 'react'
import useProjectStatuses from '../hooks/useProjectStatuses'

const monitoredProjectIds = [
  'queens-arena',
  'ecommerce-store',
]

export default function ProjectLiveBadge({
  projectId,
}) {
  const status =
    useProjectStatuses()

  if (
    !monitoredProjectIds.includes(
      projectId
    )
  ) {
    return null
  }

  const services =
    status.data.services.filter(
      (service) =>
        service.projectId ===
        projectId
    )

  if (
    status.status ===
      'loading' &&
    services.length === 0
  ) {
    return (
      <div className="project-live-badge syncing">
        <i />
        SYNCING
      </div>
    )
  }

  if (
    services.length === 0
  ) {
    return null
  }

  const onlineCount =
    services.filter(
      (service) =>
        service.online
    ).length

  const allOnline =
    onlineCount ===
    services.length

  const partial =
    onlineCount > 0 &&
    !allOnline

  const label =
    allOnline
      ? 'LIVE'
      : partial
        ? 'PARTIAL'
        : 'OFFLINE'

  const badgeClass =
    allOnline
      ? 'online'
      : partial
        ? 'partial'
        : 'offline'

  const title =
    services
      .map(
        (service) =>
          `${service.service}: ${
            service.online
              ? 'Online'
              : 'Offline'
          }`
      )
      .join(' · ')

  return (
    <div
      className={`project-live-badge ${badgeClass}`}
      title={title}
    >
      <i />
      {label}
    </div>
  )
}