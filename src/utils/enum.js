/**
 * Used to provide config privacy.
 */
const CONFIG_SYMBOL = Symbol('config')

const parse = function parse(value) {
  const detail = Object.values(this[CONFIG_SYMBOL]).find(e => e.value === value)

  if (typeof detail !== 'undefined') {
    return detail.name
  }

  throw new RangeError('Enum parse failed')
}

const getValues = function getValues() {
  const config = this[CONFIG_SYMBOL]
  return Object.values(config)
}

const getValue = function getValue(target) {
  const config = this[CONFIG_SYMBOL]
  if (Object.hasOwnProperty.call(config, target)) {
    return config[target]
  } else {
    throw new RangeError('Invalid target')
  }
}

const getLang = function getLang(value) {
  const detail = Object.values(this[CONFIG_SYMBOL]).find(e => e.value === value)

  if (typeof detail !== 'undefined') {
    return detail.lang
  }

  throw new RangeError('Enum parse lang failed')
}

const getKeys = function getKeys() {
  return Object.keys(this[CONFIG_SYMBOL])
}

const is = function is(target, ...enums) {
  const config = this[CONFIG_SYMBOL]

  const configKeys = Object.keys(config)
  const isValidEnums = enums.every(identifier => configKeys.includes(identifier))

  if (isValidEnums) {
    return enums.some(key => {
      return Object.hasOwnProperty.call(config, key) && config[key].value === target
    })
  } else {
    throw new RangeError('Parameter `enums` must be valid identifiers')
  }
}

/**
 * Enum factory.
 * public APIs should be prefixed with `$`
 * in order to prevent naming collision with `config` keys.
 * @param {Object} config
 * @return {Object}
 */
export default function enumFactory(config) {
  const publicAPIs = {
    parse,
    getKeys,
    getValues,
    getValue,
    is,
    getLang
  }

  // do NOT point to Object.prototype to prevent naming collision with `config`
  const prototype = Object.create(null)
  Object.keys(publicAPIs).forEach(api => {
    prototype[`$${api}`] = publicAPIs[api]
  })

  const _object = Object.create(prototype)
  // `CONFIG_SYMBOL` to provide data privacy for `config`
  _object[CONFIG_SYMBOL] = config

  // Object.defineProperty to make sure config settings are immutable
  Object.keys(config).forEach(key => {
    Object.defineProperty(_object, key, {
      enumerable: false,
      configurable: false,
      writable: false,
      value: config[key]
    })
  })

  return _object
}
