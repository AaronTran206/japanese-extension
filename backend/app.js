const PORT = 8000
const express = require("express")
const data = require("./JMdict.json")
const app = express()
const cors = require("cors")

app.use(cors())

app.get("/", (req, res) => {
  res.json(data.JMdict)
})

app.listen(PORT, () => console.log(`server is running on ${PORT}`))
