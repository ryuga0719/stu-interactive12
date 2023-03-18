const cssnano = require("cssnano");

module.exports = {
  plugins: [
    cssnano({
      preset: [
        "default",
        {
          minifyFontValues: {
            removeQuotes: false, // 引用符を除去しない
          },
        },
      ],
    }),
  ],
};
