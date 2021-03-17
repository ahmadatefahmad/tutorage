<template>
  <div class="bg-var col-3 container overflow-hidden hide-scrollbar ">
      <!-- Search -->
      <div class="row shadow-2  no-wrap q-pa-md q-gutter-md">

      <q-avatar size="40px">
        <img referrerPolicy="no-referrer" :src="$store.getters.user.photoURL" alt="user profile picture">
      </q-avatar>

        <q-input class="full-width q-pl-sm" outlined rounded label="Search" v-model="searchingFor" :dense="true">
          
          <template  v-slot:append>
            <q-icon name="search" />
          </template>

        </q-input>
         <q-btn v-if="$store.getters.userInfo.role=='tutor'" dense flat class="q-mx-none" rounded icon="add">
            <q-menu class="col" anchor="bottom end" self="top end">
              <q-item  v-for="(req, index) in $store.getters.requests" :key="index" >
                <p class="text-h6  text-justify	 q-mb-none">{{req.userInfo.name}} 
                <q-btn icon="add" round flat dense @click="          
                $store.dispatch('inviteToClassroom',{courseId:$route.params.id, userId: req.studentId, tutorId: req.tutorId})"/></p>
              </q-item>
            </q-menu>
          </q-btn>
      </div>

      <!-- chat attendants area -->
      <q-scroll-area class=" fit overflow-auto" :thumb-style="$store.getters.scrollThumb">
        
        <!-- User Baner -->
        <div
          class="q-pa-md col no-wrap items-center"
          v-hoverEffect="'shadow-10 bg-hover'"
          v-for="(user, index) in attendats"
          :key="index">

          <div class="row">
            
            <q-badge :color="isUserOnline(user.uid) ? 'positive' : 'negative' " class=" q-mr-sm" rounded/> 
            
            <div class="col q-ml-sm center">
                <p class="text-h6 full-width text-weight-light q-ma-none">{{ user.fullname }}
                  <q-btn
                    v-if="user.role != 'tutor' && $store.getters.userInfo.role =='tutor' && user.uid != $store.getters.user.providerData[0].uid"
                    @click="userToDelete = user; deleteStudentConfirm = true;"
                    class="float-right q-mt-sm text-negative"
                    round
                    dense
                    icon="remove_circle" />
                </p>
              <p class="q-ma-none" v-if="!isUserOnline(user.uid)">Since: {{ lastActiveDate(user.uid) }}</p>
              <p class="q-ma-none" v-else>&nbsp; </p>
            </div>
            
            <q-dialog q-dialog v-model="deleteStudentConfirm">
              <q-card>
                <q-card-section class="row items-center bg-var text-var">
                  <q-avatar icon="block" color="primary" text-color="white"/>
                  <span class="q-ml-sm">Are you sure you want to unsubscribe {{userToDelete.fullname}} from that course?</span>
                </q-card-section>

                <q-card-actions align="right" class="bg-var text-var">
                  <q-btn
                    flat
                    v-hoverEffect="'shadow-5'"
                    label="Confirm"
                    @click="$store.dispatch('unsubscribeCourse', {courseId: $route.params.id, uid: userToDelete.uid})"
                    class="bg-primary"
                    v-close-popup />

                    <q-btn
                      v-hoverEffect="'shadow-5'"
                      flat
                      label="Cancel"
                      class="bg-negative"
                      v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

          </div>
        </div>

      </q-scroll-area>
      
    </div>
</template>

<script>
export default {

  data(){
    return{
      searchingFor: '',
      userToDelete:{},
      deleteStudentConfirm: false,
    }
  },

  computed:{
    attendats(){
      if(this.searchingFor != ''){
        return this.$store.getters.chatRoom.users.filter(user => {
          return user.fullname.toLowerCase().indexOf(this.searchingFor.toLowerCase()) != -1
      })
      }else{
        return this.$store.getters.chatRoom.users
      }
    }
  },

  methods:{
    isUserOnline(uid){
      for(let key in this.$store.getters.usersStatus){
        if(uid == key){
          return this.$store.getters.usersStatus[key].state =='online' ? true : false
        }
      }
    },

    lastActiveDate(uid){
      let date = this.$store.getters.usersStatus[uid].last_changed
      return new Date(date).toLocaleTimeString("en-US").slice(0,-6)+
        new Date(date).toLocaleTimeString("en-US").slice(-3)+ ' '+ 
        new Date(date).toLocaleDateString("en-US")
    },
  },
}
</script>

<style scoped>
.container{
border-right: 1px solid rgba(206, 206, 206, 0.7);
border-radius: 5px 0 0 5px;
}
</style>