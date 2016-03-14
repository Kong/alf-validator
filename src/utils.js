import fs from 'fs'

export function read (name) {
  return new Promise((resolve, reject) => {
    if (Buffer.isBuffer(name)) {
      return resolve({ name: 'stdin', content: name })
    }

    fs.readFile(name, (err, content) => {
      if (err) {
        err.file = name
        return reject(err)
      }

      resolve({ name, content })
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
