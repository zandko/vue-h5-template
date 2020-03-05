import dayjs from 'dayjs'

const timeFilter = (value) => {
  value = value.toString()
  if (value) {
    if (value.length === 13) {
      return dayjs(Number(value)).format('YYYY-MM-DD HH:mm:ss')
    }
    return dayjs.unix(Number(value)).format('YYYY-MM-DD HH:mm:ss')
  } else {
    return '-'
  }
}

export default {
  timeFilter
}
