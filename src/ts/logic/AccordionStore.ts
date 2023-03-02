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
  static updateLocalStorageState(index: number, flg: boolean) {
    localStorage.setItem(`item_${index}_isOpen`, JSON.stringify(flg));
  }

  static setAccordionState(data: StoredAccordionItem[]) {
    localStorage.setItem("accordionState", JSON.stringify(data));
  }

  static checkStoredData(data: StoredAccordionItem[]) {
    const storedState = localStorage.getItem("accordionState");
    if (!storedState) return;
    const savedItems: StoredAccordionItem[] = JSON.parse(storedState);
    // セーブされたデータに応じて、アコーディオンの開閉状態をアップデート
    savedItems.forEach((savedItem, index) => {
      data[index].isOpen = savedItem.isOpen;
    });
  }

  static clearLocalStorage() {
    localStorage.clear();
    alert("正常にLocalStorageをクリアしました。");
  }
}
