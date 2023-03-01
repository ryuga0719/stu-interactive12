import Alpine from "alpinejs";
import { Accordion } from "./components/Accordion";

document.addEventListener("alpine:init", () => {
  Alpine.data("Accordion", Accordion);
});

document.addEventListener("DOMContentLoaded", () => {
  Alpine.start();
});

export {};
