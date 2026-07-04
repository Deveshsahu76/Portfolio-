import React, { useEffect, useState } from 'react'
import { FiCode, FiDatabase, FiEye, FiKey, FiPlayCircle, FiServer, FiX } from 'react-icons/fi'

const tabs = [
  { id: 'overview', label: 'Overview', icon: FiEye },
  { id: 'architecture', label: 'Architecture', icon: FiServer },
  { id: 'api', label: 'APIs', icon: FiCode },
  { id: 'database', label: 'Database', icon: FiDatabase },
  { id: 'credentials', label: 'Access', icon: FiKey },
]

export default function ProjectDetailsModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!project) return null

  const screenshots = project.images?.length ? project.images : project.image ? [project.image] : []

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xl">
      <div className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl dark:bg-slate-950">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-white shadow-lg transition hover:scale-105 dark:bg-white dark:text-slate-950"
          aria-label="Close project details"
        >
          <FiX size={20} />
        </button>

        <div className="max-h-[92vh] overflow-y-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 p-6 text-white sm:p-8">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/20 px-4 py-1 text-xs font-black uppercase tracking-[0.2em]">
                  {project.type}
                </span>
                <span className="rounded-full bg-emerald-400/25 px-4 py-1 text-xs font-black uppercase tracking-[0.2em]">
                  {project.status}
                </span>
              </div>

              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">{project.title}</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/85">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="btn-secondary bg-white text-slate-950">
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary bg-white/15 text-white">
                    GitHub Repo
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="border-b border-slate-900/10 bg-slate-50 p-3 dark:border-white/10 dark:bg-slate-900">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition ${
                    activeTab === id
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'bg-white text-slate-600 hover:text-slate-950 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  <Icon />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-8">
            {activeTab === 'overview' && (
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <h3 className="text-2xl font-black text-slate-950 dark:text-white">Project Overview</h3>
                  <p className="mt-3 leading-8 text-slate-600 dark:text-slate-400">{project.longDescription || project.description}</p>

                  <h4 className="mt-7 text-xl font-black text-slate-950 dark:text-white">Key Features</h4>
                  <ul className="mt-4 space-y-3 text-slate-700 dark:text-slate-300">
                    {project.features?.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="mt-7 text-xl font-black text-slate-950 dark:text-white">Tech Stack</h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech?.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-slate-900/10 bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.7rem] border border-slate-900/10 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                    <FiPlayCircle />
                    Demo Video
                  </div>

                  {project.demoVideo ? (
                    <a
                      href={project.demoVideo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-[230px] items-center justify-center rounded-[1.4rem] bg-slate-950 text-center text-white transition hover:scale-[1.01]"
                    >
                      <span>
                        <FiPlayCircle className="mx-auto mb-3 text-5xl" />
                        <span className="font-black">Watch Project Walkthrough</span>
                      </span>
                    </a>
                  ) : (
                    <div className="flex min-h-[230px] items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500 text-center text-white">
                      <span>
                        <FiPlayCircle className="mx-auto mb-3 text-5xl" />
                        <span className="block font-black">Demo video coming soon</span>
                        <span className="mt-2 block text-sm text-white/80">Add Loom / YouTube / Drive link later</span>
                      </span>
                    </div>
                  )}
                </div>

                {screenshots.length > 0 && (
                  <div className="lg:col-span-2">
                    <h4 className="text-xl font-black text-slate-950 dark:text-white">Screenshots</h4>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {screenshots.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="h-64 w-full rounded-[1.5rem] border border-slate-900/10 object-cover object-top shadow-lg dark:border-white/10"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'architecture' && (
              <div>
                <h3 className="text-2xl font-black text-slate-950 dark:text-white">Architecture Diagram</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  High-level flow of how frontend, backend, authentication and database communicate.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-5">
                  {project.architecture?.map((item, index) => (
                    <div key={item} className="relative">
                      <div className="rounded-[1.5rem] border border-slate-900/10 bg-slate-50 p-5 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
                        <p className="text-sm font-black uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
                          Step {index + 1}
                        </p>
                        <p className="mt-3 font-black text-slate-950 dark:text-white">{item}</p>
                      </div>
                      {index < project.architecture.length - 1 && (
                        <div className="hidden md:block absolute -right-3 top-1/2 h-1 w-6 rounded-full bg-violet-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div>
                <h3 className="text-2xl font-black text-slate-950 dark:text-white">API Documentation</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  Important backend endpoints used in this project.
                </p>

                <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-900/10 dark:border-white/10">
                  <div className="grid grid-cols-[90px_1fr_1.4fr] bg-slate-950 px-4 py-3 text-sm font-black text-white">
                    <span>Method</span>
                    <span>Endpoint</span>
                    <span>Description</span>
                  </div>

                  {project.apiDocs?.map((api) => (
                    <div
                      key={`${api.method}-${api.endpoint}`}
                      className="grid grid-cols-[90px_1fr_1.4fr] border-t border-slate-900/10 px-4 py-3 text-sm dark:border-white/10"
                    >
                      <span className="font-black text-violet-600 dark:text-violet-300">{api.method}</span>
                      <code className="break-all font-bold text-slate-800 dark:text-slate-200">{api.endpoint}</code>
                      <span className="text-slate-600 dark:text-slate-400">{api.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div>
                <h3 className="text-2xl font-black text-slate-950 dark:text-white">Database Schema</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  Main collections/models used in this project.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {project.schema?.map((model) => (
                    <div key={model.name} className="rounded-[1.5rem] border border-slate-900/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                      <h4 className="font-black text-slate-950 dark:text-white">{model.name}</h4>
                      <div className="mt-4 space-y-2">
                        {model.fields.map((field) => (
                          <div key={field} className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                            {field}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'credentials' && (
              <div>
                <h3 className="text-2xl font-black text-slate-950 dark:text-white">Demo Access</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  Safe demo credentials or access notes for recruiters.
                </p>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {project.credentials?.map((cred) => (
                    <div key={cred.role} className="rounded-[1.5rem] border border-slate-900/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                      <h4 className="font-black text-slate-950 dark:text-white">{cred.role}</h4>
                      {cred.email && <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Email: <span className="font-black">{cred.email}</span></p>}
                      {cred.password && <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Password: <span className="font-black">{cred.password}</span></p>}
                      {cred.note && <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{cred.note}</p>}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-amber-500/20 bg-amber-500/10 p-5 text-sm font-bold text-amber-800 dark:text-amber-200">
                  Do not add real private admin credentials. Use only demo accounts or write “Admin access available on request.”
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}