import React, { useState, useEffect } from "react"
import { Box, Card, Paper, CardContent, Typography, Grid } from "@mui/material"
import {
  dictEntries,
  senseEntries,
  fetchJMdictData,
  furiganaGenerator,
} from "../utils/api"
import "./DictCard.css"

//create Card to use in popup window
const DictCard: React.FC<{
  word: string
}> = ({ word }) => {
  const [dictData, setDictData] = useState<dictEntries[] | null>(null)
  const [furigana, setFurigana] = useState<any>(null)

  //everytime the component mounts, and updates, make sure that the DictData is set to the JM dictionary data
  useEffect(() => {
    fetchJMdictData(word)
      .then((filterData) => {
        setDictData(filterData)
        furiganaGenerator(filterData).then((furiganaArr) =>
          setFurigana(furiganaArr)
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }, [word])

  //replace all adjectives with human-readable descriptions that are to be displayed in the popup window
  const filterPos = (arr: senseEntries) => {
    const filterArr = arr.pos.map((word) =>
      word
        .replace("&adj-f;", "Noun or Verb Acting Prenominally")
        .replace("&adj-i;", "I-Adjective (keiyoushi)")
        .replace("&adj-ix;", "Adjective ii/yoi-Class (keiyoushi)")
        .replace("&adj-kari;", "Kari-Adjective")
        .replace("&adj-ku;", "Ku-Adjective")
        .replace("&adj-na;", "Na-Adjective")
        .replace("&adj-nari;", "Archaic/Formal form of Na-Adjective")
        .replace("&adj-no;", "No-Nouns")
        .replace("&adj-pn;", "Pre-Noun Adjectival (rentaishi)")
        .replace("&adj-shiku;", "Shiku-Adjective")
        .replace("&adj-t;", "Taru-Adjective")
        .replace("&adv;", "Adverb (Fukushi)")
        .replace("&adv-to;", `Adverb taking the "to" particle`)
        .replace("&aux;", "Auxiliary")
        .replace("&aux-adj;", "Auxiliary Adjective")
        .replace("&aux-v;", "Auxiliary Verb")
        .replace("&conj;", "Conjunction")
        .replace("&cop;", "Copula")
        .replace("&ctr;", "Counter")
        .replace("&exp;", "Expression")
        .replace("&int;", "Interjection (kandoushi)")
        .replace("&n;", "Noun (futsuumeishi)")
        .replace("&n-adv;", "Adverbial Noun (fukushitekimeishi)")
        .replace("&n-pr;", "Proper Noun")
        .replace("&n-pref;", "Noun, used as a prefix")
        .replace("&n-suf;", "noun, used as a suffix")
        .replace("&n-t;", "Noun (jisoumeishi)")
        .replace("&num;", "Numeric")
        .replace("&pn;", "Pronoun")
        .replace("&pref;", "Prefix")
        .replace("&prt;", "Particle")
        .replace("&suf;", "Suffix")
        .replace("&unc;", "Unclassified")
        .replace("v-unspec", "Verb Unspecified")
        .replace("&v1;", "Ichidan Verb")
        .replace("&v1-s;", "Ichidan Verb (kureru special class)")
        .replace("&v2a-s;", "Nidan Verb")
        .replace("&v2b-k;", "Nidan Verb")
        .replace("&v2b-s;", "Nidan Verb")
        .replace("&v2d-k;", "Nidan Verb")
        .replace("&v2d-s;", "Nidan Verb")
        .replace("&v2g-k;", "Nidan Verb")
        .replace("&v2g-s;", "Nidan Verb")
        .replace("&v2h-k;", "Nidan Verb")
        .replace("&v2h-s;", "Nidan Verb")
        .replace("&v2k-k;", "Nidan Verb")
        .replace("&v2k-s;", "Nidan Verb")
        .replace("&v2m-k;", "Nidan Verb")
        .replace("&v2m-s;", "Nidan Verb")
        .replace("&v2n-s;", "Nidan Verb")
        .replace("&v2r-k;", "Nidan Verb")
        .replace("&v2r-s;", "Nidan Verb")
        .replace("&v2s-s;", "Nidan Verb")
        .replace("&v2t-k;", "Nidan Verb")
        .replace("&v2t-s;", "Nidan Verb")
        .replace("&v2w-s;", "Nidan Verb")
        .replace("&v2y-k;", "Nidan Verb")
        .replace("&v2y-s;", "Nidan Verb")
        .replace("&v2z-s;", "Nidan Verb")
        .replace("&v4b;", "Yodan Verb")
        .replace("&v4g;", "Yodan Verb")
        .replace("&v4h;", "Yodan Verb")
        .replace("&v4k;", "Yodan Verb")
        .replace("&v4m;", "Yodan Verb")
        .replace("&v4n;", "Yodan Verb")
        .replace("&v4r;", "Yodan Verb")
        .replace("&v4s;", "Yodan Verb")
        .replace("&v4t;", "Yodan Verb")
        .replace("&v5aru;", "Godan Verb")
        .replace("&v5b;", "Godan Verb")
        .replace("&v5g;", "Godan Verb")
        .replace("&v5k;", "Godan Verb")
        .replace("&v5k-s;", "Godan Verb")
        .replace("&v5m;", "Godan Verb")
        .replace("&v5n;", "Godan Verb")
        .replace("&v5r;", `Godan Verb with "ru" ending`)
        .replace("&v5r-i;", `Godan Verb with "ru" ending (irregular verb)`)
        .replace("&v5s;", "Godan Verb")
        .replace("&v5t;", "Godan Verb")
        .replace("&v5u;", "Godan Verb")
        .replace("&v5u-s;", "Godan Verb (special class)")
        .replace("&v5uru;", "Godan Verb (old form of eru)")
        .replace("&vi;", "Intransitive Verb")
        .replace("&vk;", "Kuru Verb (special class)")
        .replace("&vn;", "Irregular Nu Verb")
        .replace("&vr;", "Irregular Ru Verb")
        .replace("&vs;", "Noun or Participle")
        .replace("&vs-c;", "Su Verb (precursor to modern suru)")
        .replace("&vs-i;", "Suru Verb")
        .replace("&vs-s;", "Suru Verb")
        .replace("&vt;", "Transitive Verb")
        .replace("&vz;", "Ichidan Verb")
        .replace("&ik;", "Word contains irregular kana usage")
        .replace("&ok;", "Out-dated or obsolete kana usage")
        .replace("&uK;", "Word usually written using kanji alone")
        .replace("&vt;", "Transitive Verb")
    )

    return filterArr
  }

  //if the furigana array is empty, then return. The purpose is so the app renders all at once and not at separate times
  if (!furigana) return null

  return (
    <Box>
      <Grid
        container
        mx={"2px"}
        columns={10}
        paddingBottom={"0.75rem"}
        justifyContent="center"
        alignContent="center"
        width={"100%"}
      >
        <Grid item xs={10}>
          <Paper variant="outlined">
            <Typography className="dictCard-title">{word}</Typography>
          </Paper>
        </Grid>
      </Grid>
      {dictData?.map((entries, index) => (
        <Box
          mx={"2px"}
          className="dictCard-container"
          paddingBottom={"0.75rem"}
          width={"100%"}
          key={entries.ent_seq[0]}
        >
          <Grid container flexDirection="column" alignItems="stretch">
            <Paper elevation={4}>
              <Card>
                <Grid item>
                  <Typography
                    className="dictCard-word"
                    dangerouslySetInnerHTML={{ __html: furigana[index] }}
                  ></Typography>
                  {entries.sense.map((def, i) => (
                    <Box paddingBottom={"0.5rem"} key={i}>
                      <Grid container>
                        <Grid item>
                          <Typography className="dictCard-pos">
                            {filterPos(def).join("; ")}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container columns={10}>
                        <Grid item xs={0.5}>
                          <Typography className="dictCard-index">
                            {`${i + 1}. `}
                          </Typography>
                        </Grid>
                        <Grid item xs={9.5}>
                          <Typography className="dictCard-gloss">
                            {def.gloss.join("; ")}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Grid>
              </Card>
            </Paper>
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

export default DictCard
