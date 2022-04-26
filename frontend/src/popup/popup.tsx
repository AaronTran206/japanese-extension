import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import DictCard from "../DictCard/DictCard"
import { Box, Grid, Paper } from "@mui/material"

const App: React.FC<{}> = () => {
  // async function fetchJMdictData(word: string): Promise<dictEntries[]> {
  //   const res = await fetch(`http://localhost:8000/search/${word}`)

  //   if (!res.ok) throw new Error(`Error: ${res}`)

  //   const data = await res.json()

  //   console.log(data)
  //   return data
  // }
  // fetchJMdictData("難しい")

  // const word = "eat"
  const word = "to eat"
  // const word = "デニる"
  // const word = "食べる"
  // const word = "食べた"
  // const word = '早いね起きるの って言おうとしたらもう昼だったww'

  return (
    <Box>
      <DictCard word={word}></DictCard>
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
