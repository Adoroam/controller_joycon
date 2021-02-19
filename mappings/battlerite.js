const { press_key } = require('../keyboard')

const battlerite = {
  a: () => press_key('a'),
  b: () => press_key('space'),
  x: () => press_key('x'),
  y: () => press_key('y'),
  j_n: () => press_key('w'),
  j_s: () => press_key('s'),
  j_w: () => press_key('a'),
  j_e: () => press_key('d'),
}

module.exports = battlerite