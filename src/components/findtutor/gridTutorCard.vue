<template>
  <div class="q-mx-sm">
    <q-card class="bg-var q-pa-sm q-mb-md col-sm-3 col-md-2"  >
      <img
        class="rounded-borders"
        referrerPolicy="no-referrer"
        :src="tutor.photoUrl.slice(0,-6)">

      <q-card-section class="self-start q-mx-xs q-my-sm q-pa-none col-7">
        <q-item-label class="row text-h5">
          {{ tutor.name }}, {{ tutor.basicInfo.age }}
          <q-avatar square size="20px" class="q-mx-sm q-my-xs">
            <img v-if="photoUrl" :src="photoUrl" alt="">
          </q-avatar>
        </q-item-label>
        <q-item-label v-if="tutor.basicInfo.bio" >{{ tutor.basicInfo.bio.slice(0,100) }} 
          <span v-if="tutor.basicInfo.bio.length>100">...</span> 
        </q-item-label>
      </q-card-section>

        <p class="q-pl-xs cursor-pointer text-primary" @click="sendingRequest = true; readingMore = true">More</p>

        <q-card-section class="q-mt-lg">

            <q-btn
              v-if="$store.getters.requestedAlready && $store.getters.user"
              class="absolute-bottom-left"
              label="cancel request"              
              @click="$store.dispatch('removeRequest', 
              {studentId: $store.getters.user.providerData[0].uid, 
              tutorId:tutor.id})"
              size="12px" />

              <q-btn
              v-if="!$store.getters.requestedAlready && $store.getters.user"
              class="absolute-bottom-left"
              @click="sendingRequest = true"
              label="request lesson"
              size="12px" />

            <div v-if="tutor.ratings" class="absolute-bottom-right">
              <p class="q-mr-md q-ma-none"><q-icon  name="grade" color="yellow"/> {{ totalRate}}</p>
              <p class="text-caption  q-ma-none" style="">{{ tutor.ratings.length }} reviews</p>    
            </div>
            <div v-else class="absolute-bottom-right bg-main q-pa-sm rounded-borders">
              New Tutor
            </div>

        </q-card-section>
    
    </q-card>
    <request-lesson  :sendingRequest="sendingRequest" :readingMore="readingMore" v-on:cancelRequest="sendingRequest = false; readingMore = false" :tutor="tutor" />
  </div>
</template>

<script>
import requestLesson from 'src/components/findtutor/requestLesson.vue'
export default {
  props:['tutor'],

  components:{
    requestLesson
  },
  
  data(){
    return{
      sendingRequest: false,
      readingMore: false,
      photoUrl: '',
      totalRate: null
    }
  },

  created(){
    this.$store.dispatch('requestedAlready',
      {studentId: this.$store.getters.user.providerData[0].uid, 
      tutorId: this.tutor.id})
    if(this.tutor.basicInfo.country){
      fetch(`https://restcountries.eu/rest/v2/name/${this.tutor.basicInfo.country.toLowerCase()}`)
      .then(resp=>resp.json())
      .then(json=>{
         this.photoUrl = `https://www.countryflags.io/${json[0].alpha2Code}/flat/32.png`;
      })
    }
    if(this.tutor.ratings){
      let totalRate = null
      for(let review of this.tutor.ratings){
        totalRate += parseInt(review.rating)
      }
      this.totalRate = (totalRate/this.tutor.ratings.length).toFixed(2)
    }
      
  }
}
</script>

<style>

</style>