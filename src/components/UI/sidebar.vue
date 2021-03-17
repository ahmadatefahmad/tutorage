<template >
  <q-drawer
        show-if-above
        v-if="$store.getters.user"
        :mini="$store.getters.miniState"
        @mouseover="!stateInput ? $store.commit('expandSidebar') : ''"
        @mouseout="!stateInput ? $store.commit('collapseSidebar') : ''"  
        :breakpoint="1023"
        :width="250"
        content-class="bg-var"
        class="text-h6 text-primary">

        <q-scroll-area class="fit hide-scrollbar no-scroll">
          <q-list class="q-pa-sm" padding>
            
            <q-item  
              clickable
              class="rounded-borders"
              v-if="$q.screen.width >1023"
              @click="stateInput = !stateInput">
            
                <q-icon  size="24px" :name="!$store.getters.miniState ? 'radio_button_checked' : 'radio_button_unchecked'"  style="margin: 0 auto"/>

            </q-item>

            <q-item
              class="rounded-borders"
              :class="$router.currentRoute.path == '/findtutor' ? 'shadow-10 bg-hover' : ''"
              clickable
              v-if="$store.getters.userInfo.role == 'student'"
              @click="$router.push('/findtutor')">

                <q-item-section avatar>
                  <q-icon
                    size="20px"
                    name="person_search"/>
                </q-item-section>

                <q-item-section class="text-weight-light">
                  Find tutor
                </q-item-section>

            </q-item>

            <q-item
              class="rounded-borders"
              :class="$router.currentRoute.path == '/requests' ? 'shadow-10 bg-hover' : ''"
              clickable
              v-if="$store.getters.userInfo.role == 'tutor'"
              @click="$router.push('/requests')">

                <q-item-section avatar>
                  
                  <q-badge v-if="$store.getters.requests && $store.getters.requests.length > 0" color="negative" class="absolute-top-right" text-color="black" :label="$store.getters.requests.length" />
                  <q-icon
                    size="20px"
                    name="person_add"/>
                    
                </q-item-section>

                <q-item-section class="text-weight-light">
                  Requests
                </q-item-section>

            </q-item>

            <q-item
              class="rounded-borders"
              :class="$router.currentRoute.path == '/classes' ? 'shadow-10 bg-hover' : ''"
              clickable
              @click="$router.push('/classes')">

                <q-item-section avatar>
                  
                  <q-badge v-if="$store.getters.invitations && $store.getters.invitations > 0" color="negative" class="absolute-top-right" text-color="black" :label="$store.getters.invitations" />
                  <q-icon
                    size="20px"
                    name="class"/>
                    
                </q-item-section>

                <q-item-section class="text-weight-light">
                  Classes
                </q-item-section>

            </q-item>

           <nav-button v-for="(page,index) in pages" :key="index" :page="page"/>
            
          </q-list>
          
        </q-scroll-area>
        
  </q-drawer>
</template>

<script>
import navButton from './navButton'

export default {
  components:{
    navButton
  },

  data() {
    return {
      stateInput: false,
      pages:
      [
        
        {
        name: 'Calendar',
        icon: 'event',
        route: '/calendar'
        },
        {
        name: 'Files',
        icon: 'folder',
        route: '/files'
        },

      ]
    }
  },
}
</script>

<style>

</style>