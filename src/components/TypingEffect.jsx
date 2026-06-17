import React, {useEffect, useState} from 'react'

export default function TypingEffect({words=["Full-Stack Developer","IT Student","Problem Solver"], speed=120, pause=1500}){
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [blink, setBlink] = useState(true)
  const [reverse, setReverse] = useState(false)

  useEffect(()=>{
    if(index >= words.length) return setIndex(0)
    if(subIndex === words[index].length + 1 && !reverse){
      setTimeout(()=> setReverse(true), pause)
      return
    }
    if(subIndex === 0 && reverse){ setReverse(false); setIndex(i=>i+1); return }

    const timeout = setTimeout(()=>{
      setSubIndex(s=> s + (reverse ? -1 : 1))
    }, speed)
    return ()=> clearTimeout(timeout)
  },[subIndex, index, reverse, words, speed, pause])

  useEffect(()=>{ const t = setInterval(()=> setBlink(b=>!b),500); return ()=> clearInterval(t)},[])

  return (
    <span>{words[index].substring(0, Math.max(0, subIndex))}<span className="text-primary">{blink? '|' : ' '}</span></span>
  )
}
