import {firebaseDB, firestore} from 'boot/firebase'
import firebase from "firebase";

const state = () => ({
  chatRoom: {},
  usersStatus: null
})
  
const actions = {

  async initRoom({ commit, dispatch }, classId){
    await this._vm.$gapi.getGapiClient().then(client => {

      let users = []

      client.client.classroom.courses.students
      .list({"courseId": classId}).then(res => {
        if(res.result.students){
          for(let student of res.result.students){
            users.push({
              uid: student.userId,
              photoUrl : student.profile.photoUrl.replace(/^/,'https:'),
              fullname: student.profile.name.fullName,
              role : 'student'
            })
          }
        }
      }).then( () =>{
        client.client.classroom.courses.teachers
        .list({"courseId": classId}).then(res => {
          for(let teacher of res.result.teachers){
            users.push({
              uid: teacher.userId,
              photoUrl : teacher.profile.photoUrl.replace(/^/,'https:'),
              fullname: teacher.profile.name.fullName,
              role : 'tutor'
            })
          }
        }).then(() =>{ 
          firestore.collection("classes").doc(classId)
          .set({
              users: users,
          },{ merge: true })
        })
      })
    })
    dispatch('handleRealtimeChat', classId)
  },

  async handleRealtimeChat({ commit, getters},classId){
    
    firestore.collection("classes").doc(classId)
    .onSnapshot((doc) => {
      if(doc.data()){
        let allowedIds= []
        for(let user of doc.data().users){
          allowedIds.push(user.uid)
        }
        if(!allowedIds.includes(getters.user.providerData[0].uid)){
            this.$router.push('/classes')
        }else{
          commit('SET_CHATROOM', doc.data())
        }
      }
    });
  },

  async sendMessage ({ state }, { classId, content, created, uid }) {
   
    await firestore.collection('classes').doc(classId)
    .update({messages: firebase.firestore.FieldValue.arrayUnion({content,created, uid})})
    .catch(err => console.log('Error', err))
  },

  async usersStatus({ commit }){
    await firebaseDB.ref('/status/').on('child_changed',() => {
      firebaseDB.ref('/status/').on('value',snapshot=>{
        commit('SET_USERS_STATUS', snapshot.val())
      })
    })
  },
  
}

const mutations = {
  SET_CHATROOM(state, data ){
    state.chatRoom = data
  },
 
  SET_USERS_STATUS(state, usersStatus){
    state.usersStatus = usersStatus
  },

}

const getters = {
  chatRoom:(state)=>state.chatRoom,
  usersStatus:(state)=>state.usersStatus
}

export default {
  state,
  getters,
  actions,
  mutations
}