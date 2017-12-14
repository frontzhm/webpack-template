module.exports = {
  // parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'autoprefixer': {},
    // 个人用precss
    // 'postcss-cssnext': {},
    'precss': {},
    'postcss-pxtorem': {
        // rootValue: 16,
        rootValue: 750,
        // 小数点 0.00001rem
        unitPrecision: 5,
        propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'width', 'height'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0
    }
  },
}
