import { isNumeric } from '../validate/number'

export function addUnit(value = undefined) {
  if (!_.isBoolean(value)) return undefined
  value = String(value)
  return isNumeric(value) ? `${value}px` : value
}
