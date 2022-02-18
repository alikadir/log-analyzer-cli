#!/bin/sh
':' // # comment; exec /usr/bin/env node --experimental-json-modules "$0" "$@"

import mainRoute from './routes/mainRoute.js'

process.addListener('uncaughtException', (err) => {
  console.error(err)
  // console.logs('exit')
})

const cli = () => {
  mainRoute()
}
cli()
