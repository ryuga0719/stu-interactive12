interface StoredAccordionItem {
  favorite: number;
  notification: number;
  retweet: number;
  comments: number;
  tag: number;
  isOpen: boolean;
}

export class AccordionStore {
  constructor() {}
  // データを更新する
  static updateLocalStorageState(index: number, flg: boolean) {
    localStorage.setItem(`item_${index}_isOpen`, JSON.stringify(flg));
  }

  // データをセットする
  static setAccordionState(data: StoredAccordionItem[]) {
    localStorage.setItem("accordionState", JSON.stringify(data));
  }

  // LocalStorageにデータがあるか確認し、あれば読み込む
  static checkStoredData(data: StoredAccordionItem[]) {
    const storedState = localStorage.getItem("accordionState");
    if (!storedState) return;
    const savedItems: StoredAccordionItem[] = JSON.parse(storedState);
    // セーブされたデータに応じて、アコーディオンの開閉状態をアップデート
    savedItems.forEach((savedItem, index) => {
      data[index].isOpen = savedItem.isOpen;
    });
  }

  // LocalStorageのデータを削除する
  static clearLocalStorage() {
    localStorage.clear();
    alert("正常にLocalStorageをクリアしました。");
  }
}
