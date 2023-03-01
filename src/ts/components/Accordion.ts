import Alpine from "alpinejs";

// アニメーションの時間とイージング
const animTiming = {
  duration: 300,
  easing: "ease-out",
};
// アコーディオンを閉じるときのキーフレーム
const closingAnimKeyframes = (content: HTMLElement) => [
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];
// アコーディオンを開く時のキーフレーム
const openingAnimKeyframes = (content: HTMLElement) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];

export const Accordion = () => {
  return {
    // リアクティブ変数
    reactiveVal: Alpine.reactive({ running: false, open: false }),

    // アコーディオン開く
    openAccordion(content: HTMLElement) {
      const closingAnim = content.animate(
        closingAnimKeyframes(content),
        animTiming
      );
      this.reactiveVal.running = true;
      // アニメーションの完了後に
      closingAnim.onfinish = () => {
        // open属性を取り除く
        this.reactiveVal.open = false;
        this.reactiveVal.running = false;
      };
    },

    // アコーディオン閉じる
    closeAccordion(content: HTMLElement) {
      this.reactiveVal.open = true;
      // 開くアニメーションを実行
      const openingAnim = content.animate(
        openingAnimKeyframes(content),
        animTiming
      );
      this.reactiveVal.running = true;
      // アニメーション完了後にアニメーション実行中用の値を取り除く
      openingAnim.onfinish = () => {
        this.reactiveVal.running = false;
      };
    },

    // クリック後の処理
    clickHandler(content: HTMLElement) {
      // 連打防止
      if (this.reactiveVal.running) {
        return;
      }
      // アコーディオンが開いていたら閉じる
      if (this.reactiveVal.open) {
        return this.openAccordion(content);
      }
      // アコーディオンが閉じていたら開く
      return this.closeAccordion(content);
    },
  };
};
