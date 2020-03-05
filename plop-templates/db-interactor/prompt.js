const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'db-interactor a view',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'db-interactor name please',
    validate: notEmpty('name')
  }
  ],
  actions: _data => {
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/core/interactors/db-${name}-interactor.js`,
      templateFile: 'plop-templates/db-interactor/interactor.hbs',
      data: {
        name: name
      }
    }]

    return actions
  }
}
