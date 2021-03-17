<template>
  <q-page class="col">
          
    <div v-if="$store.getters.userInfo.role == 'tutor'" class="row justify-end q-mb-md">
      <q-btn label="create course" class="bg-var" @click="creatingCourse = true"/>
    </div>

    <div class="row q-m-md" v-if="$store.getters.userInfo.role == 'student' && $store.getters.invitations && $store.getters.invitations > 0">
      <p class="full-width text-h6">you have {{ $store.getters.invitations }} classroom invitations, go to google classroom to accept it 
        <q-btn @click="$router.absUrl('https://classroom.google.com')" class="bg-var float-right" label="google classroom"/></p>
    </div>

    <create-course @cancel="creatingCourse = false" :creatingCourse="creatingCourse"/>

    <loading-image v-if="!loadingIsDone" :imageType="'classes'"/> 
    
    <div v-show="loadingIsDone">
      
      <cards-container
        :courses="courses.activeCourses"
        :type="'Active Courses'"
        v-on:loadingIsDone=" loadingIsDone = true" />
    
      <q-separator
        v-if="
        courses.archivedCourses.length > 0 && 
        courses.archivedCourses.length > 0"
        inset
        class="q-mb-md"/>

      <cards-container
        :courses="courses.archivedCourses"
        :type="'Archived Courses'"
        v-on:loadingIsDone=" loadingIsDone = true" />

    </div>

  </q-page>
</template>


<script>
import cardsContainer from 'src/components/classes/cardsContainer.vue'
import createCourse from 'src/components/classes/createCourse.vue'
import loadingImage from 'src/components/UI/loadingImage.vue'


import { mapGetters } from 'vuex'


export default {
  components: { cardsContainer, loadingImage, createCourse },

  data(){
    return{
      loadingIsDone: false,
      creatingCourse: false
    }
  },
    
  async beforeMount(){
    await this.$store.dispatch('listCourses')
    if(this.$store.getters.userInfo.role == 'student'){
      this.$store.dispatch('fetchInvitations', this.$store.getters.user.providerData[0].uid)
    }else{
      this.$store.dispatch('fetchRequests', {role:this.$store.getters.userInfo.role, uid:this.$store.getters.user.providerData[0].uid})
    }   
  },

  computed:{
    ...mapGetters(['courses']),
  }

}
</script>

<style>

</style>