import React from 'react'
import { motion } from 'framer-motion'

export default function SkillCard({skill, level}){
  return (
    <motion.div whileHover={{y:-6}} className="glass p-4 rounded-lg w-full md:w-1/3">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{skill}</div>
        <div className="text-sm text-slate-400">{level}%</div>
      </div>
      <div className="h-2 bg-white/5 rounded-full mt-3 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent" style={{width:`${level}%`}} />
      </div>
    </motion.div>
  )
}
