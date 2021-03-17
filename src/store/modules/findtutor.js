import {firebaseDB , firestore} from 'boot/firebase'
import firebase from "firebase";

const tutorRef = firestore.collection("tutors")
const state = () => ({
  subjects: null,
})
  
const actions = {
  async fetchSubjects({ commit }){
    await firebaseDB.ref('/subjects').get().then(snapshot =>{
      commit('SET_SUBJECTS', snapshot.val())
    })
  },

  async filterTutors({ commit }, {subject, country}){
    
    let filteredTutors = []

    if(country){
      await tutorRef.where('specialization', 'array-contains-any', [subject])
      .where('basicInfo.country', '==', country).get()
      .then(docs => {
      docs.forEach(doc => {
        let obj = doc.data()
        obj.id = doc.id
        filteredTutors.push(obj)
      })
    })
    }else{
      await tutorRef.where('specialization', 'array-contains-any', [subject])
      .get()
      .then(docs => {
      docs.forEach(doc => {
        let obj = doc.data()
        obj.id = doc.id
        filteredTutors.push(obj)
      })
    })
    }

    commit('SET_FILTERED_TUTORS', filteredTutors)
  },

  async countries({ commit }){
    await fetch('https://countriesnow.space/api/v0.1/countries')
    .then(res => res.json())
    .then(data=> commit('SET_COUNTRIES', data.data))
  },

  async rateTutor({dispatch}, {studentId, tutorId, rating}){
    await tutorRef.doc(tutorId).set(
      {ratings: firebase.firestore.FieldValue.arrayUnion({studentId, rating})}
      ,{merge:true})
      dispatch('ratedAlready',{studentId, tutorId})
  },

  async ratedAlready({ commit }, {studentId, tutorId}){
    await tutorRef.doc(tutorId).get().then(doc =>{
      if(doc.data().ratings && doc.data().ratings.length > 0){
        let rate = doc.data().ratings
      .filter(rating => rating.studentId == studentId)
       if(rate){
          commit('SET_RATED_ALREADY', true)
        }else{
          commit('SET_RATED_ALREADY', false)
        }
      }else{
        commit('SET_RATED_ALREADY', false)
      }
    })
  },
  

}

const mutations = {

  SET_SUBJECTS(state, subjects){
    state.subjects = subjects
  },

  SET_FILTERED_TUTORS(state, filteredTutors){
    state.filteredTutors = null
    state.filteredTutors = filteredTutors
  },

  SET_COUNTRIES(state,countries){
    state.countries = countries
  },

  SET_RATED_ALREADY(state, ratedAlready){
    state.ratedAlready = ratedAlready
  },
  
}

const getters = {
  subjects:(state)=>state.subjects,
  filteredTutors:(state)=>state.filteredTutors,
  countries:(state)=>state.countries,
  ratedAlready:(state)=>state.ratedAlready
}

export default {
  state,
  getters,
  actions,
  mutations
}
