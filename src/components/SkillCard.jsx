import React from 'react'
import { motion } from 'framer-motion'

export default function SkillCard({skill, level}){
  return (
    <motion.div whileHover={{y:-6}} className="glass p-4 rounded-3xl w-full">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{skill}</div>
          <div className="text-sm text-slate-400">{level}%</div>
        </div>
        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent" style={{width:`${level}%`}} />
        </div>
      </div>
    </motion.div>
  )
}
