const appConfig = require('../../app.config')
const createDb = require('../../server/routers/db')

const db = createDb(appConfig.apiCloud.appId, appConfig.apiCloud.appKey)

export default {
  getAllTodos () {
    return db.getAllTodos
  }
}
