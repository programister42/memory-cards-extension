import { auth } from "../firebase/firebase_config";
// import {
//   addDoc,
//   collection,
//   getFirestore,
//   onSnapshot,
//   orderBy,
//   query,
//   serverTimestamp,
//   where,
// } from "firebase/firestore";
//
// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);
//
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithCredential,
  signOut,
} from "firebase/auth";

const signedInSection = document.querySelector("#signedIn");
const userNameSpan = document.querySelector("#user-name");
const signOutButton = document.querySelector("#signOut");
// const testList = document.querySelector("#test-list");
// const testForm = document.querySelector("#new-test-item-form");
//
const signedOutSection = document.querySelector("#signedOut");
const signInButton = document.querySelector("#signIn");

const showLoginSection = () => {
  signedOutSection.hidden = false;
  signedInSection.hidden = true;
};

const showDefaultSection = (name) => {
  signedOutSection.hidden = true;
  signedInSection.hidden = false;
  userNameSpan.textContent = name;
};

const toggleSections = (user) =>
  user ? showDefaultSection(user.displayName) : showLoginSection();

const getGoogleAuthCredential = () => {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      }
      const credential = GoogleAuthProvider.credential(null, token);
      resolve(credential);
    });
  });
};
//
// const signIn = async () => {
//   try {
//     await setPersistence(auth, browserLocalPersistence);
//     const credential = await getGoogleAuthCredential();
//     const result = await signInWithCredential(auth, credential);
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

const getSignIn = async (auth) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      const credential = GoogleAuthProvider.credential(null, token);
      signInWithCredential(auth, credential);
    });
  } catch (e) {
    console.error(e);
  }
};

signInButton.onclick = () => getSignIn(auth);
signOutButton.onclick = () => signOut(auth);

onAuthStateChanged(auth, toggleSections);
//

//
// let testRef;
// let unsubscribe;
//
// // Detect auth state
// onAuthStateChanged(auth, (user) => {
//   if (user !== null) {
//     signedOutSection.hidden = true;
//     signedInSection.hidden = false;
//     userNameSpan.textContent = user.displayName;
//
//     testRef = collection(db, "test");
//     testForm.onsubmit = (e) => {
//       e.preventDefault();
//       addDoc(testRef, {
//         uid: user.uid,
//         word: e.target.word.value,
//         createdAt: serverTimestamp(),
//       });
//       e.target.word.value = "";
//     };
//
//     const q = query(
//       testRef,
//       where("uid", "==", user.uid),
//       orderBy("createdAt")
//     );
//     unsubscribe = onSnapshot(q, (querySnapshot) => {
//       testList.innerHTML = querySnapshot.docs
//         .map((doc) => `<li>${doc.data().word}</li>`)
//         .join("");
//     });
//   } else {
//     signedOutSection.hidden = false;
//     signedInSection.hidden = true;
//
//     unsubscribe && unsubscribe();
//   }
// });
