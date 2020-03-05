import service from '@/core/services/http'

export class Request {
  instance

  static getInstance() {
    if (!this.instance) {
      this.instance = new Request()
    }
    return this.instance
  }

  async post(options = {}) {
    const { data } = await service({
      method: 'post',
      ...options
    })
    return data
  }
  async delete(options = {}) {
    const { data } = await service({
      method: 'delete',
      ...options
    })
    return data
  }

  async put(options = {}) {
    const { data } = await service({
      method: 'put',
      ...options
    })
    return data
  }

  async get(options = {}) {
    const { data } = await service({
      method: 'get',
      ...options
    })
    return data
  }
}
