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
  FiRefreshCw,
  FiServer,
  FiStar,
  FiXCircle,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import useEngineeringDashboard from '../hooks/useEngineeringDashboard'

const formatRelativeTime = (
  dateValue
) => {
  if (!dateValue) {
    return 'Not available'
  }

  const time =
    new Date(
      dateValue
    ).getTime()

  if (Number.isNaN(time)) {
    return 'Recently'
  }

  const minutes =
    Math.floor(
      (Date.now() - time) /
        60000
    )

  if (minutes < 1) {
    return 'Just now'
  }

  if (minutes < 60) {
    return `${minutes} minutes ago`
  }

  const hours =
    Math.floor(
      minutes / 60
    )

  if (hours < 24) {
    return `${hours} hours ago`
  }

  const days =
    Math.floor(
      hours / 24
    )

  if (days < 30) {
    return `${days} days ago`
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

const developmentClasses = {
  active:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',

  maintained:
    'bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300',

  stable:
    'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200',

  dormant:
    'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',

  archived:
    'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
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

export default function EngineeringDashboard() {
  const engineering =
    useEngineeringDashboard()

  const current =
    engineering.data
      .currentlyBuilding

  return (
    <>
      <SEO
        title="Live Engineering Dashboard | Devesh Sahu"
        description="Live GitHub commits, repository development status, programming languages, GitHub Actions builds and active development by Devesh Sahu."
        path="/engineering"
      />

      <main className="mx-auto w-full max-w-[1400px] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2.5rem] bg-slate-950 p-6 text-white shadow-2xl sm:p-8 lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Live Engineering Dashboard
              </div>

              <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[0.9] tracking-[-0.065em] sm:text-6xl lg:text-8xl">
                Development activity backed by live data.
              </h1>

              <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-300">
                This dashboard uses GitHub and deployment checks to show current repositories, commits, languages, workflow builds and application health.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={
                  engineering.refresh
                }
                disabled={
                  engineering.status ===
                  'loading'
                }
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950 disabled:opacity-60"
              >
                <FiRefreshCw
                  className={
                    engineering.status ===
                    'loading'
                      ? 'animate-spin'
                      : ''
                  }
                />

                Refresh Data
              </button>

              <Link
                to="/status"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-black"
              >
                <FiServer />
                System Status
              </Link>
            </div>
          </div>

          {engineering.error && (
            <div className="mt-6 rounded-2xl bg-amber-400/10 px-4 py-3 text-sm font-black text-amber-300">
              {engineering.error}
            </div>
          )}
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-[1.75rem] border border-slate-900/10 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900">
            <FiGithub className="text-2xl text-indigo-600 dark:text-cyan-300" />

            <strong className="mt-5 block text-4xl font-black text-slate-950 dark:text-white">
              {
                engineering.data
                  .summary
                  .publicRepositories
              }
            </strong>

            <span className="mt-2 block text-sm font-bold text-slate-500">
              Public repositories
            </span>
          </article>

          <article className="rounded-[1.75rem] border border-slate-900/10 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900">
            <FiActivity className="text-2xl text-emerald-600 dark:text-emerald-300" />

            <strong className="mt-5 block text-4xl font-black text-slate-950 dark:text-white">
              {
                engineering.data
                  .summary
                  .activeRepositories
              }
            </strong>

            <span className="mt-2 block text-sm font-bold text-slate-500">
              Active development
            </span>
          </article>

          <article className="rounded-[1.75rem] border border-slate-900/10 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900">
            <FiGitCommit className="text-2xl text-cyan-600 dark:text-cyan-300" />

            <strong className="mt-5 block text-4xl font-black text-slate-950 dark:text-white">
              {
                engineering.data
                  .summary
                  .commitsLast30Days
              }
            </strong>

            <span className="mt-2 block text-sm font-bold text-slate-500">
              Recent commits
            </span>
          </article>

          <article className="rounded-[1.75rem] border border-slate-900/10 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900">
            <FiCheckCircle className="text-2xl text-indigo-600 dark:text-indigo-300" />

            <strong className="mt-5 block text-4xl font-black text-slate-950 dark:text-white">
              {
                engineering.data
                  .summary
                  .passingBuilds
              }
            </strong>

            <span className="mt-2 block text-sm font-bold text-slate-500">
              Passing workflows
            </span>
          </article>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-[2rem] border border-slate-900/10 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900 lg:p-8">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
              Currently Building
            </span>

            {current ? (
              <>
                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                      {current.name}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
                      {
                        current.description ||
                        'Active GitHub repository.'
                      }
                    </p>
                  </div>

                  <FiCode className="shrink-0 text-4xl text-indigo-600 dark:text-cyan-300" />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                    {
                      current
                        .developmentStatus
                        .label
                    }
                  </span>

                  <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-700 dark:bg-white/5 dark:text-slate-300">
                    {
                      current.primaryLanguage
                    }
                  </span>

                  <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-black text-slate-700 dark:bg-white/5 dark:text-slate-300">
                    {
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
                    className="mt-6 block rounded-[1.5rem] bg-slate-50 p-5 dark:bg-white/5"
                  >
                    <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                      Latest Commit
                    </span>

                    <strong className="mt-3 block text-base font-black leading-7 text-slate-950 dark:text-white">
                      {
                        current
                          .latestCommit
                          .message
                      }
                    </strong>

                    <small className="mt-2 block text-xs font-bold text-slate-500">
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
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white dark:bg-white dark:text-slate-950"
                >
                  Open Repository
                  <FiExternalLink />
                </a>
              </>
            ) : (
              <p className="mt-5 font-bold text-slate-500">
                GitHub data is syncing.
              </p>
            )}
          </article>

          <article className="rounded-[2rem] border border-slate-900/10 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900 lg:p-8">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
              Language Analytics
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              Repository language usage
            </h2>

            <div className="mt-7 grid gap-5">
              {engineering.data.topLanguages.map(
                (language) => (
                  <div key={language.name}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <strong className="block text-sm font-black text-slate-950 dark:text-white">
                          {language.name}
                        </strong>

                        <span className="mt-1 block text-xs font-bold text-slate-500">
                          Used in {language.repositoryCount} repositories
                        </span>
                      </div>

                      <strong className="text-sm font-black text-indigo-600 dark:text-cyan-300">
                        {language.percentage}%
                      </strong>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-cyan-400"
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

              {engineering.data.topLanguages
                .length === 0 && (
                <p className="font-bold text-slate-500">
                  Language data is syncing.
                </p>
              )}
            </div>
          </article>
        </section>

        <section className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
                Recent Development
              </span>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                Latest GitHub commits
              </h2>
            </div>

            <a
              href={
                engineering.data
                  .profileUrl
              }
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-cyan-300"
            >
              Open GitHub
              <FiExternalLink />
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900">
            {engineering.data.recentCommits.map(
              (commit) => (
                <a
                  key={commit.sha}
                  href={commit.url}
                  target="_blank"
                  rel="noreferrer"
                  className="grid gap-4 border-b border-slate-900/5 p-5 transition last:border-b-0 hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5 sm:grid-cols-[auto_minmax(0,1fr)_auto]"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                    <FiGitCommit />
                  </div>

                  <div className="min-w-0">
                    <strong className="block text-sm font-black leading-6 text-slate-950 dark:text-white">
                      {commit.message}
                    </strong>

                    <span className="mt-2 block text-xs font-bold text-slate-500">
                      {commit.repositoryName} / {commit.branch} / {commit.shortSha}
                    </span>
                  </div>

                  <time className="text-xs font-black text-slate-400">
                    {
                      formatRelativeTime(
                        commit.createdAt
                      )
                    }
                  </time>
                </a>
              )
            )}

            {engineering.data.recentCommits
              .length === 0 && (
              <p className="p-6 font-bold text-slate-500">
                Commit data is syncing.
              </p>
            )}
          </div>
        </section>

        <section className="mt-8">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
              Repository Health
            </span>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
              Development and build status
            </h2>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {engineering.data.repositories.map(
              (repository) => {
                const development =
                  repository
                    .developmentStatus

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
                  <article
                    key={
                      repository.fullName
                    }
                    className="rounded-[2rem] border border-slate-900/10 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate text-xl font-black text-slate-950 dark:text-white">
                          {
                            repository.name
                          }
                        </h3>

                        <span className="mt-2 block text-xs font-bold text-slate-500">
                          {
                            repository
                              .primaryLanguage
                          } / {
                            repository
                              .defaultBranch
                          }
                        </span>
                      </div>

                      <FiGithub className="shrink-0 text-2xl text-indigo-600 dark:text-cyan-300" />
                    </div>

                    <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm font-semibold leading-6 text-slate-600 dark:text-slate-300">
                      {
                        repository.description ||
                        'GitHub repository.'
                      }
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${
                          developmentClasses[
                            development.state
                          ] ||
                          developmentClasses
                            .stable
                        }`}
                      >
                        <FiClock />
                        {development.label}
                      </span>

                      <a
                        href={
                          build.url ||
                          repository.url
                        }
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${
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
                      </a>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2 rounded-[1.25rem] bg-slate-50 p-3 text-center dark:bg-white/5">
                      <div>
                        <FiStar className="mx-auto text-slate-400" />

                        <strong className="mt-1 block text-sm font-black text-slate-950 dark:text-white">
                          {repository.stars}
                        </strong>
                      </div>

                      <div>
                        <FiGitBranch className="mx-auto text-slate-400" />

                        <strong className="mt-1 block text-sm font-black text-slate-950 dark:text-white">
                          {repository.forks}
                        </strong>
                      </div>

                      <div>
                        <FiActivity className="mx-auto text-slate-400" />

                        <strong className="mt-1 block text-sm font-black text-slate-950 dark:text-white">
                          {repository.openIssues}
                        </strong>
                      </div>
                    </div>

                    <a
                      href={repository.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-cyan-300"
                    >
                      Repository
                      <FiExternalLink />
                    </a>
                  </article>
                )
              }
            )}
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-5 rounded-[2rem] bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between lg:p-8">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
              Deployment Monitoring
            </span>

            <h2 className="mt-3 text-3xl font-black">
              Check current service health.
            </h2>
          </div>

          <Link
            to="/status"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950"
          >
            Open Status Page
            <FiArrowRight />
          </Link>
        </section>
      </main>
    </>
  )
}