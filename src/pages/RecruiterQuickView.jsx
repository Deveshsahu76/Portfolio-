import React from 'react'
import { Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiCode,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPrinter,
  FiUser,
} from 'react-icons/fi'
import SEO from '../components/SEO'
import ResumeLink from '../components/ResumeLink'
import LiveLeetCodeStat from '../components/LiveLeetCodeStat'
import InterviewBookingForm from '../components/InterviewBookingForm'
import useAvailability from '../hooks/useAvailability'
import useGitHubOverview from '../hooks/useGitHubOverview'
import useResumeUrl from '../hooks/useResumeUrl'
import projects from '../data/projects'

const skills = [
  'React.js',
  'JavaScript',
  'Node.js',
  'Express.js',
  'MongoDB',
  'REST APIs',
  'JWT Authentication',
  'Git and GitHub',
  'Responsive UI',
  'Vercel and Render',
]

const roleMatches = [
  'Software Development Intern',
  'MERN Stack Developer Intern',
  'Full Stack Developer Intern',
  'Frontend Developer Intern',
  'Backend Developer Intern',
]

const getAvailableFor = (
  availability
) => {
  const items = []

  if (availability.internship) {
    items.push('Internship')
  }

  if (availability.freelance) {
    items.push('Freelance')
  }

  if (availability.interview) {
    items.push('Interview')
  }

  return items
}

