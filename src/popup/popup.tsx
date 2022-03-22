import React from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import "../../JMdict_e.xml"

var xmlFile = require("../../JMdict_e.xml")
var XMLParser = require("react-xml-parser")
var xml = new XMLParser().parseFromString(xmlFile)
console.log(xml)

const test = <img src="icon.png" />

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(test, root)
