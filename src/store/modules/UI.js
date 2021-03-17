const state = () => ({
  miniState : true,
  scrollThumb: {right: '2px', borderRadius: '5px', background: 'lightgrey', width: '6px', opacity: .6}
})
  
const actions = {

}

const mutations = {
  expandSidebar(state){
    state.miniState = false
  },
  collapseSidebar(state){
    state.miniState = true
  },
}

const getters = {
  miniState:(state)=>state.miniState,
  scrollThumb:(state)=>state.scrollThumb
}

export default {
  state,
  getters,
  actions,
  mutations
}