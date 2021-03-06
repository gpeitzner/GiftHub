const tasks = arr => arr.join(' && ');

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'ng lint',
      'ng test'
    ]),
    'pre-push': tasks([
      'ng lint',
      'ng test'
    ])
  }
}