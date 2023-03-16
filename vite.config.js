import path from "path";
import cssnano from "cssnano";

export default {
  lang: "ja-JP",
  base: "./",
  assetsDir: "./",
  server: {
    host: true,
    port: 8888, // 任意のポート番号を書く
  },
  build: {
    minify: false,
    manifest: false,
    publicDir: "public",
    outDir: "docs",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        // ファイルの拡張子と同じディレクトリを作成してbuildする
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        cssnano({
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
              minifyFontValues: {
                removeQuotes: false, // 引用符を除去しない
              },
            },
          ],
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
};
