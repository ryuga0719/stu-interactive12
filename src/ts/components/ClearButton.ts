import { AccordionStore as Store } from "../logic/AccordionStore";

export const clearButton = () => {
  return {
    clear() {
      Store.clearLocalStorage();
    },
  };
};
