import { Request, Response } from "express"
import { fetchJMdictData } from "./utils"
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 8000

//server middleware
app.use(cors())

//server get request
app.get("/search/:word", async (req: Request, res: Response) => {
  try {
    const filteredArr = await fetchJMdictData(req.params.word)
    res.json(filteredArr)
  } catch (err) {
    console.log(err)
  }
})

//server listening on PORT
app.listen(PORT, () => console.log(`server is running on ${PORT}`))
