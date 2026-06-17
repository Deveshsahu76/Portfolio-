import React from 'react'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'

export default function Projects(){
  return (
    <div className="pt-24">
      <h1 className="text-3xl md:text-4xl font-bold">Projects</h1>
      <p className="text-slate-400 mt-2 max-w-3xl">Selected projects showcasing full-stack abilities and product thinking.</p>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(p=> (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}
