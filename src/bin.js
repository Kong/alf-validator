#!/usr/bin/env node

import ALFError from './error'
import validate from './promise'
import yargs from 'yargs'
import furmat from 'furmat'
import { read, parse } from './utils'
import { buffer as stdin } from 'get-stdin'

const format = furmat()
const options = {
  'filter': {
    alias: 'f',
    demand: false,
    default: false,
    describe: 'filter additional properties before validation',
    type: 'boolean'
  },

  'schema': {
    alias: 's',
    demand: false,
    default: 'latest',
    describe: 'validate using specific schema version',
    type: 'string'
  },
  'help': {
    alias: 'h'
  }
}

stdin().then((stdin) => {
  let argv = yargs
    .demand(stdin.length ? 0 : 1)
    .usage('Usage: $0 <file...> [options]')
    .help('help')
    .options(options)
    .argv

  // add stdin to list of files
  if (stdin.length) {
    argv._.push(stdin)
  }

  argv._.forEach((file) => {
    read(file)
      .then(parse)
      .then((file) => {
        return validate(file.content, argv.schema, argv.filter)
          .then((data) => console.log(format('%s:green [%s:yellow:italic] is valid', '✔️', file.name)))
          .catch((err) => err.errors.forEach((details) => console.error(format('%s:red [%s:yellow:italic] failed validation: %s:red (%s:cyan:italic: %s:magenta:italic)', '✖', file.name, details.message, details.field, details.value))))
      })

      .catch((err) => {
        if (err instanceof SyntaxError) {
          return console.error(format('%s:red [%s:yellow:italic] failed to read JSON: %s:red', '✖', err.file, err.message))
        }

        if (err.code === 'ENOENT') {
          return console.error(format('%s:red [%s:yellow:italic] %s:red', '✖', err.file, 'no such file or directory'))
        }

        console.error(format('%s:red [%s:yellow:italic] an unknown error has occured: %s:red', '✖', err.file, err.message))
      })
  })
})
