import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import DictCard from "../DictCard/DictCard"
import { Box, Grid, Paper } from "@mui/material"
import { dictEntries } from "../utils/api"

const App: React.FC<{}> = () => {
  // async function fetchJMdictData(word: string): Promise<dictEntries[]> {
  //   const res = await fetch(`http://localhost:8000/search/${word}`)

  //   if (!res.ok) throw new Error(`Error: ${res}`)

  //   const data = await res.json()

  //   console.log(data)
  //   return data
  // }
  // fetchJMdictData("難しい")

  return (
    <Box>
      <DictCard word="かける"></DictCard>
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
