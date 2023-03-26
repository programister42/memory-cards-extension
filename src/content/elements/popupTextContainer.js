import { ElementFactory } from "../ElementFactory";
import { popupText } from "./popupText";
import { popupTranslation } from "./popupTranslation";

export const popupTextContainer = ElementFactory("div", {
  classList: ["memory-cards-extension__text-container"],
  children: [popupTranslation, popupText],
});
