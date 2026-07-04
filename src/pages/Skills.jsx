import React from 'react'
import { FiCode, FiDatabase, FiGitBranch, FiServer, FiTool } from 'react-icons/fi'

const groups = [
  {
    icon: FiCode,
    title: 'Frontend',
    skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    icon: FiServer,
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Middleware', 'MVC Structure'],
  },
  {
    icon: FiDatabase,
    title: 'Database',
    skills: ['MongoDB', 'Mongoose', 'MySQL', 'Schemas', 'CRUD', 'Data Modeling'],
  },
  {
    icon: FiGitBranch,
    title: 'Tools',
    skills: ['Git', 'GitHub', 'Vercel', 'Render', 'Postman', 'VS Code'],
  },
  {
    icon: FiTool,
    title: 'Core',
    skills: ['C++', 'DSA', 'Problem Solving', 'Debugging', 'Deployment', 'API Integration'],
  },
]

export default function Skills() {
  return (
    <main className="section-container">
      <section className="mb-10">
        <div className="badge mb-5">Skill System</div>
        <h1 className="page-title">
          Skills arranged like a <span className="gradient-text">full-stack toolkit.</span>
        </h1>
        <p className="page-subtitle mt-6 max-w-3xl">
          My skill set is focused on building complete MERN applications from UI to API to database and deployment.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {groups.map(({ icon: Icon, title, skills }) => (
          <div key={title} className="soft-card hover-lift rounded-[2rem] p-7">
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-slate-950 text-2xl text-white dark:bg-white dark:text-slate-950">
              <Icon />
            </div>
            <h2 className="text-2xl font-black text-slate-950 dark:text-white">{title}</h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}