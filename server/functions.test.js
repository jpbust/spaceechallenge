const functions = require('./functions')

test('Testing nasa rover connection', ()=>{
  expect.assertions(1)
  return functions.nasaAPI('2021-10-16').then(({photos})=>{
      expect(photos[0].id).toEqual(887207)
  })
})