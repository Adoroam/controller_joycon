const [bin, file, mapping] = process.argv
if (!mapping) {
  console.error('no mapping specified')
  process.exit(0)
}

const { joycon } = require('./joycon.r')
const { press_key } = require('./keyboard')
const { buttons, thumbstick } = require(`./mappings/${mapping}`)

console.log(`process started with ${mapping} mapping.`)

joycon.on('button', (data) => {
  Object.entries(buttons).map(([key, v]) => data === key && press_key(v))
  // .filter(([key, v]) => data === key)
  // .map(([key, v]) => press_key(v))
})

joycon.on('direction', (data) => {
  Object.entries(thumbstick).map(([key, v]) => data === key && press_key(v))
})
