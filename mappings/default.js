const { press_key, click } = require('../keyboard')

const genKeypress = (...args) => () => {
  args.forEach((key) => press_key(key))
}

const defaultBindings = {
  a: genKeypress('a'),
  b: genKeypress('b'),
  x: genKeypress('x'),
  y: genKeypress('y'),
  r: genKeypress('r'),
  zr: genKeypress('z'),
  plus: genKeypress('+'),
  home: genKeypress('home'),
  sr: genKeypress('pageup'),
  sl: genKeypress('pagedown'),
  j_t: click,
  j_w: genKeypress('left'),
  j_n: genKeypress('up'),
  j_e: genKeypress('right'),
  j_s: genKeypress('down'),
}

module.exports = defaultBindings
