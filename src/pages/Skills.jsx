import React from 'react'
import skills from '../data/skills'
import SkillCard from '../components/SkillCard'

export default function Skills(){
  return (
    <div className="pt-24">
      <h1 className="text-3xl md:text-4xl font-bold">Skills</h1>
      <p className="text-slate-400 mt-2 max-w-3xl">Languages, frameworks and tools I use regularly.</p>

      <section className="mt-6 grid gap-6">
        <div>
          <h2 className="text-xl font-semibold">Languages</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-4">
            {skills.languages.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Frontend</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-4">
            {skills.frontend.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Backend</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-4">
            {skills.backend.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Databases</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-4">
            {skills.databases.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Tools</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 mt-4">
            {skills.tools.map(s=> <SkillCard key={s.name} skill={s.name} level={s.level} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
