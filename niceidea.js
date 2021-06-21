"use strict";
const ConsoleInterface = require("./Interface");



(async function main() {
  return ConsoleInterface.init()
    .then(i => i.mainMenu())
    .then(_ => process.exit(0))
})()
