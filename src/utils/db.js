import { openDB } from 'idb'
const name = require('../../package.json').name

export default async function DB(tableName) {
  const db = await openDB(name, 2, {
    upgrade(db2) {
      const testStore = db2.createObjectStore(tableName, {
        keyPath: 'id',
        autoIncrement: true
      })
      testStore.createIndex('id', 'id', {
        unique: true
      })
    }
  })

  return db
}
