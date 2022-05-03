import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import DictCard from "../DictCard/DictCard"
import { Box, Grid, InputBase, Paper, Typography } from "@mui/material"
import { kuromojiObject } from "../utils/api"
import * as kuromoji from "kuromoji"
import Kuroshiro from "kuroshiro"

const App: React.FC<{}> = ({}) => {
  const [kuromojiArr, setKuromojiArr] = useState<kuromojiObject[] | null>(null)
  const [activeID, setActiveID] = useState<number>(null)
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
        setKuromojiArr(path)
        setActiveID(0)

        //If the search is japanese, set the dictWord to the basic form of the word so that the dictionary can properly query. Otherwise query the searched result in English
        if (Kuroshiro.Util.hasJapanese(search)) {
          setDictWord(path[0]?.basic_form)
        } else {
          const engPhrase = path.map((obj) => obj.surface_form)
          setDictWord(engPhrase.join(""))
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
      .replace("連体詞", "Prenoun")
      .replace("接頭詞", "Prefix")
    return engPos
  }

  //search function
  const handleSubmit = (query: string) => {
    //does not query if the searchBar is empty
    if (query !== "") {
      const inputField = document.querySelector("input")
      setSearch(query)

      //Set input field back to empty
      inputField.value = ""
    }
  }

  //set activeID to the index of the target clicked
  const handleActive = (index: number) => {
    setActiveID(Number(index))
  }

  return (
    <Box>
      <Grid container marginBottom={"10px"} display={"inline-block"}>
        <Grid item>
          <Paper variant="outlined">
            <Box py={"2px"} px={"10px"}>
              <InputBase
                id="input"
                fullWidth={true}
                placeholder="Search Japanese, English, or Romaji"
                onKeyPress={(e: any) => {
                  //when Enter is pressed and the value is not an empty string, query the input value
                  if (e.key === "Enter" && e.target.value !== "")
                    handleSubmit(e.target.value)
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={2}>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={0.7}
        >
          {
            //map through the array returned from the array returned from the kuromoji API and display the surface-forms (the form in which the sentence was input) in an underlined style and spaced slightly apart for easier readability

            kuromojiArr?.map((entries, i) => (
              <Grid item key={i} width={"fit-content"}>
                <Typography
                  className={
                    activeID === i && dictWord.indexOf(" ") < 0
                      ? "popup-title active"
                      : "popup-title inactive"
                  }
                  data-basic={entries.basic_form}
                  data-index={i}
                  onClick={(e: any) => {
                    //Clicking does not work on particles or if the clicked word is the word that is searched right now
                    if (
                      e.target.children[0].innerHTML === "Particle" ||
                      e.target.getAttribute("data-basic") === dictWord
                    )
                      return
                    handleActive(Number(e.target.getAttribute("data-index")))
                    setDictWord(e.target.getAttribute("data-basic"))
                  }}
                >
                  {entries.surface_form}
                  <span className="pos">{posToEnglish(entries?.pos)}</span>
                </Typography>
              </Grid>
            ))
          }
        </Grid>
      </Paper>

      <DictCard word={dictWord}></DictCard>
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
