import Vue from 'vue'
import Vuex from 'vuex'

import { createProxy, extractVuexModule } from 'vuex-class-component'
import { ProgrammingProjectsStore } from '@/store/modules/programmingProjects'

/* import firebase from 'firebase/app'
import 'firebase/firestore' */
import { firestoreAction, vuexfireMutations } from 'vuexfire'

// This allows our 'default' layout to import 'store'
Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(ProgrammingProjectsStore),
  },
  actions: {
    bindProgrammingProjectsCollection: firestoreAction(
      async ({ bindFirestoreRef }) => {
        const firebase = await import(
          /* webpackChunkName: "firebase", webpackPreload: true */ 'firebase/app'
        )
        await import(
          /* webpackChunkName: "firestore", webpackPreload: true */ 'firebase/firestore'
        )
        const db = firebase.firestore()
        await bindFirestoreRef(
          'programmingProjects.projects',
          db.collection('v1/programming/projects'),
          { wait: true }
        )
      }
    ),
    unbindProgrammingProjectsCollection: firestoreAction(
      ({ unbindFirestoreRef }) => {
        unbindFirestoreRef('programmingProjects.projects')
      }
    ),
  },
  mutations: {
    ...vuexfireMutations,
  },
})

export const vxm = {
  programmingProjects: createProxy(store, ProgrammingProjectsStore),
}
