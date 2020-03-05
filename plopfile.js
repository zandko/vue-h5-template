const pageGenerator = require('./plop-templates/page/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt.js')
const interactorGenerator = require('./plop-templates/interactor/prompt.js')
const dbInteractorGenerator = require('./plop-templates/db-interactor/prompt.js')

module.exports = function(plop) {
  plop.setGenerator('page', pageGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
  plop.setGenerator('interactor', interactorGenerator)
  plop.setGenerator('db-interactor', dbInteractorGenerator)
}
