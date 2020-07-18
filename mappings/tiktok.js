const { press_key } = require('../keyboard')

const tiktok = {
  a: () => press_key('a'),
  b: () => press_key('space'),
  x: () => press_key('x'),
  y: () => press_key('y'),
  j_n: () => press_key('up'),
  j_s: () => press_key('down'),
  j_w: () => press_key('left'),
  j_e: () => press_key('right'),
}

module.exports = tiktok