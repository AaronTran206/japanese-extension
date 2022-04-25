//keb is the kanji element
//ke_inf coded information field
//ke_pri indicates how often it appears in different sources
//news1/2 means it appears in "Mainichi Shinbun by Alexandre Girardi"
//ichi1/2 appears in "Ichimango Goi Bunruishuu"
//spec1 and spec 2 are a small number of wards that are common but no included in other lists
//gai1/2 common loanwords
export interface k_eleEntries {
  keb?: string[]
  ke_pri?: string[]
}

//reb is the reading element of the word which contains valid readings of the word. Typically alternative readings of the kanji element. Restricted to kana
//re_nokanji indicates that the reb canot be regarded as a true reading of the kanji. Typically for words such as foreign place names. Gairaigo which can be in kanji or katakana, etc.
//re_restr indicates when the reading only applies to a subset of the keb elements. Must match exactly those of one of the keb elements
//re_inf coded information field
//re_pri same as ke_pre above
export interface r_eleEntries {
  reb?: string[]
  re_pri?: string[]
}

//sense will record the translational equivalent of word
//stagk or stagr, indicate that the sense is restricted to the lexeme represented by the keb and/or reb
//xref indicate a cross-reference to another entry with a similar or related meaning or sense
//ant indicates another entry which is an anyonym of the current entry
//pos part-of-speech information about entry
//field information about the field of application of the entry
//misc relevant information about the entry
//dial for words associated with regional dialects in Japanese
//gloss target-language words or phrases which are equivalents to the Japanese word. May not be present for entries which are purely for cross-reference.
//g_gend defined gender of the gloss. Typically a noun in the target language. When absent, it is either not relevant or not yet provided.
//g_type specifies that the gloss is of a particular type. lit = literal. fig = figurative. expl = explanation
//pri these elements highlight particular target-language words which are strongly associated with the Japanese word.
//s_inf provides additional information to be recorded about a sense
//example contains a japanese sentence using the entry
export interface senseEntries {
  ant?: string[]
  gloss?: string[]
  pos?: string[]
  dial?: string[]
  pri?: string[]
  example?: string[]
}

export interface dictEntries {
  ent_seq: number[]
  k_ele?: k_eleEntries[]
  r_ele?: r_eleEntries[]
  sense?: senseEntries[]
}

export interface JMdictEntries {
  entry: dictEntries[]
}

//dictionary data
const data = require("./JMdict.json")
// import data from "./JMdict.json"

//function to return array of objects that contain the word from the request parameter
export async function fetchJMdictData(word: string): Promise<dictEntries[]> {
  const filterData: dictEntries[] = await data.JMdict.entry.filter(
    (entries: dictEntries) => {
      //return entry if searched word matches romaji
      if (
        entries?.r_ele !== undefined &&
        entries?.r_ele[0]?.reb?.includes(word.trim())
      ) {
        return entries
      }

      //return entry if searched word matches kanji
      if (
        entries?.k_ele !== undefined &&
        entries?.k_ele[0]?.keb?.includes(word.trim())
      ) {
        return entries
      }

      //return entry if searched word matches part of english definition
      if (
        entries?.sense !== undefined &&
        entries?.sense?.some((senseEntry) =>
          senseEntry?.gloss?.some((def) =>
            def.toString().split(" ").includes(word.trim().toLowerCase())
          )
        )
      ) {
        return entries
      }
    }
  )

  return filterData
}
