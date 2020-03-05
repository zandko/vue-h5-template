const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a interactor',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'interactor name please',
    validate: notEmpty('name')
  }
  ],
  actions: _data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/core/interactors/${name}-interactor.js`,
      templateFile: 'plop-templates/interactor/interactor.hbs',
      data: {
        name: name
      }
    }, {
      type: 'add',
      path: `src/constants/api/${name}.js`,
      templateFile: 'plop-templates/interactor/api.hbs',
      data: {
        name: name
      }
    }]

    return actions
  }
}
