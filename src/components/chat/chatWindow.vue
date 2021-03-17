<template>
  <div :class="$q.screen.width  <= 1023? 'col-12' : ''">
      
      <q-banner :class="isCollapsed? 'top-radius':'one-side-radius'" class=" text-center shadow-1 bg-var" style="z-index:1; height:72px;"> 
        <q-btn class="float-left" flat v-if="$q.screen.width  > 1023" @click="$emit('collapsePanel')" :icon=" isCollapsed ? 'menu':'menu_open'" color="primary"/>
        <q-btn class="float-right" flat @click="showFiles = !showFiles" :label="showFiles ? 'chat': 'files'" />
        <p class="text-h6">{{ $route.query.courseName }}</p>
      </q-banner> 

      <!-- Course Material -->
      <loading-image v-if="showFiles && !loadingIsDone" :imageType="'files'"/>
      <course-material
        :courseId="$route.params.id"
        :courseName="$route.query.courseName"
        v-show="showFiles && loadingIsDone"
        v-on:loadingIsDone=" loadingIsDone = true"/>
        
      <!-- message Container -->
      <messages-container style="max-height:70% !important" v-if="!showFiles" :isCollapsed="isCollapsed"/>

    </div> 
</template>

<script>
import messagesContainer from './messagesContainer.vue'
import courseMaterial from 'src/components/courseMaterial'
import loadingImage from 'src/components/UI/loadingImage'
import chatPanel from 'src/components/chat/chatPanel.vue'


export default {
  
  data(){
    return{
      showFiles: false,
      showPanel: false,
      loadingIsDone: false,
    }
  },

  components:{
    messagesContainer,
    courseMaterial,
    loadingImage,
    chatPanel
  },

  props:['isCollapsed'],
  
}
</script>


<style>


/* when the panel is collapsed */

.full-radius{
 border-radius: 4px
}

.top-radius{
   border-radius: 4px 4px 0 0

}

/* when the panel is expanded */
.one-side-radius{
 border-radius: 0  4px 0 0
}


</style>