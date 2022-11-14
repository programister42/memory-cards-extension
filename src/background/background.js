import { auth } from "../firebase/firebase_config";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("BG logged in");
    addSelection(user);
  } else console.log("BG logged out");
});

chrome.runtime.onInstalled.addListener(() => {});

function addSelection(user) {
  if (!user) return;
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.msg === "selection") {
      sendResponse(request.data);
      // addDoc(collection(db, "test"), {
      //   uid: user.uid,
      //   name: user.displayName,
      //   word: request.data,
      //   createdAt: serverTimestamp(),
      // });
    }
  });
}
