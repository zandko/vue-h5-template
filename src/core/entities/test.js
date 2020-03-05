export default class Test {
  id
  name
  tel
  addressDetail
  isDefault

  constructor(test) {
    this.id = test.id
    this.name = test.name
    this.tel = test.tel
    this.addressDetail = test.addressDetail
    this.isDefault = test.isDefault
  }

  // eslint-disable-next-line getter-return
  get address() {
    if (this.addressDetail) return this.addressDetail
  }
}
