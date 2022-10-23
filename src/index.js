import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth'
import {addDoc, collection, getFirestore, onSnapshot, serverTimestamp, where, query, orderBy} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyAOniFHvCv09ad8ASt0PTK_VNEqQWOhrTI',
    authDomain: 'memorycards-1.firebaseapp.com',
    projectId: 'memorycards-1',
    storageBucket: 'memorycards-1.appspot.com',
    messagingSenderId: '710523153986',
    appId: '1:710523153986:web:ed3badd6ad28b92dbf87db',
    measurementId: 'G-1QTK0WGP8R'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const signedInSection = document.querySelector('#signedIn')
const userNameSpan = document.querySelector('#user-name')
const signOutButton = document.querySelector('#signOut')
const testList = document.querySelector('#test-list')
const testForm = document.querySelector('#new-test-item-form')

const signedOutSection = document.querySelector('#signedOut')
const signInButton = document.querySelector('#signIn')

signInButton.onclick = () => signInWithPopup(auth, new GoogleAuthProvider())
signOutButton.onclick = () => signOut(auth)

let testRef;
let unsubscribe;

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user !== null) {
        signedOutSection.hidden = true
        signedInSection.hidden = false
        userNameSpan.textContent = user.displayName

        testRef = collection(db, 'test')
        testForm.onsubmit = (e) => {
            e.preventDefault()
            addDoc(testRef, {
                uid: user.uid, word: e.target.word.value, createdAt: serverTimestamp()
            })
            e.target.word.value = ''
        }

        const q = query(testRef, where('uid', '==', user.uid), orderBy('createdAt'))
        unsubscribe = onSnapshot(q, querySnapshot => {
            testList.innerHTML = querySnapshot.docs.map(doc => `<li>${doc.data().word}</li>`).join('')
        })

    } else {
        signedOutSection.hidden = false
        signedInSection.hidden = true

        unsubscribe && unsubscribe()
    }
})