export default function RecruiterQuickView() {
  const availability =
    useAvailability()

  const github =
    useGitHubOverview()

  const resume =
    useResumeUrl()

  const featuredProjects =
    projects.slice(0, 3)

  const availableFor =
    getAvailableFor(
      availability.data
    )

  const printPage = () => {
    window.print()
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',

    mainEntity: {
      '@type': 'Person',
      name: 'Devesh Sahu',

      jobTitle:
        'MERN Stack Developer',

      email:
        'mailto:deveshsahu567@gmail.com',

      url:
        'https://deveshsahuportfolio.vercel.app/recruiter/quick-view',

      sameAs: [
        'https://github.com/Deveshsahu76',
        'https://www.linkedin.com/in/devesh-sahu-560608270/',
        'https://leetcode.com/u/deveshsahu567/',
      ],
    },
  }

  return (
    <>
      <SEO
        title="60-Second Recruiter Profile | Devesh Sahu"
        description="Review Devesh Sahu's MERN skills, projects, coding profiles, education, resume and availability in one recruiter-focused page."
        path="/recruiter/quick-view"
        schema={schema}
      />

      <main className="recruiter60-page mx-auto w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[2.5rem] border border-slate-900/10 bg-white/90 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                <span className="interview-live-dot" />
                60-Second Recruiter View
              </div>

              <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                Devesh Sahu
              </h1>

              <p className="mt-4 text-xl font-black text-indigo-600 dark:text-cyan-300">
                MERN Stack Developer
              </p>

              <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 dark:text-slate-300">
                B.Tech Information Technology student building responsive, deployable full-stack applications with React, Node.js, Express, MongoDB, REST APIs and authentication.
              </p>
            </div>

            <div className="recruiter60-no-print flex flex-wrap gap-3">
              <button
                type="button"
                onClick={printPage}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-900/10 bg-white px-5 py-3 text-sm font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <FiPrinter />
                Print Profile
              </button>

              <ResumeLink
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                downloadSource="recruiter-60-second-view"
              >
                <FiDownload />
                Resume v{resume.version}
              </ResumeLink>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <LiveLeetCodeStat
              className="relative min-h-32 overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5"
              label="LeetCode Solved"
              fallback={127}
            />

            <div className="rounded-[1.5rem] border border-slate-900/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
              <FiGithub className="text-xl text-indigo-600 dark:text-cyan-300" />

              <strong className="mt-4 block text-3xl font-black text-slate-950 dark:text-white">
                {github.data.publicRepositories}
              </strong>

              <span className="mt-1 block text-sm font-bold text-slate-500 dark:text-slate-400">
                Public Repositories
              </span>
            </div>

            <div className="rounded-[1.5rem] border border-slate-900/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
              <FiCode className="text-xl text-indigo-600 dark:text-cyan-300" />

              <strong className="mt-4 block text-3xl font-black text-slate-950 dark:text-white">
                {projects.length}+
              </strong>

              <span className="mt-1 block text-sm font-bold text-slate-500 dark:text-slate-400">
                Detailed Projects
              </span>
            </div>

            <div className="rounded-[1.5rem] border border-slate-900/10 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
              <FiUser className="text-xl text-indigo-600 dark:text-cyan-300" />

              <strong className="mt-4 block text-3xl font-black text-slate-950 dark:text-white">
                2027
              </strong>

              <span className="mt-1 block text-sm font-bold text-slate-500 dark:text-slate-400">
                Graduation Batch
              </span>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2rem] border border-slate-900/10 bg-white/90 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/75">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
              Candidate Summary
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              What I can contribute
            </h2>

            <div className="mt-6 grid gap-3">
              {[
                'Build responsive React interfaces',
                'Develop Node.js and Express REST APIs',
                'Design MongoDB schemas and CRUD flows',
                'Implement JWT authentication',
                'Debug frontend and backend issues',
                'Deploy applications on Vercel and Render',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-white/5"
                >
                  <FiCheckCircle className="mt-1 shrink-0 text-emerald-500" />

                  <span className="text-sm font-bold leading-6 text-slate-700 dark:text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-900/10 bg-white/90 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/75">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
              Live Availability
            </span>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
              <span className="interview-live-dot" />
              {availability.data.statusLabel}
            </div>

            <div className="mt-5 grid gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Available For
                </span>

                <strong className="mt-1 block text-base font-black text-slate-950 dark:text-white">
                  {availableFor.join(', ') || 'Not Available'}
                </strong>
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Joining
                </span>

                <strong className="mt-1 block text-base font-black text-slate-950 dark:text-white">
                  {availability.data.joiningTime}
                </strong>
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Work Mode
                </span>

                <strong className="mt-1 block text-base font-black text-slate-950 dark:text-white">
                  {availability.data.workModes.join(' / ')}
                </strong>
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                  Location
                </span>

                <strong className="mt-1 flex items-center gap-2 text-base font-black text-slate-950 dark:text-white">
                  <FiMapPin />
                  {availability.data.location}
                </strong>
              </div>
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-900/10 bg-white/90 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/75">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
            Technical Skills
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Primary development toolkit
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-50 px-4 py-2 text-sm font-black text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <FiCode className="text-indigo-600 dark:text-cyan-300" />
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
              Project Proof
            </span>

            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white">
              Three projects to review first
            </h2>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900"
              >
                <div className="h-52 bg-slate-100 dark:bg-slate-950">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-black text-slate-950 dark:text-white">
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm font-semibold leading-7 text-slate-600 dark:text-slate-300">
                    {project.description}
                  </p>

                  <Link
                    to={`/projects/${project.id}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-cyan-300"
                  >
                    View Case Study
                    <FiArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-slate-900/10 bg-white/90 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/75">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
              Education
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              Academic profile
            </h2>

            <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5 dark:bg-white/5">
              <strong className="block text-lg font-black text-slate-950 dark:text-white">
                B.Tech Information Technology
              </strong>

              <span className="mt-2 block text-sm font-bold text-slate-600 dark:text-slate-300">
                Kanpur Institute of Technology
              </span>

              <small className="mt-2 block text-sm font-bold text-slate-500">
                2023 - 2027
              </small>
            </div>
          </article>

          <article className="rounded-[2rem] border border-slate-900/10 bg-white/90 p-6 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-slate-900/75">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-300">
              Best Role Matches
            </span>

            <div className="mt-5 grid gap-3">
              {roleMatches.map((role) => (
                <div
                  key={role}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-white/5"
                >
                  <FiBriefcase className="shrink-0 text-indigo-600 dark:text-cyan-300" />

                  <span className="text-sm font-black text-slate-700 dark:text-slate-200">
                    {role}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section
          id="schedule-interview"
          className="recruiter60-no-print mt-8"
        >
          <InterviewBookingForm />
        </section>

        <section className="mt-6 rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                Direct Contact
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-tight">
                Discuss a development opportunity
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:deveshsahu567@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-slate-950"
              >
                <FiMail />
                Email
              </a>

              <a
                href="tel:+917607997416"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white"
              >
                <FiPhone />
                Call
              </a>

              <a
                href="https://github.com/Deveshsahu76"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white"
              >
                <FiGithub />
                GitHub
                <FiExternalLink />
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}