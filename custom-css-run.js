import fs from "fs"
import postcss from "postcss"
import customTransformPlugin from "./postcss-plugin.js"

async function processCSS(inputFile, outputFile) {
    const css = fs.readFileSync(inputFile, "utf8")

    const result = await postcss([
        customTransformPlugin({
            propertiesToTransform: ["content-width", "text-size"], // Add your custom properties here
        }),
    ]).process(css, { from: inputFile, to: outputFile })

    fs.writeFileSync(outputFile, result.css)

    if (result.map) {
        fs.writeFileSync(`${outputFile}.map`, result.map.toString())
    }

    console.log("CSS processing complete.")
}

const inputFile = "./something.css" // Change this to your input file path
const outputFile = "./dest/something.css" // Change this to your desired output file path

processCSS(inputFile, outputFile)
