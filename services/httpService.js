import fetch from 'node-fetch'

export const downloadTextFile = async (url, options) => {
  const response = await fetch(url, options)
  const size = Number(response.headers.get('content-length'))
  const data = await response.text()
  return {
    data,
    size
  }
}

export const downloadJsonFile = async (url, options) => {
  const response = await fetch(url, options)
  const size = Number(response.headers.get('content-length'))
  const data = await response.json()
  return {
    data,
    size
  }
}
