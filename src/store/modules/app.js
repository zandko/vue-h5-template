import { getLocale } from '@/lang'
import { setLanguage } from '@/core/services/cache'

const state = {
  language: getLocale()
}

const mutations = {
  SET_LANGUAGE(state, language) {
    state.language = language
    setLanguage(language)
  }
}

const actions = {
  SetLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
