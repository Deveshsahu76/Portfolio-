import React, {useEffect, useState} from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle(){
  const [dark, setDark] = useState(() => {
    if(typeof window === 'undefined') return true
    try{
      const stored = localStorage.getItem('theme')
      if(stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }catch(e){return true}
  })

  useEffect(()=>{
    const root = document.documentElement
    if(dark){
      root.classList.add('dark')
      root.classList.remove('light')
      localStorage.setItem('theme','dark')
    }else{
      root.classList.remove('dark')
      root.classList.add('light')
      localStorage.setItem('theme','light')
    }
  },[dark])

  return (
    <button onClick={()=>setDark(!dark)} className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition" aria-label={`Switch to ${dark? 'light':'dark'} mode`}>
      {dark? <FiSun size={18}/> : <FiMoon size={18}/>}
    </button>
  )
}
