import indexDB from '@/utils/db'

export class DBRequest {
  instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new DBRequest()
    }
    return this.instance
  }
  async create(options = {}) {
    const { name, data } = options
    const db = await indexDB(name)
    return await db.add(name, data)
  }

  async delete(options = {}) {
    const { name, id } = options
    const db = await indexDB(name)
    await db.delete(name, id)
  }

  async edit(options = {}) {
    const { name, data } = options
    const db = await indexDB(name)
    await db.put(name, data)
  }

  async getFind(options = {}) {
    const { name, id } = options
    const db = await indexDB(name)
    return await db.getFromIndex(name, 'id', id)
  }

  async getList(options = {}) {
    const { name, params } = options
    const db = await indexDB(name)
    const list = await db.getAll(name)
    const length = list.length
    const { page, count } = params
    const start = (page - 1) * count
    let end = page * count - 1

    if (start > length) {
      return {
        data: [],
        total: length
      }
    }

    if (end > length) {
      end = length
    }

    return {
      data: list.slice(start, end + 1),
      total: length
    }
  }
}
