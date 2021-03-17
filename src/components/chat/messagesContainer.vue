<template>
  <q-page class="fit">
    
    <q-scroll-area class="chatArea shadow-1 col overflow-auto q-pt-sm fit"
      :class="$q.dark.isActive? 'chat-dark' : 'chat-light'"
        style="height: calc(100% - 40px) !important"
        :thumb-style="$store.getters.scrollThumb"
        ref="chatArea"> 

        <q-chat-message
          class="q-px-md non-selectable"
          v-for="(message, index) in messages"
          :key="index"
          :name="getUserName(message.uid)"
          :avatar="getUserImage(message.uid)"
          :stamp="new Date(message.created).toLocaleTimeString()"
          :bg-color="message.uid == $store.getters.user.providerData[0].uid ? 'cyan-3' : 'primary'"
          :sent="message.uid == $store.getters.user.providerData[0].uid ? true : false">
          <q-tooltip :delay="500">
            {{ new Date(message.created).toLocaleDateString()}}
          </q-tooltip>{{message.content}}</q-chat-message>

    </q-scroll-area>

    <q-form
      @submit.stop="sendMessage">
      <q-input
      style="height:40px !important"
      class="bg-main" 
      v-model="newMessage"
      square
      outlined
      ref="msgInput"
      placeholder="message"
      dense>                
        <q-btn  flat icon="send" size="12px" class="q-ma-none" type="submit"/>
      </q-input>
    </q-form>
  
  </q-page>
</template>

<script>
export default {
  data(){
    return{
      newMessage:'',
      lastMsgDate: '',
      msgIndex:''
    }
  },  

  computed:{
    messages(){
      if (this.$refs.chatArea) {this.$refs.chatArea.setScrollPosition(this.$refs.chatArea.getScrollTarget().scrollHeight , 1)}
      return this.$store.getters.chatRoom.messages
    },
  },

  props:['isCollapsed'],

  methods:{
    sendMessage(){
      if(this.newMessage != ''){
        this.$store.dispatch('sendMessage', {
          classId: this.$route.params.id,
          content: this.newMessage, 
          created: Date.now(),
          uid: this.$store.getters.user.providerData[0].uid
        })
        this.newMessage = '' 
        this.$refs.msgInput.focus()
      }
    },

    getUserName(uid){
      for(let user of this.$store.getters.chatRoom.users){
        if(user.uid == uid){
          return user.fullname.split(' ')[0]
        }
      }
    },

    getUserImage(uid){
      for(let user of this.$store.getters.chatRoom.users){
        if(user.uid == uid){
          return user.photoUrl
        }
      }
    },

  }

}
</script>

<style scoped>
.chat-light{
  background-image: url('~assets/Images/chat-bg.svg') !important
}

.chat-dark{
    background-image: url('~assets/Images/chat-bg-dark.svg') !important

}
</style>