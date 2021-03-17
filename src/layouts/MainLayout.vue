<template>
  <q-layout view="lHh Lpr lFf">


    <!-- NavBar -->
    <navbar/>
    

    <!-- Page Container -->
    <q-page-container>
      <router-view class="q-my-xl" :class="$q.screen.width > 1023 ? 'q-mx-xl' : [$q.screen.width >= 600? 'q-mx-lg' : 'q-mx-md']"/>

    

    </q-page-container>

  </q-layout>
</template>

<script>
import Navbar from 'src/components/UI/navbar.vue'

export default {
  
  name: 'MainLayout',
  components:{
    Navbar
  },
  
}
</script>

<style >

</style>
