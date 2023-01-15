import React from 'react'

type prop = {
    navlinks:String[],
    controllerType:String,
    setControllerType:(value:String)=>void
}

const Navbar = ({navlinks,controllerType,setControllerType}:prop) => {
  return (
    <div className="flex my-2 justify-between">
    {navlinks.map((n)=>{
        return(
          <div className={`nav-link ${controllerType==n?'bg-white':''}`} onClick = {()=>setControllerType(n)}>{n}</div>
        )
      })}
    </div>
  )
}

export default Navbar