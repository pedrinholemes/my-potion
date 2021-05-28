import fileManager from "./lib/file"
import {readFile, writeFile} from "fs/promises"

const data = {
  message: 'hello'
}

const encodings: BufferEncoding[] = ["ascii", "utf8", "utf-8", "utf16le", "ucs2", "ucs-2", "base64", "latin1", "binary", "hex"]

fileManager.writeFile('welcome', data).then(async(data) => {
  fileManager.readFile('welcome').then(console.log)
})


