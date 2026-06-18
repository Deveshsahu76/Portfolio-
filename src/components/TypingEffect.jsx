import React, {useEffect, useState} from 'react'

export default function TypingEffect({words=["Full-Stack Developer","IT Student","Problem Solver"], speed=120, pause=1500}){
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [blink, setBlink] = useState(true)
  const [reverse, setReverse] = useState(false)

  const validWords = Array.isArray(words) && words.length > 0 ? words : ['']
  const currentWord = validWords[index] ?? ''
  const nextIndex = index + 1 >= validWords.length ? 0 : index + 1

  useEffect(()=>{
    if (validWords.length === 0) return
    if (subIndex === currentWord.length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), pause)
      return () => clearTimeout(timeout)
    }

    if (subIndex === 0 && reverse) {
      setReverse(false)
      setIndex(nextIndex)
      return
    }

    const timeout = setTimeout(()=>{
      setSubIndex(s=> s + (reverse ? -1 : 1))
    }, speed)
    return ()=> clearTimeout(timeout)
  },[subIndex, index, reverse, currentWord, nextIndex, speed, pause, validWords.length])

  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(t)
  }, [])

  return (
    <span>{currentWord.substring(0, Math.max(0, subIndex))}<span className="text-primary">{blink? '|' : ' '}</span></span>
  )
}
