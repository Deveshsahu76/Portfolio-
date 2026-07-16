import React from 'react'
import useLeetCodeStats from '../hooks/useLeetCodeStats'

export default function LiveLeetCodeStat({
  label = 'LeetCode solved',
  className = '',
  fallback = 127,
}) {
  const stats =
    useLeetCodeStats()

  const solvedCount =
    Number(stats.totalSolved) > 0
      ? Number(stats.totalSolved)
      : fallback

  const isLive =
    stats.status === 'live'

  const isLoading =
    stats.status === 'loading'

  const statusText =
    isLive
      ? 'LIVE'
      : isLoading
        ? 'SYNCING'
        : 'CACHED'

  const statusClass =
    isLive
      ? 'is-live'
      : isLoading
        ? 'is-syncing'
        : 'is-cached'

  const profileUrl =
    stats.profileUrl ||
    'https://leetcode.com/u/deveshsahu567/'

  const description =
    isLive
      ? `Easy ${stats.easySolved} · Medium ${stats.mediumSolved} · Hard ${stats.hardSolved}`
      : 'Open live LeetCode profile'

  const openProfile = () => {
    window.open(
      profileUrl,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleKeyDown = (event) => {
    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault()
      openProfile()
    }
  }

  return (
    <div
      className={`${className} leetcode-live-card ${statusClass}`}
      role="link"
      tabIndex={0}
      title={description}
      aria-label={`${solvedCount} ${label}. ${description}`}
      onClick={openProfile}
      onKeyDown={handleKeyDown}
    >
      <em className="leetcode-live-status">
        <i />
        {statusText}
      </em>

      <strong
        key={`${solvedCount}-${stats.status}`}
        className="leetcode-live-number"
      >
        {solvedCount}+
      </strong>

      <span>{label}</span>

      <small className="leetcode-live-breakdown">
        Easy {stats.easySolved}
        {' · '}
        Medium {stats.mediumSolved}
        {' · '}
        Hard {stats.hardSolved}
      </small>
    </div>
  )
}