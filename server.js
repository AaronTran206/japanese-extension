//called the Node modules needed to read the dictionary file. Had to downgrade the slash module to 3.0 because it was not compatibile with CommonJS.
var fs = require("fs"),
  slash = require("slash"),
  xml2js = require("xml2js")
var parser = new xml2js.Parser()
let JMdict = slash("src/static/JMdict_e.xml")

//create array for dictionary to be pushed into
const dict = []

//convert xml file to JSON file and push it into dict array
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
          data = JSON.stringify(res, null, 2)
          fs.writeFileSync("JMdict.json", data)
        }
      }
    )
  }
})
