'use strict'

const test = require('tap').test
const lich = require('../')

test('simple value encoder', (t) => {
  t.test('encodes simple values', (t) => {
    const fixtures = [
      {input: '', result: '0<>'},
      {input: 'foo', result: '3<foo>'},
      {input: 42, result: '2<42>'}
    ]

    t.plan(fixtures.length)
    fixtures.forEach((f) => {
      t.is(lich.encode(f.input), f.result)
    })
  })

  t.end()
})

test('array encoder', (t) => {
  t.test('successfully encodes arrays', (t) => {
    const fixtures = [
      {input: ['a', 'b'], result: '8[1<a>1<b>]'},
      {input: ['apple', 'banana', 'orange'], result: '26[5<apple>6<banana>6<orange>]'},
      {input: ['a', ['foo', 'bar']], result: '20[1<a>12[3<foo>3<bar>]]'}
    ]

    t.plan(fixtures.length)
    fixtures.forEach((f) => {
      t.is(lich.encode(f.input), f.result)
    })
  })

  t.end()
})

test('object encoder', (t) => {
  test('can encode objects', (t) => {
    const fixtures = [
      {input: {greeting: 'hello world'}, result: '26{8<greeting>11<hello world>}'},
      {
        input: {
          'selling points': ['simple', 'general', 'human-sympathetic'],
          greeting: 'hello world',
          fruit: ['apple', 'banana', 'orange']
        },
        result: '126{14<selling points>40[6<simple>7<general>17<human-sympathetic>]8<greeting>11<hello world>5<fruit>26[5<apple>6<banana>6<orange>]}'
      }
    ]

    t.plan(fixtures.length)
    fixtures.forEach((f) => {
      t.is(lich.encode(f.input), f.result)
    })
  })

  t.end()
})
