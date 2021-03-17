<template>
  <div>
    <component
      v-if="user.uid == $route.params.id"
      v-bind:is="this.userInfo.role == 'tutor' ? 'teacherProfile' : 'studentProfile' "
      :user="user"
      :userInfo="userInfo"/>

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import studentProfile from '../../components/profile/studentProfile'
import teacherProfile from '../../components/profile/teacherProfile'

export default {

  components:{
    studentProfile,
    teacherProfile
  },

  beforeCreate(){
    this.$store.dispatch('getProfileInfo')
    this.$store.dispatch('countries')
  },

  computed:{
    ...mapGetters(['userInfo','user'])
  }

}
</script>

<style>

</style>