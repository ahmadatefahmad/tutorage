import {firestore} from 'boot/firebase'
import firebase from "firebase";

const requestsRef = firestore.collection("requests").doc("requests")

const state = () => ({
})
  
const actions = {

  async fetchRequests({ commit}, {role, uid}){
    
    let requests = []
    if(role == 'tutor'){
      requestsRef.get().then(doc =>{
        for(let req of doc.data().requests){
          if(req.tutorId == uid){

            firestore.collection("students").doc(req.studentId)
            .get().then(doc =>{
              req.userInfo = doc.data()
              requests.push(req)
            })

          }
        }
      })

    }else{
      requestsRef.get().then(doc =>{
        for(let req of doc.data().requests){
          if(req.studentId == uid){

            firestore.collection("tutors").doc(req.tutorId)
            .get().then(doc =>{
              req.userInfo = doc.data()
              requests.push(req)
            })

          }
        }
      })
    }

    commit('SET_REQUESTS', requests)
    
  },

  async requestedAlready({ commit }, {studentId,tutorId}){
    let reqAlready = false
    await requestsRef.onSnapshot(doc =>{
      for( let req of doc.data().requests ){
        if(req.studentId == studentId && req.tutorId == tutorId ){
          reqAlready = true
          break
        }
      }
      commit('SET_REQUESTED_ALREADY', reqAlready)
    })

  },

  async requestLesson({ commit, dispatch}, {studentId,tutorId, msg}){
   await requestsRef.set(
     {requests: firebase.firestore.FieldValue.arrayUnion({studentId,tutorId,msg})}
    ,{merge:true})
  },

  async removeRequest({ commit, dispatch }, {studentId,tutorId}){
    await requestsRef.get()
    .then(doc =>{
      let requests = doc.data().requests
      .filter(req => req.studentId !== studentId || req.tutorId !== tutorId)
      
      requestsRef.set({requests},{merge:true})
    })

    dispatch('requestedAlready', {studentId,tutorId})
    dispatch('fetchRequests', {role:'teacher',uid:tutorId})
  },

}

const mutations = {

  SET_REQUESTED_ALREADY(state, val){
    state.requestedAlready = val
  },

  SET_REQUESTS(state, requests){
    state.requests = requests
  }
}

const getters = {
  requestedAlready:(state)=>state.requestedAlready,
  requests:(state)=>state.requests
}

export default {
  state,
  getters,
  actions,
  mutations
}
