import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import UI from './modules/UI'
import course from './modules/course'
import classroom from './modules/classroom'
import requests from './modules/requests'
import calendar from './modules/calendar'
import user from './modules/user'
import findtutor from './modules/findtutor'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const store = new Vuex.Store({
    modules: {
      requests,
      classroom,  
      course,
      user,
      UI,
      findtutor,
      calendar,
    },

    plugins: [createPersistedState({
      storage: window.localStorage     
    })],

    // enable strict mode (adds overhead!)
    // for dev mode only
    // strict: process.env.DEBUGGING
  })

  return store
}