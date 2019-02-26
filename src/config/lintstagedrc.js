module.exports = {
  '*.{ts,tsx}': ['tslint --fix', 'prettier --write', 'git add'],
  '*.{js,jsx,json,yml,yaml,md,html,css,less,scss,graphql}': [
    'prettier --write',
    'git add'
  ]
}
