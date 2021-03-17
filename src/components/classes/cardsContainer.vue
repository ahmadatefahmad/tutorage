<template>
  <div v-if="courses.length > 0">
      <p class="cursor-pointer" @click="isCollapsed = !isCollapsed" >{{type}}
        <q-icon color="primary"
        :name="isCollapsed ? 'keyboard_arrow_down' : 'keyboard_arrow_up'" class="cursor-pointer float-right"/>
      </p>
      <transition appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
        <div v-if="!isCollapsed" :class="$q.screen.xs ? 'justify-center' : 'q-gutter-lg'"  class="row wrap">
          <class-card v-for="course in courses" :key="course.id" :course="course"/>
        </div>
      </transition>
    </div>
</template>

<script>
import classCard from './classCard.vue'

export default {
  data(){
    return{
      isCollapsed: false,
    }
  },
  props:['courses','type'],
  
  emits:['loadingIsDone'],

  components:{classCard}

}
</script>

<style>

</style>