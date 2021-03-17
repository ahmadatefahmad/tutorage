<template>
  <q-page class="row">

    <!-- Chat Panel -->
    <chat-panel v-if="!isCollapsed"/>
    
    <!-- Chat Window -->
    <chat-window
      @collapsePanel="isCollapsed = !isCollapsed"
      :isCollapsed="isCollapsed"
      :class="isCollapsed ? 'col-12' : 'col-9'"/>

  </q-page>
</template>

<script>

import chatWindow from 'src/components/chat/chatWindow.vue'
import chatPanel from 'src/components/chat/chatPanel.vue'

export default {

  data(){
    return{
      isCollapsed: true
    }
  },
  
  components:{
    chatWindow,
    chatPanel
  },

  async created(){
    await this.$store.dispatch('initRoom', this.$route.params.id)
    this.$store.dispatch('usersStatus')
    this.$store.dispatch('fetchRequests',{role: this.$store.getters.userInfo.role, uid: this.$store.getters.user.providerData[0].uid})
  },
  
}
</script>

<style>

</style>