const mongoose = require('mongoose')
const childProcess = require('child_process')
const { createTerminus } = require('@godaddy/terminus')

/** ==============================
 * @description เป็น HealthCheck
 * ============================ */
module.exports = (app) => {
  function ping (target) {
    return new Promise((resolve, reject) => {
      if (typeof target !== 'string') {
        reject('target must be a string')
      }

      const cmd = `ping -c 3 ${target}`
      childProcess.exec(cmd, (error, stdout, stderr) => {
        const isOK = !!stdout
        resolve(isOK)
      })
    })
  }

  async function onHealthCheck () {
    const isNFSOK = await ping(process.env.VOLUME)
    const connecting = mongoose.connection.readyState === 1
    const connected = mongoose.connection.readyState === 2
    console.log(`{ connecting : ${connecting}, connected : ${connected} }`)
    if ((connecting || connected) && isNFSOK) {
      // Healthy
    } else {
      // Not healthy
      throw new Error()
    }
  }

  function onSignal () {
    mongoose.connection.close()
  }

  createTerminus(app, {
    signal: 'SIGINT',
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal
  })
}
