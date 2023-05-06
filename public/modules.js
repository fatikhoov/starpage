import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDfeym0N_eZN2n6rzYkKoQ696mperZxcmw',
  authDomain: 'starpage-5c9b4.firebaseapp.com',
  projectId: 'starpage-5c9b4',
  storageBucket: 'starpage-5c9b4.appspot.com',
  messagingSenderId: '184753612882',
  appId: '1:184753612882:web:bec6c0c33ae95456d7d78b',
  measurementId: 'G-P1Z1MQSFZJ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

console.log(storage)

import { uploadInputFile } from './js/upload.js'
const forms = document.querySelectorAll('form')

forms.forEach((form) => {
  uploadInputFile('file-callback', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    form: form.id,
  })
})
