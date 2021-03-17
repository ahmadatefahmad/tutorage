
import {firebaseDB, firestore} from 'boot/firebase'
import firebase from "firebase";

const state = () => ({
  user: null,
  userStatus: null,
  userInfo:null
})
  
const actions = {

  async loginOrRegister({commit, dispatch}, {role, signin}){
    
    await this._vm.$gapi.login().then( promise =>{

      const credential  = firebase.auth.GoogleAuthProvider.credential(
        promise.currentUser.getAuthResponse().id_token,
        promise.currentUser.getAuthResponse().access_token
      )

      firebase.auth().signInWithCredential(credential).then( promise =>{
        let collectionType = role == 'tutor'? "tutors" : "students"
        firestore.collection(collectionType).doc(promise.user.providerData[0].uid)
        .get().then(doc =>{
          if(doc.data()){       
            commit("SET_USER", promise.user)
            commit("SET_USER_INFO", doc.data())
            this.$router.push('/profile/'+promise.user.uid)
          }else{
            if(!signin){
              firestore.collection(collectionType).doc(promise.user.providerData[0].uid)
              .set({
                role,
                basicInfo:{city:''},
                name:promise.user.displayName,
                photoUrl:promise.user.photoURL})

              commit("SET_USER", promise.user)
              commit("SET_USER_INFO", {role})
              this.$router.push('/profile/'+promise.user.uid)
            }else{
              this._vm.$gapi.logout().then(() => {
                firebase.auth().signOut()        
                this.$router.push({
                  path:'/auth', 
                  query: { signin : false }})
              })
            }
          }
        })
      })
    })

  },

  async logout({commit}){

    await this._vm.$gapi.logout().then(() => {
      
      this.$router.go('/')
      firebase.auth().signOut()

    })
    
    commit('SET_USER', null)
    commit('SET_USER_STATUS', null)
    commit('SET_USER_INFO', null)
    
  },

  async handleAuthChange({commit, dispatch}){

    await firebase.auth().onAuthStateChanged(user => {
      if(user){

        var userStatusDatabaseRef = firebaseDB.ref('/status/' + user.providerData[0].uid);
  
        var isOfflineForDatabase = {
            state: 'offline',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        };
  
        var isOnlineForDatabase = {
            state: 'online',
            last_changed: firebase.database.ServerValue.TIMESTAMP,
        }
  
        firebaseDB.ref('.info/connected').on('value', function(snapshot) {
          if (snapshot.val() == false) {
            return;
          };
  
          userStatusDatabaseRef.onDisconnect().set(isOfflineForDatabase).then(function() {
            
            userStatusDatabaseRef.set(isOnlineForDatabase);
  
            userStatusDatabaseRef.once('value', (snapshot)=> {
              commit("SET_USER_STATUS", snapshot.val())
            })
          });
        })
      }
    })
  },

  async getProfileInfo({commit, state}){
    let collectionType = state.userInfo.role == 'tutor'? "tutors" : "students"
    firestore.collection(collectionType).doc(state.user.providerData[0].uid)
    .get().then(doc =>{
      commit("SET_USER_INFO", doc.data())
    })
  },

  async updateProfile({dispatch, state}, {type, info}){
    let collectionType = state.userInfo.role == 'tutor'? "tutors" : "students"
   await firestore.collection(collectionType).doc(state.user.providerData[0].uid)
    .set({
      [type.valueOf()]: info
    }, 
      { merge: true }
    )

    dispatch('getProfileInfo')
  },


}

const mutations = {

  SET_USER(state, user){
    state.user = user
  },

  SET_USER_STATUS(state, status){
    if(state.user) state.user.status = status
  },

  SET_USER_INFO(state, info){
    state.userInfo = info
  },

  SET_SIGNINGIN(state, {signingIn, userType}){
    state.signingIn = signingIn
    state.userType = userType
  }

  
}

const getters = {   
  user:(state)=>state.user,
  userInfo:(state)=>state.userInfo,
  signingIn:(state)=>state.signingIn,
  userType:(state)=>state.userType

}

export default {
  state,
  getters,
  actions,
  mutations
}