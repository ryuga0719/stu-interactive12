import Alpine from "alpinejs";
import { accordionItems } from "../mock/mockData";
import AccordionAnimation from "../logic/AccordionAnimation";
import { AccordionStore as Store } from "../logic/AccordionStore";

export const accordion = () => {
  // 初期化
  const init = () => {
    // LocalStorageにすでにデータがあれば、データを読み込む
    Store.checkStoredData(accordionItems);

    // ページロード前にアコーディオンの状態を登録
    window.addEventListener("beforeunload", () => {
      Store.setAccordionState(accordionItems);
    });
  };

  init(); // 初期化

  return {
    items: accordionItems,
    // リアクティブ変数
    reactiveVal: Alpine.reactive({ running: false }),

    // アコーディオン閉じる
    closeAccordion(index: number, content: HTMLElement) {
      // 閉じるアニメーション作成
      const closingAnim = AccordionAnimation.createClosingAnimation(content);

      this.reactiveVal.running = true;

      // アニメーションの完了後にstate変更
      closingAnim.onfinish = () => {
        this.reactiveVal.running = false;

        // Storeの更新
        this.items[index].isOpen = false;
        Store.updateLocalStorageState(index, this.items[index].isOpen);
      };
    },

    // アコーディオンを開く
    openAccordion(index: number, content: HTMLElement) {
      // Storeの更新
      this.items[index].isOpen = true;
      Store.updateLocalStorageState(index, this.items[index].isOpen);

      // 開くアニメーションを作成
      const openingAnim = AccordionAnimation.createOpeningAnimation(content);

      this.reactiveVal.running = true;

      // アニメーション完了後にstate変更
      openingAnim.onfinish = () => {
        this.reactiveVal.running = false;
      };
    },

    // クリック後の処理
    toggleItem(index: number, content: HTMLElement) {
      // 連打防止
      if (this.reactiveVal.running) {
        return;
      }

      // アコーディオンが開いていたら閉じる
      if (this.items[index].isOpen) {
        return this.closeAccordion(index, content);
      }

      // アコーディオンが閉じていたら開く
      return this.openAccordion(index, content);
    },
  };
};
