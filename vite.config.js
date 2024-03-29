import { minify } from "terser";
import { splitVendorChunkPlugin } from "vite";
import path from "path";
import { transform } from "esbuild";

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
    outDir: "docs",
    assetsDir: "./assets",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img";
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: "assets/js/vendor/[name]-[hash].js", // ビルド後のチャンクファイル名
        entryFileNames: "assets/js/[name].js", // ビルド後のjsファイル名
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  plugins: [
    splitVendorChunkPlugin(),
    // {
    //   name: "terser",
    //   apply: "build",
    //   async generateBundle(_, bundle) {
    //     for (const name in bundle) {
    //       const file = bundle[name];
    //       if (file.type === "chunk") {
    //         // jsファイルを圧縮する
    //         const result = await minify(file.code, {
    //           format: {
    //             comments: false,
    //           },
    //         });

    //         // 圧縮されたコードを更新する
    //         file.code = result.code;
    //       }
    //     }
    //   },
    // },
    {
      name: "esbuild-minify",
      apply: "build",
      async generateBundle(_, bundle) {
        for (const name in bundle) {
          const file = bundle[name];
          if (file.type === "chunk") {
            // JavaScriptファイルを圧縮する
            const result = await transform(file.code, {
              minify: true,
              format: "esm",
              charset: "utf8",
            });

            // 圧縮されたコードを更新する
            file.code = result.code;
          }
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
};

// Unicodeエスケープシーケンスの原因はViteでデフォルトで入っているpostcssのcssnanoによるminifyが原因
// UnicodeエスケープシーケンスされるのはSCSS→CSSにトランスパイルした後、ビルド後のCSSをminifyされる過程で変換される
// cssの圧縮は別でpostcss.config.jsを作成、cssnanoの設定をそこで書く。
// 対応策として、build.minifyはfalseにし、minifyする処理は自分で書いて解決を図る
// build.minifyをfalseにするとjsも圧縮されないため、カスタムプラグインを作成してminifyする必要がある
// JSのminifyはデフォルトのesbuildのminifyからterserを使うので1%~2%ファイル容量が増えることが課題
