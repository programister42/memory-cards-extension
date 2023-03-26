import { auth } from "../firebase/firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import {translate} from "@vitalets/google-translate-api";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("BG logged in");
  } else console.log("BG logged out");
});

chrome.runtime.onInstalled.addListener(() => {});

// addDoc(collection(db, "test"), {
//   uid: user.uid,
//   name: user.displayName,
//   word: request.data,
//   createdAt: serverTimestamp(),
// });

chrome.runtime.onMessage.addListener(({ msg, data }, sender, sendResponse) => {
  switch (msg) {
    case "translate":
      translate(data.text, { to: "ru" }).then(({ text }) => {
        chrome.storage.local.set({ translation: text });
      });

      // setTimeout(() => {
      //   chrome.storage.local.set({ translation: "lol_" + data.text });
      // }, 1000);
      sendResponse(true);
      break;
  }
});
