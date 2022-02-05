
export const getMean = (list) => {
  return Math.floor(
    list.reduce((previousValue, currentValue) => previousValue + currentValue) /
    list.length
  )
}

export const getMedian = (list) => {
  const sortedList = list.sort((a, b) => a - b)
  const middleItemIndex = Math.floor(sortedList.length / 2)

  if (sortedList.length % 2 === 0) {
    return Math.floor(
      (sortedList[middleItemIndex - 1] + sortedList[middleItemIndex]) / 2
    )
  } else return sortedList[middleItemIndex]
}

export const getMostFrequent = (list) => {
  return list
    .map((listItem) => ({
      listItem,
      count: list.filter((item) => item === listItem).length
    }))
    .sort((a, b) => a.count - b.count)
    .pop().listItem
}
