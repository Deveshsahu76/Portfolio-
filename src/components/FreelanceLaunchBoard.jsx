import React, { useState } from 'react'
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiDollarSign,
  FiPackage,
  FiTarget,
} from 'react-icons/fi'

export default function FreelanceLaunchBoard({
  services = [],
  packages = [],
}) {
  const [serviceIndex, setServiceIndex] = useState(0)
  const [packageIndex, setPackageIndex] = useState(1)

  if (!services.length || !packages.length) return null

  const service = services[serviceIndex % services.length]
  const projectPackage = packages[packageIndex % packages.length]
  const ServiceIcon = service.icon || FiCode

  return (
    <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/30 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-violet-300">
              <FiTarget />
              Project Launch Board
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-5xl">
              Choose the service, package and next step.
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-400 sm:text-base">
              Select a suitable starting option before sharing detailed project
              requirements.
            </p>
          </div>

          <a
            href="#project-request"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-violet-400 px-5 text-sm font-black text-slate-950"
          >
            Start Project
            <FiArrowRight />
          </a>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              01 · Select Service
            </span>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((item, index) => {
                const Icon = item.icon || FiCode
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setServiceIndex(index)}
                    className={`flex min-h-14 items-center gap-3 rounded-xl border p-4 text-left text-sm font-black ${
                      serviceIndex === index
                        ? 'border-violet-300/40 bg-violet-300/10 text-white'
                        : 'border-white/10 bg-white/[0.025] text-slate-400'
                    }`}
                  >
                    <Icon className="shrink-0 text-violet-300" />
                    {item.title}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 rounded-[1.2rem] bg-violet-300/[0.06] p-5">
              <ServiceIcon className="text-2xl text-violet-300" />
              <h3 className="mt-3 text-2xl font-black text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-400">
                {service.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(service.features || []).map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-black text-slate-300"
                  >
                    <FiCheckCircle className="text-emerald-300" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              02 · Select Package
t-slate-500">
              01 · Select Service
            </span>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((item, index) => {
                const Icon = item.icon || FiCode
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setServiceIndex(index)}
                    className={`flex min-h-14 items-center gap-3 rounded-xl border p-4 text-left text-sm font-black ${
                      serviceIndex === index
                        ? 'border-violet-300/40 bg-violet-300/10 text-white'
                        : 'border-white/10 bg-white/[0.025] text-slate-400'
                    }`}
                  >
                    <Icon className="shrink-0 text-violet-300" />
                    {item.title}
                  </button>
                )
              })}
            </div>

            <div className="mt-4 rounded-[1.2rem] bg-violet-300/[0.06] p-5">
              <ServiceIcon className="text-2xl text-violet-300" />
              <h3 className="mt-3 text-2xl font-black text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-400">
                {service.desc}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(service.features || []).map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-black text-slate-300"
                  >
                    <FiCheckCircle className="text-emerald-300" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
              02 · Select Package
            </span>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {packages.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setPackageIndex(index)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black ${
                    packageIndex === index
                      ? 'border-transparent bg-violet-400 text-slate-950'
                      : 'border-white/10 bg-white/[0.025] text-slate-400'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-[1.2rem] border border-violet-300/15 bg-violet-300/[0.06] p-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-violet-300">
                <FiPackage />
                {projectPackage.popular ? 'Popular Selection' : 'Project Package'}
              </div>
              <h3 className="mt-3 text-3xl font-black text-white">
                {projectPackage.name}
              </h3>
              <strong className="mt-2 block text-2xl font-black text-emerald-300">
                {projectPackage.price}
              </strong>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-400">
                {projectPackage.bestFor}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm font-black text-slate-300">
                <FiClock className="text-amber-300" />
                {projectPackage.timeline}
              </div>
              <div className="mt-5 grid gap-3">
                {(projectPackage.points || []).map((point) => (
                  <span
                    key={point}
                    className="flex items-start gap-2 text-sm font-bold text-slate-300"
                  >
                    <FiCheckCircle className="mt-1 shrink-0 text-emerald-300" />
                    {point}
                  </span>
                ))}
              </div>
              <a
                href="#project-request"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-violet-400 px-5 text-sm font-black text-slate-950"
              >
                Send Requirements
              </a>
            </div>

            <div className="mt-4 flex items-start gap-3 rounded-xl bg-white/[0.025] p-4 text-xs font-bold leading-5 text-slate-500">
              <FiDollarSign className="mt-0.5 shrink-0 text-amber-300" />
              Final scope, price and delivery time depend on features and
              integrations.
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
