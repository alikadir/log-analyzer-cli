import herokuRouterLogProvider from './analysisProviders/herokuRouterLogProvider.js'
import { downloadTextFile } from './httpService.js'

export const analyzeLogRecord = async (sourceUrl, type, changeStatusCallback) => {
  await changeStatusCallback({ message: 'Downloading records...', success: false })
  const { data: logText, size } = await downloadTextFile(sourceUrl)
  await changeStatusCallback({ message: `Downloaded ${(size / 1024).toFixed(0)} kb log.`, success: true })
  const analyzedRecords = await getLogProvider(type)(logText, changeStatusCallback)
  await changeStatusCallback({ message: `Analyzed ${analyzedRecords.length} unique url call`, success: true })
  return analyzedRecords
}

const getLogProvider = (type) => {
  switch (type) {
    case 'herokuRouterLog':
      return herokuRouterLogProvider
    default:
      return null
  }
}
