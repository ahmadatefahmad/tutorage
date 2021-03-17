<template>
  <div>
    <loading-image v-if="!loadingIsDone" :imageType="'files'"/>
    <course-material v-show="loadingIsDone" v-on:loadingIsDone=" loadingIsDone = true" class="q-mb-lg" v-for="course in courses.activeCourses" :key="course.id" :course="course"/>
  </div>
</template>

<script>
import courseMaterial from 'src/components/courseMaterial.vue' 
import loadingImage from 'src/components/UI/loadingImage.vue' 

import { mapGetters } from 'vuex'

export default {

  data(){
    return{
      loadingIsDone: false
    }
  },

  components:{
    courseMaterial,
    loadingImage
  },

  async beforeMount(){
    await this.$store.dispatch('listCourses')
  },

  computed:{
    ...mapGetters(['courses']),
  },

}
</script>

<style>

</style>