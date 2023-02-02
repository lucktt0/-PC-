module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off', // 关闭组件命名规则
    // 去掉函数()前面的空格
    'space-before-function-paren': 'off',
    'node/handle-callback-err': 'off',
    'no-unused-expressions': 'off',
    'no-redeclare': 'off',
    'no-sequences': 'off',
    'no-use-before-define': 'off',
    indent: 'off',
    'no-self-assign': 'off',
    eqeqeq: 'off',
    'no-void': 'off',
    'no-unused-vars': 'off',
    'prefer-const': 0,
    camelcase: 'off'
  }
}
