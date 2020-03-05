export const initPlatform = () => {
  const UA = navigator.userAgent
  const info = UA.match(/\s{1}DSBRIDGE[\w\.]+$/g)
  if (info && info.length > 0) {
    const infoArray = info[0].split('_')
    window.$appVersion = infoArray[1]
    window.$systemVersion = infoArray[2]
    window.$platform = infoArray[3]
  } else {
    window.$appVersion = undefined
    window.$systemVersion = undefined
    window.$platform = 'browser'
  }
}

export const createRandomNum = (n) => {
  let rnd = ''
  for (let i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10)
  }
  return parseInt(rnd, 10)
}
