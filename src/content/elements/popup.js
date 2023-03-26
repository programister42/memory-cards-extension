import { ElementFactory } from "../ElementFactory";
import { popupTextContainer } from "./popupTextContainer";

const handleClick = (e) => e.stopPropagation();
export const popup = ElementFactory("div", {
  classList: ["memory-cards-extension--revert", "memory-cards-extension"],
  listeners: [["click", handleClick]],
  children: [
    ElementFactory("span", {
      classList: ["material-symbols-rounded"],
      textContent: "translate",
    }),
    popupTextContainer,
    ElementFactory("span", {
      classList: ["material-symbols-rounded"],
      textContent: "expand_more",
    }),
  ],
});
