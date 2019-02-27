import Vuex from 'vuex'
import state from './state/state'
import actions from './actions/actions'
import mutations from './mutations/mutations'

export default () => {
  return new Vuex.Store({
    state,
    mutations,
    actions
  })
}
