import React from 'react'
import {
  Link,
} from 'react-router-dom'
import {
  FiActivity,
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiExternalLink,
  FiRefreshCw,
  FiServer,
  FiXCircle,
  FiZap,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import useSystemStatus from '../hooks/useSystemStatus'

const formatDate = (
  dateValue
) => {
  if (!dateValue) {
    return 'Checking now'
  }

  try {
    return new Intl.DateTimeFormat(
      'en-IN',
      {
        dateStyle: 'medium',
        timeStyle: 'medium',
      }
    ).format(
      new Date(dateValue)
    )
  } catch {
    return 'Recently'
  }
}

const statusContent = {
  operational: {
    title:
      'All monitored services are operational',

    description:
      'The portfolio and monitored projects are currently reachable.',

    classes:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300',
  },

  degraded: {
    title:
      'Some services are degraded',

    description:
      'Services are reachable, but one or more returned a warning response.',

    classes:
      'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300',
  },

  'partial-outage': {
    title:
      'Partial service outage',

    description:
      'At least one monitored service is currently unavailable.',

    classes:
      'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
  },

  'major-outage': {
    title:
      'Major service outage',

    description:
      'The monitoring API could not reach the configured services.',

    classes:
      'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300',
  },

  loading: {
    title:
      'Checking live services',

    description:
      'The latest deployment snapshot is loading.',

    classes:
      'bg-indigo-50 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300',
  },
}

export default function SystemStatus() {
  const system =
    useSystemStatus()

  const overall =
    statusContent[
      system.data.overallState
    ] ||
    statusContent.loading

  return (
    <>
      <SEO
        title="System Status | Devesh Sahu Portfolio"
        description="Current availability and response-time snapshot for Devesh Sahu's portfolio and deployed projects."
        path="/status"
      />

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <section className="rounded-[2.5rem] border border-slate-900/10 bg-white p-6 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link
                to="/engineering"
                className="inline-flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-cyan-300"
              >
                <FiArrowLeft />
                Engineering Dashboard
              </Link>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-700 dark:bg-white/5 dark:text-slate-300">
                <FiActivity />
                Current System Status
              </div>

              <h1 className="mt-5 text-4xl font-black leading-none tracking-[-0.055em] text-slate-950 dark:text-white sm:text-6xl">
                Deployment health snapshot
              </h1>

              <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
                Live availability and response-time checks for the portfolio and selected deployed applications.
              </p>
            </div>

            <button
              type="button"
              onClick={system.refresh}
              disabled={
                system.status ===
                'loading'
              }
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white disabled:opacity-60 dark:bg-white dark:text-slate-950"
            >
              <FiRefreshCw
                className={
                  system.status ===
                  'loading'
                    ? 'animate-spin'
                    : ''
                }
              />

              Refresh Status
            </button>
          </div>

          <div
            className={`mt-8 rounded-[1.75rem] p-5 ${overall.classes}`}
          >
            <div className="flex items-start gap-4">
              {system.data.overallState ===
              'operational' ? (
                <FiCheckCircle className="mt-1 shrink-0 text-2xl" />
              ) : system.data.overallState ===
                  'loading' ? (
                <FiActivity className="mt-1 shrink-0 animate-pulse text-2xl" />
              ) : (
                <FiXCircle className="mt-1 shrink-0 text-2xl" />
              )}

              <div>
                <strong className="block text-lg font-black">
                  {overall.title}
                </strong>

                <p className="mt-2 text-sm font-bold leading-6 opacity-80">
                  {overall.description}
                </p>
              </div>
            </div>
          </div>

          {system.error && (
            <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm font-black text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
              {system.error}
            </div>
          )}
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-[1.75rem] border border-slate-900/10 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900">
            <FiServer className="text-2xl text-indigo-600 dark:text-cyan-300" />

            <strong className="mt-4 block text-4xl font-black text-slate-950 dark:text-white">
              {system.data.totalServices}
            </strong>

            <span className="mt-1 block text-sm font-bold text-slate-500">
              Monitored services
            </span>
          </article>

          <article className="rounded-[1.75rem] border border-slate-900/10 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900">
            <FiCheckCircle className="text-2xl text-emerald-600 dark:text-emerald-300" />

            <strong className="mt-4 block text-4xl font-black text-slate-950 dark:text-white">
              {system.data.onlineServices}
            </strong>

            <span className="mt-1 block text-sm font-bold text-slate-500">
              Reachable services
            </span>
          </article>

          <article className="rounded-[1.75rem] border border-slate-900/10 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900">
            <FiZap className="text-2xl text-cyan-600 dark:text-cyan-300" />

            <strong className="mt-4 block text-4xl font-black text-slate-950 dark:text-white">
              {
                system.data
                  .averageResponseTimeMs
              }ms
            </strong>

            <span className="mt-1 block text-sm font-bold text-slate-500">
              Average response
            </span>
          </article>

          <article className="rounded-[1.75rem] border border-slate-900/10 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900">
            <FiClock className="text-2xl text-amber-600 dark:text-amber-300" />

            <strong className="mt-4 block text-base font-black leading-6 text-slate-950 dark:text-white">
              {
                formatDate(
                  system.data.checkedAt
                )
              }
            </strong>

            <span className="mt-1 block text-sm font-bold text-slate-500">
              Last checked
            </span>
          </article>
        </section>

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          {system.data.services.map(
            (service) => {
              const online =
                service.online

              const degraded =
                service.state ===
                'degraded'

              return (
                <article
                  key={service.id}
                  className="rounded-[2rem] border border-slate-900/10 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${
                          !online
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300'
                            : degraded
                              ? 'bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300'
                              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300'
                        }`}
                      >
                        {online ? (
                          <FiCheckCircle />
                        ) : (
                          <FiXCircle />
                        )}
                      </div>

                      <div>
                        <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                          {service.service}
                        </span>

                        <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                          {service.name}
                        </h2>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-2 text-xs font-black ${
                        !online
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300'
                          : degraded
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300'
                      }`}
                    >
                      {
                        !online
                          ? 'OFFLINE'
                          : degraded
                            ? 'DEGRADED'
                            : 'ONLINE'
                      }
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 rounded-[1.25rem] bg-slate-50 p-4 dark:bg-white/5">
                    <div>
                      <span className="block text-xs font-black uppercase tracking-wide text-slate-400">
                        Response
                      </span>

                      <strong className="mt-1 block text-lg font-black text-slate-950 dark:text-white">
                        {
                          service.responseTimeMs
                        }ms
                      </strong>
                    </div>

                    <div>
                      <span className="block text-xs font-black uppercase tracking-wide text-slate-400">
                        HTTP Status
                      </span>

                      <strong className="mt-1 block text-lg font-black text-slate-950 dark:text-white">
                        {
                          service.httpStatus ||
                          'N/A'
                        }
                      </strong>
                    </div>
                  </div>

                  {service.error && (
                    <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 dark:bg-rose-400/10 dark:text-rose-300">
                      {service.error}
                    </p>
                  )}

                  <a
                    href={service.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-cyan-300"
                  >
                    Open Service
                    <FiExternalLink />
                  </a>
                </article>
              )
            }
          )}

          {system.data.services.length ===
            0 && (
            <div className="rounded-[2rem] border border-slate-900/10 bg-white p-8 text-center font-black text-slate-500 dark:border-white/10 dark:bg-slate-900">
              Service checks are loading.
            </div>
          )}
        </section>

        <section className="mt-6 rounded-[1.75rem] border border-amber-500/20 bg-amber-50 p-5 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300">
          <strong className="block text-sm font-black">
            Monitoring information
          </strong>

          <p className="mt-2 text-sm font-bold leading-6">
            This page shows the latest reachability snapshot. It does not claim historical uptime or service-level guarantees.
          </p>
        </section>
      </main>
    </>
  )
}