<template>
  <div class="fit">
    <!-- Basic Info Section -->
    <basic-info :userInfo="userInfo"/>
      <p v-if="this.$store.getters.requests && this.$store.getters.requests.length > 0" class="q-mt-md text-h6">Pending Requests</p>
      <div v-if="this.$store.getters.requests && this.$store.getters.requests.length > 0" class="bg-var q-pa-md q-mt-md shadow-2 rounded-borders">
      
    <carousel
    navigationNextLabel=""
    navigationPrevLabel=""
    :perPageCustom="[[300, 1],[599, 2],[768, 3],[896, 4], [1024, 5]]"
    class="fit"
    :navigationEnabled="true">
    
      <slide class=" fit q-ma-xs" v-for="(request, index) of this.$store.getters.requests" :key="index">   
          <q-card class="text-center justify-center bg-main bg-var row q-pa-md shadow-5 text-h6 q-mr-md" >
            <div class="row full-width justify-center">
              <p> {{request.userInfo.name}} 
                <p v-if="request.userInfo.basicInfo.age">, {{request.userInfo.basicInfo.age}}</p>
              </p> 
            </div>
            
            <div class="row full-width justify-center">
              <p class="row" v-if="request.userInfo.basicInfo.country">{{request.userInfo.basicInfo.country}}
                <p v-if="request.userInfo.basicInfo.city">, {{request.userInfo.basicInfo.city}}</p>
              </p>
            </div> 

            <p>{{ request.msg }}</p> 
          </q-card>
      </slide> 
         
    </carousel>
    </div>
  </div>
</template>

<script>
import basicInfo from "./basicInfo";
import { Carousel, Slide } from 'vue-carousel'

export default {
 props:['userInfo'],
 components: {
    basicInfo,
    Carousel,
    Slide
  },
  mounted(){
    this.$store.dispatch('fetchRequests', {role:this.$store.getters.userInfo.role, uid:this.$store.getters.user.providerData[0].uid})
 
  }
}
</script>

<style>

</style>