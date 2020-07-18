const [bin, file, mapfile='default'] = process.argv

const { joycon } = require('./joycon.r')
const mapping = require(`./mappings/${mapfile}`)

console.log(`process started with ${mapfile} mapping.`)

joycon.on('INPUT', data => {
  try {
    Object.keys(mapping).includes(data) && mapping[data]()
  } catch (error) {
    console.error(error)
  }
})
