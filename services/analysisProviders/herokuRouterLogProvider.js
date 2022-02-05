import { parseByGap, parseByLine } from '../parseService.js'
import { getMean, getMedian, getMostFrequent } from '../statisticService.js'

export default async function herokuRouterLogProvider (logText, changeStatusCallback) {
  const recordLines = parseByLine(logText)
  await changeStatusCallback({ message: `Analyzing ${recordLines.length} records...`, success: false })
  const formattedLogRecords = recordLines.map((recordLine) => {
    try {
      const splitRecordFields = parseByGap(recordLine)
      if (splitRecordFields.length < 10) return null
      return formatFields(pickFields(splitRecordFields))
    } catch (err) {
      return null
    }
  }).filter((item) => !!item)

  const uniqueRecordIds = getUniqueIds(formattedLogRecords)
  return uniqueRecordIds.map((id) =>
    analyzeRecordById(id, formattedLogRecords)
  )
}

const analyzeRecordById = (id, logRecords) => {
  const filteredLogRecordsById = logRecords.filter((item) => item.id === id)
  const responseTimes = filteredLogRecordsById.map(
    (record) => record.responseTime
  )
  const dynoNames = filteredLogRecordsById.map((record) => record.dynoName)
  const called = filteredLogRecordsById.length

  const meanResponseTime = getMean(responseTimes)
  const medianResponseTime = getMedian(responseTimes)
  const dynoName = getMostFrequent(dynoNames)

  return { id, called, meanResponseTime, medianResponseTime, dynoName }
}

const getUniqueIds = (list) => {
  return [...new Set(list.map((item) => item.id))]
}

const formatFields = ({ method, path, dynoName, connect, service }) => {
  const userIdSelector = /([0-9])\w+/

  method = method.replace('method=', '')
  path = path.replace('path=', '').replace(userIdSelector, '{user_id}')
  dynoName = dynoName.replace('dyno=', '')
  connect = connect.replace('connect=', '').replace('ms', '')
  service = service.replace('service=', '').replace('ms', '')

  const id = `${method} ${path}`
  const responseTime = Number(connect) + Number(service)

  return { method, path, dynoName, id, responseTime }
}

const pickFields = (recordLine) => {
  const [, , , method, path, , , dynoName, connect, service] = recordLine
  return { method, path, dynoName, connect, service }
}
