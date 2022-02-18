import enquirer from 'enquirer'
import chalk from 'chalk'

import { name, version, logo } from '../constants.js'

import herokuRoute from './herokuRoute.js'

const greetings = () => {
  console.log(chalk.magenta(logo))
  console.log(chalk.green(name) + ' ' + chalk.yellow(version))
  console.log('');
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
