import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBo1D_cuOifQ3FoEjzTAyjoJmeE50K_gyU',
  authDomain: 'perposal-9d5d6.firebaseapp.com',
  projectId: 'perposal-9d5d6',
  storageBucket: 'perposal-9d5d6.firebasestorage.app',
  messagingSenderId: '658324707232',
  appId: '1:658324707232:web:c649b671213af9767a76c5',
  measurementId: 'G-1P257S111G',
}

const app = initializeApp(firebaseConfig)

let analytics = null
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export { app, analytics }
