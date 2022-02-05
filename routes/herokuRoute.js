import chalk from 'chalk'
import enquirer from 'enquirer'
import ora from 'ora'
import { analyzeLogRecord } from '../services/analysisService.js'
const spinner = ora()

export default async function herokuRoute () {
  const { url, type } = await navigate()
  const analyzedRecords = await analyzeLogRecord(url, type, handleChangeStatus)
  console.table(convertPresentationList(analyzedRecords))
}

const convertPresentationList = (list) => {
  return list.map(record => ({
    'Method & Url': record.id,
    Called: record.called,
    Mean: record.meanResponseTime,
    Median: record.medianResponseTime,
    'Dyno Name': record.dynoName
  }))
}

const handleChangeStatus = async (status) => {
  if (status.success) {
    spinner.succeed(status.message)
  } else {
    spinner.start(status.message)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

const navigate = async () => {
  const type = await selectHerokuLogType()

  if (type === 'herokuWorkerLog') {
    console.log(chalk.red('Worker log not implemented yet!'))
    process.exit(1)
  }
  const url = await getUrl(type)
  return { type, url }
}

const getUrl = async (type) => {
  const source = await selectSource()

  if (type === 'herokuRouterLog' && source === 'large') { return '' }
  if (type === 'herokuRouterLog' && source === 'small') { return '' }
  if (type === 'herokuRouterLog' && source === 'url') { return getCustomUrl() }
}

const selectHerokuLogType = async () => {
  const options = {
    type: 'select',
    name: 'type',
    message: 'Select Heroku log type',
    choices: [
      { name: 'Routing Log', value: 'herokuRouterLog' },
      { name: 'Worker Log', value: 'herokuWorkerLog' }
    ]
  }
  const answer = await enquirer.prompt(options)
  return options.choices.find(c => c.name === answer.type).value
}

const selectSource = async () => {
  const options = {
    type: 'select',
    name: 'source',
    message: 'What is your data source for Heroku logs?',
    choices: [
      { name: 'Sample routing log (Large)', value: 'large' },
      { name: 'Sample routing log (Small)', value: 'small' },
      { name: 'I have a log url', value: 'url' }]
  }
  const answer = await enquirer.prompt(options)
  return options.choices.find(c => c.name === answer.source).value
}

const getCustomUrl = async () => {
  const answer = await enquirer.prompt({
    type: 'input',
    name: 'customUrl',
    message: 'Enter your Heroku logs file url'
  })
  return answer.customUrl
}
