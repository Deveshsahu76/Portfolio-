import React from 'react'
import LiveLeetCodeStat from './LiveLeetCodeStat'

export default function HomeStats() {
  return (
    <section className="premium-stats-strip">
      <div className="premium-stat-card">
        <strong>4+</strong>
        <span>Projects shipped</span>
      </div>

      <LiveLeetCodeStat
        className="premium-stat-card"
        label="LeetCode solved"
        fallback={127}
      />

      <div className="premium-stat-card">
        <strong>MERN</strong>
        <span>Primary stack</span>
      </div>

      <div className="premium-stat-card">
        <strong>Live</strong>
        <span>Deployments</span>
      </div>
    </section>
  )
}