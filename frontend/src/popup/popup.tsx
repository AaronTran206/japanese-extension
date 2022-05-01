import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import DictCard from "../DictCard/DictCard"
import { Box, Grid, Paper, Typography } from "@mui/material"
import { kuromojiObject } from "../utils/api"
import * as kuromoji from "kuromoji"

const App: React.FC<{}> = ({}) => {
  const [kuromojiArr, setKuromojiArr] = useState<kuromojiObject[] | null>(null)

  useEffect(() => {
    tokenizeSentence(word)
  }, [])

  const tokenizeSentence = (sentence: string) => {
    kuromoji
      .builder({ dicPath: "./dict/" })
      .build(function (err: any, tokenizer: any) {
        var path: kuromojiObject[] = tokenizer.tokenize(sentence)
        console.log(path)
        setKuromojiArr(path)
      })
  }

  const posToEnglish = (pos: string) => {
    const engPos = pos
      .replace("形容詞", "Adjective")
      .replace("助動詞", "Particle")
      .replace("動詞", "Verb")
      .replace("助詞", "Particle")
      .replace("記号", "")
      .replace("副詞", "Adverb")
      .replace("名詞", "Noun")
    console.log(engPos)
    return engPos
  }

  // const word = "eat"
  // const word = "to eat"
  // const word = "デニる"
  // const word = "かける"
  // const word = "食べる"
  // const word = "食べた"
  const word = "早いね起きるの って言おうとしたらもう昼だったww"

  if (!kuromojiArr) return null

  return (
    <Box>
      <Paper variant="outlined">
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={0.7}
          marginTop={"10px"}
        >
          {kuromojiArr?.map((entries, i) => (
            <Grid item key={i}>
              <Typography className="popup-title">
                {entries.surface_form}
                <span className="pos">{posToEnglish(entries?.pos)}</span>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <DictCard word={word}></DictCard>
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
