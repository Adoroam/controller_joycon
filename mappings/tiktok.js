const robot = require('robotjs')
const { press_key } = require('../keyboard')

const runSnippet = () => {
  press_key('f12')
  setTimeout(() => {
    robot.keyTap('p', ['control', 'shift'])
  }, 1000)
  setTimeout(() => {
    robot.keyTap('backspace')
    robot.typeString('!click')
  }, 1200)
  setTimeout(() => {
    robot.keyTap('enter')
  }, 1350)
  setTimeout(() => {
    robot.keyTap('f12')
  }, 2000)
}

const tiktok = {
  a: () => press_key('a'),
  b: () => press_key('space'),
  x: () => press_key('x'),
  y: () => press_key('y'),
  j_n: () => press_key('up'),
  j_s: () => press_key('down'),
  j_w: () => press_key('left'),
  j_e: () => press_key('right'),
  home: runSnippet
}

module.exports = tiktok