'use strict'

function isObject (input) {
  return Object.prototype.toString.call(input) === '[object Object]'
}

function encodeArray (inArray) {
  let accumulator = ''

  for (const item of inArray) {
    if (Array.isArray(item)) {
      accumulator += encodeArray(item)
      continue
    }
    if (isObject(item)) {
      accumulator += encodeObject(item)
      continue
    }
    const _item = item.toString()
    accumulator += `${_item.length}<${_item}>`
  }

  return `${accumulator.length}[${accumulator}]`
}

function encodeObject (inObject) {
  let accumulator = ''
  const keys = Object.keys(inObject)
  for (const key of keys) {
    if (Array.isArray(inObject[key])) {
      const encodedVal = encodeArray(inObject[key])
      const _key = key.toString()
      accumulator += `${_key.length}<${_key}>${encodedVal}`
      continue
    }
    if (isObject(inObject[key])) {
      const encodedObj = encodeObject(inObject[key])
      const _key = key.toString()
      const val = `${_key.length}<${_key}><${encodedObj}>`
      continue
    }
    const _key = key.toString()
    const _val = inObject[key].toString()
    accumulator += `${_key.length}<${_key}>${_val.length}<${_val}>`
  }

  return `${accumulator.length}{${accumulator}}`
}

function encode (input) {
  // TODO: handle buffers
  if (Array.isArray(input)) return encodeArray(input)
  if (isObject(input)) return encodeObject(input)
  if (Number.isFinite(input)) return `${input.toString().length}<${input}>`
  return `${input.length}<${input}>`
}

module.exports = {encode}
