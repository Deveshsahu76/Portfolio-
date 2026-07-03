import React from 'react'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

const socials = [
  { label: 'GitHub', href: 'https://github.com/Deveshsahu76', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/devesh-sahu-560608270/', icon: FaLinkedin },
  { label: 'Email', href: 'mailto:deveshsahu567@gmail.com', icon: FaEnvelope },
]

export default function SocialRail() {
  return (
    <aside className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={label}
          className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-900/10 bg-white/70 text-slate-600 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:scale-105 hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
        >
          <Icon />
        </a>
      ))}
    </aside>
  )
}