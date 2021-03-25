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
        },
      },
    ],
  ],
};
