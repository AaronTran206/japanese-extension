var fs = require("fs"),
  slash = require("slash"),
  xml2js = require("xml2js")
var parser = new xml2js.Parser()
let JMdict = slash("src/static/JMdict_e.xml")

const dict = []

fs.readFile(JMdict, "utf8", function (err, data) {
  if (err) {
    console.log("Err111: " + err)
  } else {
    parser.parseString(
      data.replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, "&amp;"),
      function (err, res) {
        if (err) {
          console.log("Err: " + err)
        } else {
          dict.push(res)
          console.log(dict)
        }
      }
    )
  }
})
