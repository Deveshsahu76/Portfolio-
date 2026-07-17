import React from 'react'
import {
  Link,
} from 'react-router-dom'
import {
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiExternalLink,
  FiGitBranch,
  FiGitCommit,
  FiGithub,
  FiServer,
  FiXCircle,
} from 'react-icons/fi'
import useEngineeringDashboard from '../hooks/useEngineeringDashboard'
import useSystemStatus from '../hooks/useSystemStatus'

const formatRelativeTime = (
  dateValue
) => {
  if (!dateValue) {
    return 'Not available'
  }

  const timestamp =
    new Date(
      dateValue
    ).getTime()

  if (
    Number.isNaN(timestamp)
  ) {
    return 'Recently'
  }

  const difference =
    Date.now() -
    timestamp

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

const buildClasses = {
  passing:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',

  failing:
    'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',

  running:
    'bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-300',

  completed:
    'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',

  'no-workflow':
    'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400',

  unavailable:
    'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',

  'not-checked':
    'bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-slate-400',
}

export default function LiveEngineeringPulse() {
  const engineering =
    useEngineeringDashboard()

  const system =
    useSystemStatus()

  const current =
    engineering.data
      .currentlyBuilding

  const recentCommits =
    engineering.data
      .recentCommits
      .slice(0, 5)

  const languages =
    engineering.data
      .topLanguages
      .slice(0, 5)

  const buildRepositories =
    engineering.data
      .repositories
      .filter(
        (repository) =>
          ![
            'not-checked',
          ].includes(
            repository.build.state
          )
      )
      .slice(0, 5)

  return (
    <section className="engineering-pulse-shell mx-auto mt-8 w-[min(100%-1rem,1360px)] overflow-hidden rounded-[2.5rem] border border-slate-900/10 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20 sm:p-7 lg:p-10">
      <div className="engineering-pulse-header flex flex-col gap-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live Engineering Data
          </div>

          <h2 className="engineering-pulse-title mt-5 font-black">
            Real coding activity,
            builds and deployments.
          </h2>

          <p className="engineering-pulse-copy mt-4 text-sm font-semibold leading-7 text-slate-300 sm:text-base">
            GitHub commits, repository languages, development state, build results and service health are fetched automatically.
          </p>
        </div>

        <div className="engineering-pulse-actions flex flex-wrap gap-3">
          <Link
            to="/engineering"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:-translate-y-0.5"
          >
            Engineering Dashboard
            <FiArrowRight />
          </Link>

          <Link
            to="/status"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10"
          >
            <FiServer />
            System Status
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <FiActivity className="text-xl text-emerald-300" />

          <strong className="mt-4 block text-3xl font-black">
            {
              engineering.data
                .summary
                .activeRepositories
            }
          </strong>

          <span className="mt-1 block text-sm font-bold text-slate-400">
            Active repositories
          </span>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <FiGitCommit className="text-xl text-cyan-300" />

          <strong className="mt-4 block text-3xl font-black">
            {
              engineering.data
                .summary
                .commitsLast30Days
            }
          </strong>

          <span className="mt-1 block text-sm font-bold text-slate-400">
            Recent commits found
          </span>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <FiCheckCircle className="text-xl text-indigo-300" />

          <strong className="mt-4 block text-3xl font-black">
            {
              engineering.data
                .summary
                .passingBuilds
            }
          </strong>

          <span className="mt-1 block text-sm font-bold text-slate-400">
            Passing builds
          </span>
        </article>

        <article className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <FiServer className="text-xl text-amber-300" />

          <strong className="mt-4 block text-3xl font-black">
            {system.data.onlineServices}/
            {system.data.totalServices}
          </strong>

          <span className="mt-1 block text-sm font-bold text-slate-400">
            Services reachable
          </span>
        </article>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                Currently Building
              </span>

              <h3 className="mt-2 text-2xl font-black">
                {
                  current?.name ||
                  'GitHub activity syncing'
                }
              </h3>
            </div>

            <FiCode className="text-3xl text-cyan-300" />
          </div>

          {current ? (
            <>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-300">
                {
                  current.description ||
                  'Active repository development and maintenance.'
                }
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-300">
                  {
                    current
                      .developmentStatus
                      .label
                  }
                </span>

                <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-slate-200">
                  {
                    current.primaryLanguage
                  }
                </span>

                <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-slate-200">
                  Updated {
                    formatRelativeTime(
                      current.pushedAt
                    )
                  }
                </span>
              </div>

              {current.latestCommit && (
                <a
                  href={
                    current
                      .latestCommit
                      .url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 block rounded-[1.25rem] border border-white/10 bg-slate-950/60 p-4 transition hover:border-cyan-300/30"
                >
                  <span className="text-xs font-black uppercase tracking-wide text-slate-500">
                    Latest commit
                  </span>

                  <strong className="mt-2 block text-sm font-black leading-6 text-white">
                    {
                      current
                        .latestCommit
                        .message
                    }
                  </strong>

                  <small className="mt-2 block text-xs font-bold text-slate-400">
                    {
                      current
                        .latestCommit
                        .shortSha
                    } / {
                      current
                        .latestCommit
                        .branch
                    }
                  </small>
                </a>
              )}

              <a
                href={current.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-300"
              >
                Open repository
                <FiExternalLink />
              </a>
            </>
          ) : (
            <p className="mt-5 text-sm font-bold text-slate-400">
              Live repository data is loading.
            </p>
          )}
        </article>

        <article className="rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-6">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-300">
            Repository Languages
          </span>

          <h3 className="mt-2 text-2xl font-black">
            Language usage from GitHub
          </h3>

          <div className="mt-6 grid gap-4">
            {languages.map(
              (language) => (
                <div key={language.name}>
                  <div className="flex items-center justify-between gap-4">
                    <strong className="text-sm font-black">
                      {language.name}
                    </strong>

                    <span className="text-xs font-black text-slate-400">
                      {language.percentage}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300"
                      style={{
                        width:
                          `${Math.max(
                            language.percentage,
                            2
                          )}%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}

            {languages.length === 0 && (
              <p className="text-sm font-bold text-slate-400">
                Language analytics is syncing.
              </p>
            )}
          </div>
        </article>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <FiGitCommit className="text-xl text-cyan-300" />

              <strong className="text-lg font-black">
                Recent Commits
              </strong>
            </div>

            <span className="text-xs font-black text-slate-500">
              LIVE
            </span>
          </div>

          <div>
            {recentCommits.map(
              (commit) => (
                <a
                  key={commit.sha}
                  href={commit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 border-b border-white/5 p-4 transition last:border-b-0 hover:bg-white/5"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-400/10 text-cyan-300">
                    <FiGitCommit />
                  </div>

                  <div className="min-w-0">
                    <strong className="block truncate text-sm font-black">
                      {commit.message}
                    </strong>

                    <span className="mt-1 block truncate text-xs font-bold text-slate-400">
                      {commit.repositoryName} / {commit.branch}
                    </span>
                  </div>

                  <time className="text-right text-xs font-black text-slate-500">
                    {
                      formatRelativeTime(
                        commit.createdAt
                      )
                    }
                  </time>
                </a>
              )
            )}

            {recentCommits.length ===
              0 && (
              <p className="p-5 text-sm font-bold text-slate-400">
                Recent commits are syncing.
              </p>
            )}
          </div>
        </article>

        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
          <div className="flex items-center justify-between border-b border-white/10 p-5">
            <div className="flex items-center gap-3">
              <FiGitBranch className="text-xl text-indigo-300" />

              <strong className="text-lg font-black">
                Build Status
              </strong>
            </div>

            <span className="text-xs font-black text-slate-500">
              GITHUB ACTIONS
            </span>
          </div>

          <div>
            {buildRepositories.map(
              (repository) => {
                const build =
                  repository.build

                const BuildIcon =
                  build.state ===
                  'passing'
                    ? FiCheckCircle
                    : build.state ===
                        'failing'
                      ? FiXCircle
                      : build.state ===
                          'running'
                        ? FiActivity
                        : FiGitBranch

                return (
                  <a
                    key={
                      repository.fullName
                    }
                    href={
                      build.url ||
                      repository.url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between gap-4 border-b border-white/5 p-4 transition last:border-b-0 hover:bg-white/5"
                  >
                    <div className="min-w-0">
                      <strong className="block truncate text-sm font-black">
                        {
                          repository.name
                        }
                      </strong>

                      <span className="mt-1 block truncate text-xs font-bold text-slate-400">
                        {
                          build.workflowName ||
                          'Repository workflow'
                        }
                      </span>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${
                        buildClasses[
                          build.state
                        ] ||
                        buildClasses[
                          'not-checked'
                        ]
                      }`}
                    >
                      <BuildIcon />
                      {build.label}
                    </span>
                  </a>
                )
              }
            )}

            {buildRepositories.length ===
              0 && (
              <p className="p-5 text-sm font-bold text-slate-400">
                Build data is syncing.
              </p>
            )}
          </div>
        </article>
      </div>
    </section>
  )
}