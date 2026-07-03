import React from 'react'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

export default function Projects() {
  return (
    <section className="section-container">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-600 dark:text-violet-300">
          Projects
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Selected Projects
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
          Full-stack projects focused on authentication, dashboards, APIs, responsive UI and real-world workflows.
        </p>
      </div>

      <div className="grid gap-7 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
