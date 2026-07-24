import React from 'react'
import { Link } from 'react-router-dom'
import {
  FiActivity,
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiCode,
  FiGitCommit,
  FiGithub,
} from 'react-icons/fi'
import useAvailability from '../hooks/useAvailability'
import useEngineeringDashboard from '../hooks/useEngineeringDashboard'

export default function RecruiterCommandDeck() {
  const engineering = useEngineeringDashboard()
  const availability = useAvailability()

  const summary = engineering.data?.summary || {}
  const current = engineering.data?.currentlyBuilding
  const availabilityData = availability.data || {}

  const value = (number) =>
    engineering.status === 'loading' && !number ? '—' : Number(number || 0)

  const metrics = [
    ['Repositories', value(summary.publicRepositories), FiGithub],
    ['Active Projects', value(summary.activeRepositories), FiCode],
    ['Recent Commits', value(summary.commitsLast30Days), FiGitCommit],
  ]

  return (
    <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/30 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-orange-300">
              <FiActivity />
              Candidate Command Center
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Recruiter-ready proof in one focused view.
            </h2>

            <p className="mt-4 text-sm font-semibold leading-7 text-slate-400 sm:text-base">
              Review availability, engineering activity and the recommended next
              step without searching through multiple sections.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href="#recruiter-interview-request"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-orange-400 px-5 text-sm font-black text-slate-950"
            >
              Schedule Interview
              <FiArrowRight />
            </a>

            <Link
              to="/projects"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-sm font-black text-white"
            >
              Review Projects
            </Link>
          </div>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  Candidate Signal
                </span>
                <h3 className="mt-2 text-3xl font-black text-white">
                  Devesh Sahu
                </h3>
                <p className="mt-2 text-sm font-bold text-slate-400">
                  MERN Stack Developer · B.Tech IT
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-300">
                <FiCheckCircle />
                {availabilityData.statusLabel || 'Availability syncing'}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Git'].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-slate-300"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-cyan-300/10 bg-cyan-300/[0.04] p-4">
              <span className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">
                Current Engineering Focus
              </span>
              <strong className="mt-2 block truncate text-lg font-black text-white">
                {current?.name || 'GitHub activity syncing'}
              </strong>
              <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-slate-400">
                {current?.latestCommit?.message ||
                  current?.description ||
                  'Live repository activity will appear here when available.'}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl bg-white/[0.025] p-4 text-sm font-bold text-slate-300">
              <FiBriefcase className="shrink-0 text-orange-300" />
              Open to software development, frontend, backend and full-stack
              internship roles.
            </div>
          </article>

          <aside className="grid gap-3">
            <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4 text-xs font-black text-slate-300">
              <span
                className={`mr-2 inline-block h-2 w-2 rounded-full ${
                  engineering.status === 'live'
                    ? 'bg-emerald-400'
                    : engineering.status === 'offline'
                      ? 'bg-rose-400'
                      : 'bg-amber-300'
                }`}
              />
              {engineering.status === 'live'
                ? 'Live GitHub data'
                : engineering.status === 'offline'
                  ? 'Engineering data temporarily offline'
                  : 'Syncing engineering data'}
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {metrics.map(([label, metric, Icon]) => (
                <article
                  key={label}
                  className="flex min-h-24 items-center gap-4 rounded-[1.2rem] border border-white/10 bg-white/[0.03] p-4"
                >
                  <Icon className="text-xl text-cyan-300" />
                  <div>
                    <strong className="block text-2xl font-black text-white">
                      {metric}
                    </strong>
                    <span className="text-xs font-black text-slate-500">
                      {label}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
