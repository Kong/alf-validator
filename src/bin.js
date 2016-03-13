#!/usr/bin/env node

import chalk from 'chalk'
import cmd from 'commander'
import fs from 'fs'
import path from 'path'
import pkg from '../package.json'
import validate from './promise'
import ALFError from './error'

cmd
  .version(pkg.version)
  .usage('[options] <files...>')
  .option('-s, --schema [version]', 'validate using specific schema version (default to latest)', 'latest')
  .parse(process.argv)

if (!cmd.args.length) {
  cmd.help()
}

cmd.args.map((fileName) => {
  let file = chalk.yellow.italic(path.basename(fileName))

  new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => err === null ? resolve(data) : reject(err))
  })

    .then(JSON.parse)
    .then((data) => validate(data, cmd.schema || 'latest'))
    .then((data) => console.log('%s [%s] is valid', chalk.green('✔️'), file))
    .catch((err) => {
      if (err instanceof SyntaxError) {
        return console.error('%s [%s] failed to read JSON: %s', chalk.red('✖'), file, chalk.red(err.message))
      }

      if (err instanceof ALFError) {
        err.errors.forEach((details) => console.error('%s [%s] failed validation: (%s: %s) %s', chalk.red('✖'), file, chalk.cyan.italic(details.field), chalk.magenta.italic(details.value), chalk.red(details.message)))
        return
      }

      console.error('%s [%s] an unknown error has occured: %s', chalk.red('✖'), file, chalk.red(err.message))
    })
})
