/*==============================
=========== IMPORTS ============
==============================*/

// HUMAN INTERFACE DEVICES
const HID = require('node-hid')

// FILESYSTEM
const fs = require('fs')

// BUFFER MAPPINGS
const { buffers, release } = require('./buffers')

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

const is_release = buffcode => buffcode === release

/*==============================
========== LISTENERS ===========
==============================*/

// CREATE HID DEVICE INSTANCE
let joycon = init_joycon('98b6e9fc2f2e')

// CREATE EVENT LISTENER
joycon.on('data', buffer => {  
  // COMPRESS BUFFER DATA
  const buffcode = map_data(buffer)
  // ADD NEW BUFFER DATA TO FILE
  if (!buffers[buffcode]) fs.appendFileSync('./new_input.json', buffcode + '\n')
  // EMIT RELEASE OR INPUT EVENT
  else buffcode === release
    ? joycon.emit('RELEASED')
    : joycon.emit('INPUT', buffers[buffcode])
})

joycon.on('error', err => console.error(err))

/*==============================
=========== EXPORTS ============
==============================*/

module.exports = { joycon }