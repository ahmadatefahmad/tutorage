<template>
  <q-page class="flex flex-center">
  
    <q-toggle
      v-model="isTeacher"
      color="primary"
    />
    <q-btn label="Sign Up" @click="handleSigning(role)"/>
    <q-btn label="Sign In" @click="handleSigning(null)"/>
  </q-page>
</template>



<script>

import { mapGetters, mapActions } from 'vuex'



export default {
  name: 'PageIndex',
  

  data(){
    return{
      isTeacher: false,
    }
  },

  computed:{
      role() { return this.isTeacher ? 'teacher' : 'student' }
  },

  methods:{
    async handleSigning(role){
    
     this.$store.dispatch('loginOrRegister', role)
    },
    ...mapActions(['loginOrRegister','listFiles'])

  },
}
</script>
