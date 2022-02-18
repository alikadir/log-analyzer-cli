import path from 'path'
import fs from 'fs'
import getPackageVersion from '@jsbits/get-package-version'

const inputFilePath = process.argv[1]
export const workingDirectory = path.dirname(fs.realpathSync(inputFilePath))
export const version = getPackageVersion(workingDirectory)
export const name = 'Log Analyzer CLI'
export const logo = `
                        
    __                     ___                __                     
   / /   ____  ____ _     /   |  ____  ____ _/ /_  ______  ___  _____
  / /   / __ \\/ __ \`/    / /| | / __ \\/ __ \`/ / / / /_  / / _ \\/ ___/
 / /___/ /_/ / /_/ /    / ___ |/ / / / /_/ / / /_/ / / /_/  __/ /    
/_____/\\____/\\__, /    /_/  |_/_/ /_/\\__,_/_/\\__, / /___/\\___/_/     
            /____/                          /____/                   

`
