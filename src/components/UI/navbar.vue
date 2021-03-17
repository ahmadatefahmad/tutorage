<template>
  <div>

    <q-header
      reveal
      :reveal-offset="0"
      :class="$q.screen.width > 1023 ? 'q-mx-xl q-py-xs' : [$q.screen.width >= 600? 'q-mx-lg' : 'q-mx-md']"
      class="q-my-lg fixed-top shadow-5 bg-var rounded-borders">

      <q-toolbar>

        <img clickable  @click="$router.push('/')" src="~assets/Images/brand-logo-white.png" style="height:10vh"> 
        
        <q-space/>

        <q-chip clickable v-hoverEffect="'shadow-12'" @click="$router.push(`/profile/${user.uid}`)" v-if="user && $q.screen.width > 599" class="bg-primary on-left" style="color:white">
          {{user.displayName}}
          <q-avatar class="q-pl-lg">
            <img referrerPolicy="no-referrer" :src="user.photoURL" alt="user profile picture">
          </q-avatar>
        </q-chip>

        <q-btn
        flat
        round
        dense
        :icon=" $q.dark.mode ? 'light' : 'nightlight'"
        class="q-mr-sm"
        @click="$q.dark.toggle"/>
         
          
        <div v-if="$q.screen.width > 1080" class="q-gutter-md">

          <q-btn
            v-if="user"
            flat
            round
            dense
            class="on-left"
            icon="logout"
            @click="logout" />
          
          <q-btn
            v-if="!user"
            flat
            class="bg-primary"
            label="Join us"
            @click="$router.push('/auth'); $store.commit('SET_SIGNINGIN', {signingIn :false})" />

          <q-btn
            v-if="!user"
            flat
            class="primary q-mx-sm"
            label="Sign In"
            @click="$router.push('/auth'); $store.commit('SET_SIGNINGIN', {signingIn :true})"/>
        
        </div>

        <div v-else >

          <q-btn
            v-if="user"
            flat
            round
            dense
            class="on-left"
            icon="logout"
            @click="logout" />

          <q-btn
            v-else
            flat
            class="primary navBurger"
            @click.prevent="drawer = !drawer"
            round
            dense
            icon="menu" >
              <q-menu anchor="bottom right" self="top end" v-if="!user" transition-show="flip-up" transition-hide="flip-down" fit >
                <q-list>
                  <q-item>
                    <q-btn 
                      class="primary" 
                      @click="$router.push('/auth'); $store.commit('SET_SIGNINGIN', {signingIn :true})"
                      label="SIGN IN"
                      flat/>
                  </q-item>

                  <q-separator inset />

                  <q-item>
                    <q-btn 
                      class="primary" 
                      @click="$router.push('/auth'); $store.commit('SET_SIGNINGIN', {signingIn :false})"
                      label="Join us"
                      flat/> 
                  </q-item>     
                </q-list>
              </q-menu>
            </q-btn>
        
        </div>

        <q-avatar v-if="user" class="xs">
          <img referrerPolicy="no-referrer" :src="user.photoURL" @click="$router.push(`/profile/${user.uid}`)" alt="user profile picture">
        </q-avatar>
      </q-toolbar>

    </q-header>

    <!-- sidebar -->
    <sidebar/>
    
    

  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

import sidebar from './sidebar.vue'

export default {
  components: { sidebar },

  name: 'NavBar',

  data() {
    return {
      drawer: false}
  },

  computed:{
    ...mapGetters(['user']),
  },

  methods:{
    ...mapActions(['logout'])
  },
  
}
   
</script>
<style scoped>

</style>

 
 
        