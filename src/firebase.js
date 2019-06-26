import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyDALo-6fZOxhWR_8lYM2pzf3g-kpZsxioQ',
  authDomain: 'supply-form.firebaseapp.com',
  databaseURL: 'https://supply-form.firebaseio.com',
  projectId: 'supply-form',
  storageBucket: 'supply-form.appspot.com',
  messagingSenderId: '527012494937'
})

export const db = app.firestore()
export const login = app.auth()