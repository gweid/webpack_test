module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns: 'usage'   按需加载所需要的 polyfill
        useBuiltIns: 'usage',
        // corejs: 3   指定 corejs 版本
        corejs: {
          version: 3,
          // proposals: true // 是否对提议阶段的特性进行支持
        },
        // targets 具体兼容到哪个浏览器
        // 或者可以通过 browserslist 来配置浏览器兼容
        // 如果 targets 和 browserslist 都配置了，targets 会覆盖 browserslist
        // 实际使用更推荐通过 browserslist 来配置，因为 browserslist 不仅仅是可以 babel 可以使用，postcss 也可以使用
        // targets: {
        //   chrome: '58',
        //   firefox: '40',
        //   ie: '9',
        //   edge: '17',
        //   safari: '10',
        // },
      },
    ],
    ['@babel/preset-react']
  ],
  plugins: []
};
