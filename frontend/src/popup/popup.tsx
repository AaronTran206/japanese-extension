import React, {
  useState,
  useEffect,
  ButtonHTMLAttributes,
  FormEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  Key,
} from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import DictCard from "../DictCard/DictCard"
import { Box, Grid, InputBase, Paper, Typography } from "@mui/material"
import { kuromojiObject } from "../utils/api"
import * as kuromoji from "kuromoji"
import Kuroshiro from "kuroshiro"

const App: React.FC<{}> = ({}) => {
  const [kuromojiArr, setKuromojiArr] = useState<kuromojiObject[] | null>(null)
  const [search, setSearch] = useState<string>("")
  const [dictWord, setDictWord] = useState<string>("")

  useEffect(() => {
    tokenizeSentence(search)
  }, [search])

  //Take input and split the words into individual tokens
  const tokenizeSentence = (sentence: string) => {
    kuromoji
      .builder({ dicPath: "./dict/" })
      .build(function (err: any, tokenizer: any) {
        var path: kuromojiObject[] = tokenizer.tokenize(sentence)

        if (Kuroshiro.Util.hasJapanese(search)) {
          setKuromojiArr(path)
          setDictWord(path[0]?.basic_form)
        } else {
          setKuromojiArr(path)
          setDictWord(path[0]?.surface_form)
        }
      })
  }

  //Change and return the japanese parts-of-speech to English
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

  //search function
  const handleSubmit = (query: string) => {
    const inputField = document.querySelector("input")
    setSearch(query)
    inputField.value = ""
  }

  if (!kuromojiArr) return null

  // interface keyPress {
  //   target: KeyboardEvent
  //   key: string
  // }
  interface popupWord {
    className: string
    base_form: string
  }

  return (
    <Box>
      <Grid container marginBottom={"5px"} justifyContent={"stretch"}>
        <Grid>
          <Paper variant="outlined">
            <Box px="15px" py="5px">
              <InputBase
                id="input"
                placeholder="Search Japanese, English, or Romaji"
                onKeyPress={(e: any) => {
                  if (e.key === "Enter" && e.target.value !== "")
                    handleSubmit(e.target.value)
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
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
              <Typography
                className="popup-title"
                onClick={(e: any) => {
                  if (
                    e.target.children[0].innerHTML === "Particle" ||
                    e.target.getAttribute("data-basic") === dictWord
                  )
                    return

                  setDictWord(e.target.getAttribute("data-basic"))
                }}
                data-basic={entries.basic_form}
              >
                {entries.surface_form}
                <span className="pos">{posToEnglish(entries?.pos)}</span>
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <DictCard word={dictWord}></DictCard>
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
