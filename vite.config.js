import { minify } from "terser";

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
    outDir: "docs", // 出力先ディレクトリ
    assetsDir: "./assets",
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
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  plugins: [
    {
      name: "terser",
      apply: "build",
      async generateBundle(_, bundle) {
        for (const name in bundle) {
          const file = bundle[name];
          if (file.type === "chunk") {
            // JavaScriptファイルを圧縮する
            const result = await minify(file.code, {
              format: {
                comments: false,
              },
            });

            // 圧縮されたコードを更新する
            file.code = result.code;
          }
        }
      },
    },
  ],
};

// Unicodeエスケープシーケンスの原因はViteでデフォルトで入っているpostcssのcssnanoによるminifyが原因
// UnicodeエスケープシーケンスされるのはSCSS→CSSにトランスパイルした後、ビルド後のCSSをminifyされる過程で変換される
// cssの圧縮は別でpostcss.config.jsを作成、cssnanoの設定をそこで書く。
// 対応策として、build.minifyはfalseにし、minifyする処理は自分で書いて解決を図る
// build.minifyをfalseにするとjsも圧縮されないため、カスタムプラグインを作成してminifyする必要がある
// JSのminifyはデフォルトのesbuildのminifyからterserを使うので1%~2%ファイル容量が増えることが課題
