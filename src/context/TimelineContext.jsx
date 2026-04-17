"use client"

import { createContext, useState } from "react"

export const TimelineContext = createContext()

export default function TimelineProvider({ children }) {

const [timeline,setTimeline]=useState([])

const addInteraction=(type,name)=>{

const newEntry={
id:Date.now(),
type,
name,
date:new Date().toLocaleDateString(),
title:`${type} with ${name}`
}

setTimeline(prev=>[newEntry,...prev])
}

return(

<TimelineContext.Provider
value={{timeline,addInteraction}}
>

{children}

</TimelineContext.Provider>

)
}