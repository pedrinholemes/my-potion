import CryptoJS from "crypto-js";
import * as fs from "fs/promises";
import * as path from "path";

type EmptyValue = string | number | boolean | string[] | number[] | boolean[]
type EmptyValueObject = Record<string, EmptyValue> | Record<string, EmptyValue[]> | EmptyValue | EmptyValue[]
type EmptyObject = Record<string, EmptyValueObject>

const secretKey: string = 'CryptoJS'
const encoding: BufferEncoding = 'base64'

class FileManager {
  public async writeFile(name: string, data: EmptyObject) {
    try {
      const stringData = JSON.stringify(data)
      const encryptData = CryptoJS.AES.encrypt(stringData, secretKey)
      const filePath = this.getPath(name)

      const fileData = encryptData.toString()

      await fs.writeFile(filePath, fileData, { encoding })

      return fileData
    } catch (error) {
      throw new Error("Error on write file");
    }
  }

  public async readFile(name: string) {
    try {
      const filePath = this.getPath(name)
      const file = await fs.readFile(filePath, { encoding })

      const decryptData = CryptoJS.AES.decrypt(file, secretKey)
      const fileData = decryptData.toString(CryptoJS.enc.Utf8)

      const data = JSON.parse(fileData)

      return data
    } catch (error) {
      throw new Error("Error on read file");
    }
  }

  public getPath(name: string): string {
    const hasFileType = (/^.*\.([a-zA-Z]{1,})$/).test(name)
    if (hasFileType) {
      const names = name.split('.')
      const fileType = names[names.length - 1]
      if (fileType === 'potion-file') {
        const filePath = path.resolve(__dirname, '..', 'tmp', name)
        return filePath
      } else {
        const fileName = `${names.filter((e, i, a) => i + 1 !== a.length).join('.')}.potion-file`
        const filePath = path.resolve(__dirname, '..', 'tmp', fileName)
        return filePath
      }
    } else {
      const filePath = path.resolve(__dirname, '..', 'tmp', `${name}.potion-file`)
      return filePath
    }
  }
}

export const fileManager = new FileManager()
