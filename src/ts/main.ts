import Alpine from "alpinejs";
import { accordion } from "./components/Accordion";
import { clearButton } from "./components/ClearButton";

document.addEventListener("alpine:init", () => {
  Alpine.data("accordion", accordion);
  Alpine.data("clearButton", clearButton);
});

document.addEventListener("DOMContentLoaded", () => {
  Alpine.start();
});

export {};
