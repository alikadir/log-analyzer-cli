import enquirer from 'enquirer'
import chalk from 'chalk'
import pjson from '../package.json'

import herokuRoute from './herokuRoute.js'

const greetings = () => {
  console.log(chalk.magenta(`
                        
    __                     ___                __                     
   / /   ____  ____ _     /   |  ____  ____ _/ /_  ______  ___  _____
  / /   / __ \\/ __ \`/    / /| | / __ \\/ __ \`/ / / / /_  / / _ \\/ ___/
 / /___/ /_/ / /_/ /    / ___ |/ / / / /_/ / / /_/ / / /_/  __/ /    
/_____/\\____/\\__, /    /_/  |_/_/ /_/\\__,_/_/\\__, / /___/\\___/_/     
            /____/                          /____/                   

${chalk.green('Log Analyzer CLI')} ${chalk.yellow('v' + pjson.version)}`))
}

export default async function MainRoute () {
  greetings()
  await navigate()
}

const navigate = async () => {
  const provider = await selectProvider()
  switch (provider) {
    case 'Heroku':
      await herokuRoute()
      break
    case 'AWS':
      console.log(chalk.red('AWS not implemented yet!'))
      process.exit(1)
  }
}

const selectProvider = async () => {
  const answer = await enquirer.prompt([
    {
      type: 'select',
      name: 'provider',
      message: 'Select a log provider',
      choices: ['Heroku', 'AWS']
    }
  ])
  return answer.provider
}
