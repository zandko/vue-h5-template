import { DBRequest } from '../services/indexDB/request'
import Test from '../entities/test'

class TestInteractor {
  service
  constructor(service) {
    this.service = service
  }

  async getTestList(params) {
    try {
      const options = { name: 'test', params }
      const { data, total } = await this.service.getList(options)
      return { data: data.map((item) => new Test(item)), total }
    } catch (error) {
      throw error
    }
  }

  async createTest(data) {
    const options = { name: 'test', data }
    try {
      await this.service.create(options)
    } catch (error) {
      throw error
    }
  }

  async deleteTest(id) {
    const options = { name: 'test', id }
    try {
      await this.service.delete(options)
    } catch (error) {
      throw error
    }
  }

  async updateTest(data) {
    try {
      const options = { name: 'test', data }
      await this.service.edit(options)
    } catch (error) {
      throw error
    }
  }

  async getTest(id) {
    try {
      const options = { name: 'test', id }
      return await this.service.getFind(options)
    } catch (error) {
      throw error
    }
  }
}

const testInteractor = new TestInteractor(DBRequest.getInstance())

export default testInteractor
