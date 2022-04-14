import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import DictCard from "../DictCard/DictCard"
import { Box, Grid, Paper } from "@mui/material"
import { dictEntries } from "../utils/api"

async function fetchJMdictData(): Promise<dictEntries[]> {
  const res = await fetch("http://localhost:8000")

  if (!res.ok) throw new Error(`Error: ${res}`)

  const data = await res.json()

  const filterData: dictEntries[] = await data.entry.filter(
    (entries: dictEntries) => {
      if (
        entries.r_ele !== undefined &&
        entries.r_ele[0].reb.includes("かける")
      ) {
        return entries
      }
    }
  )

  filterData?.forEach((entries) => {
    entries.sense.forEach((speech) => {
      speech.pos.forEach((word, index) => {
        word = word.replace("&v1;", "verb1")
        console.log(word)
      })
    })
  })
  return filterData
}

fetchJMdictData()

const App: React.FC<{}> = () => {
  return (
    <Box>
      <DictCard word="かける"></DictCard>
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
