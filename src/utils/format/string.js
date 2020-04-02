const camelizeRE = /-(\w)/g

/**
 *  a-b-c aBC
 * @param {String} str
 */
export function camelize(str) {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase())
}

/**
 *  1 -> 01  11 -> 11
 * @param {String|Number} num
 * @param {Number} targetLength
 */
export function padZero(num, targetLength = 2) {
  let str = num + ''
  while (str.length < targetLength) {
    str = '0' + str
  }
  return str
}
