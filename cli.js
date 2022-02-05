#!/usr/bin/env node

import mainRoute from './routes/mainRoute.js'

process.addListener('uncaughtException', (err) => {
  console.error(err)
  // console.logs('exit')
})

const cli = () => {
  mainRoute()
}
cli()
