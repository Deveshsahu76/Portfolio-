import React, {useEffect, useState} from 'react'

export default function CustomCursor(){
  const [pos, setPos] = useState({x:0,y:0})

  useEffect(()=>{
    function onMove(e){ setPos({x:e.clientX, y:e.clientY}) }
    window.addEventListener('mousemove', onMove)
    return ()=> window.removeEventListener('mousemove', onMove)
  },[])

  return (
    <div style={{pointerEvents:'none'}}>
      <div style={{position:'fixed',left:pos.x-8,top:pos.y-8,width:16,height:16,borderRadius:9999,background:'rgba(124,58,237,0.9)',transform:'translateZ(0)',zIndex:9999}} />
    </div>
  )
}
