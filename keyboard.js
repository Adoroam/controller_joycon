/*==============================
=========== IMPORTS ============
==============================*/

const robot = require('robotjs')

/*==============================
========== CONSTANTS ===========
==============================*/

/*==============================
========== FUNCTIONS ===========
==============================*/

// PRESS A KEY
const press_key = key => robot.keyTap(key)

// TOGGLE A KEY
const toggle_key = ({ key, down }) => robot.keyToggle(key, down)

// CLICK THE MOUSE
const click = () => robot.mouseClick()

/*==============================
=========== EXPORTS ============
==============================*/

module.exports = { press_key, toggle_key, click }