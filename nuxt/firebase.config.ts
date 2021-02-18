import { FirebaseModuleConfiguration } from '@nuxtjs/firebase'

const firebaseConfig: FirebaseModuleConfiguration = {
  config: {
    apiKey: 'AIzaSyDIielVXCOjywG_aW1K0J_kRZz1ol-J9fw',
    authDomain: 'msmsm-work.firebaseapp.com',
    databaseURL: 'https://msmsm-work.firebaseio.com',
    projectId: 'msmsm-work',
    storageBucket: 'msmsm-work.appspot.com',
    messagingSenderId: '860595656800',
    appId: '1:860595656800:web:b1f1e83283f8e5a6ff0b05',
    measurementId: 'G-SJFT9NFNGM',
  },
  services: {
    firestore: {
      enablePersistence: {
        synchronizeTabs: true,
      },
    },
    analytics: true,
  },
}

export default firebaseConfig
