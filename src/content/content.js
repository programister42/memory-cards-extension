import "./content.scss";
import { popup } from "./elements/popup";
import { popupText } from "./elements/popupText";
import { popupTranslation } from "./elements/popupTranslation";
import { popupTextContainer } from "./elements/popupTextContainer";

document.body.append(popup);

// chrome.storage.onChanged.addListener((changes, namespace) => {
//   for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
//     console.log(
//       `Storage key "${key}" in namespace "${namespace}" changed.`,
//       `Old value was "${oldValue}", new value is "${newValue}".`
//     );
//   }
// });

const playChangeAnimation = () => {
  popupTextContainer.style.width = popupTranslation.offsetWidth + "px";
  console.log("play width", popupTranslation.offsetWidth);
  popupText.addClass("change");
  popupTranslation.addClass("change");
};

const revertChangeAnimation = () => {
  popupTextContainer.style.width = popupText.offsetWidth + "px";
  console.log("revert width", popupText.offsetWidth);
  popupText.removeClass("change");
  popupTranslation.removeClass("change");
};

const setFormattedText = (el, text) => {
  const words = text.split(" ");
  el.setText(words.length > 1 ? words[0] + "..." : words[0]);
};

const setTranslation = (changes, namespace) => {
  if (!changes.translation?.newValue) return;
  setFormattedText(popupTranslation, changes.translation.newValue);
  playChangeAnimation();
};

let prevSelection;
document.addEventListener("mouseup", (e) => {
  popup.removeClass("memory-cards-extension--visible");
  chrome.storage.onChanged.removeListener(setTranslation);
  const selection = window.getSelection().toString().trim();
  if (selection === prevSelection) {
    prevSelection = "";
  } else if (selection && selection !== "") {
    prevSelection = selection;
    popup.addClass("memory-cards-extension--visible");
    setFormattedText(popupText, selection);
    revertChangeAnimation();

    const rect = document.body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    popup.style.top = `${y - popup.offsetHeight - 5}px`;
    popup.style.left = `${x + 5}px`;

    chrome.runtime.sendMessage(
      {
        msg: "translate",
        data: { text: selection },
      },
      () => chrome.storage.onChanged.addListener(setTranslation)
    );
  }
});
