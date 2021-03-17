<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

// VUE
import Vue from 'vue'

// VUE Google Api Client
import VueGapi from 'vue-gapi'

// AOS - scrolling animation
import AOS from 'aos'
import 'aos/dist/aos.css'

// hovering effect directive
import hoverEffect from 'boot/directives/hoverEffect'


const config = {
  apiKey: 'AIzaSyD22FHl7ERk44bLp4xV1lyLWOVfUQ0WOxo',
  clientId: '209948946918-8abi3mjf4gdaka63vcr04liidi4nmvnm.apps.googleusercontent.com',
  scope: "https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.profile.photos",
  redirect_uris: ['http://localhost:8080','https://tutorage-c258d.web.app'],
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest" ,"https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
}

AOS.init()
Vue.use(VueGapi, config)

export default {
  name: 'App',
  
  mounted() {
    this.$store.dispatch('handleAuthChange')
  },
  
}
</script>
