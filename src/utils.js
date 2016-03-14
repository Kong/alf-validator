import fs from 'fs'

export function read (file) {
  return new Promise((resolve, reject) => {
    if (Buffer.isBuffer(file)) {
      return resolve({ name: 'stdin', content: file })
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        err.file = file
        return reject(err)
      }

      resolve({ name: file, content: data })
    })
  })
}

export function parse (file) {
  return new Promise((resolve, reject) => {
    try {
      file.content = JSON.parse(file.content)
      resolve(file)
    } catch (err) {
      err.file = file.name
      reject(err)
    }
  })
}
