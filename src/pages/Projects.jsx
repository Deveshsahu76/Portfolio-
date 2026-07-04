import React from 'react'
import { FiExternalLink } from 'react-icons/fi'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  return (
    <main className="section-container">
      <section className="mb-10">
        <div className="badge mb-5">Project Portfolio</div>
        <h1 className="page-title">
          Practical projects with <span className="gradient-text">live proof.</span>
        </h1>
        <p className="page-subtitle mt-6 max-w-3xl">
          These projects cover frontend UI, backend APIs, database models, authentication, deployment and real product flows.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id || project.title} project={project} />
        ))}
      </section>

      <section className="soft-card mt-12 rounded-[2rem] p-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-950 dark:text-white">Want to review my code?</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              GitHub contains project code, commits and deployment-ready structure.
            </p>
          </div>
          <a href="https://github.com/Deveshsahu76" target="_blank" rel="noreferrer" className="btn-primary">
            Open GitHub <FiExternalLink />
          </a>
        </div>
      </section>
    </main>
  )
}