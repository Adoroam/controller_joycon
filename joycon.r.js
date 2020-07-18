/*==============================
=========== IMPORTS ============
==============================*/

// HUMAN INTERFACE DEVICES
const HID = require('node-hid')

// FILESYSTEM
const fs = require('fs')

// BUFFER MAPPINGS
const buffers = require('./buffers')

/*==============================
========== CONSTANTS ===========
==============================*/

// LIST OF DEVICES
let devices = HID.devices()

/*==============================
========== FUNCTIONS ===========
==============================*/

// GET PATH AND CREATE JOYCON OBJECT
const init_joycon = serial => {
  let device_by_serial = devices
    .find(({ serialNumber }) => serialNumber === serial)
  return new HID.HID(device_by_serial.path)
}

// COMPRESS BUFFERS TO 3 DIGITS
const compress = data_arr => data_arr.slice(0, 4).join('.')

// COMPRESS INPUT BUFFER
const map_data = buffer => {
  let buffer_text = JSON.stringify(buffer)
  let json_obj = JSON.parse(buffer_text)
  return compress(json_obj.data)
}

const is_release = input => buffers
  .filter(({ button }) => button === 'q')
  .some(({ data }) => data === input)

/*==============================
========== LISTENERS ===========
==============================*/

// CREATE HID DEVICE INSTANCE
let joycon = init_joycon('98b6e9fc2f2e')

joycon.on('data', buffer => {
  let input = map_data(buffer)
  let found = buffers.find(({ data }) => input === data)
  !!found
    ? is_release(input)
      ? joycon.emit('released')
      : found.button.startsWith('j')
        ? joycon.emit('direction', found.button.replace(/j_(.+)/i, '$1'))  
        : joycon.emit('button', found.button)
    : fs.appendFileSync('./new_input.json', input + '\n')
})

joycon.on('error', err => console.error(err))

/*==============================
=========== EXPORTS ============
==============================*/

module.exports = { joycon }