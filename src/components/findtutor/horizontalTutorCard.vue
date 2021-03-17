<template>
  <q-card class="bg-var row no-wrap q-mb-md" style="max-height:80px">

    
    <img
      style="border-radius: 4px;"
      class="col-2 q-ma-xs"
      referrerPolicy="no-referrer"
      :src="tutor.photoUrl.slice(0,-6)">

    <q-card-section class="self-start q-mx-xs q-my-sm q-pa-none col-7">
      <q-item-label class="row">
        {{ tutor.name }}, {{ tutor.basicInfo.age }}
        <q-avatar v-if="tutor.basicInfo.country" square size="16px" class="q-ml-xs">
          <img referrerPolicy="no-referrer" :src="photoUrl" alt="country flag">
        </q-avatar>
      </q-item-label>
      <q-item-label v-if="tutor.basicInfo.bio">{{ tutor.basicInfo.bio.slice(0,28) }} 
        <span v-if="tutor.basicInfo.bio.length>28">...</span> 
      </q-item-label>
      <p class="q-pt-sm cursor-pointer text-primary" @click="sendingRequest = true; readingMore = true">More</p>

    </q-card-section>

    <div class="col-3 row justify-end">
      <q-card-section class="q-pa-none q-mr-lg q-my-sm text-center">
        <div v-if="!tutor.rating">
          <p class="q-mr-md q-ma-none"><q-icon size="10px" name="grade" color="yellow"/> 5.0</p>
          <p class="text-caption  q-ma-none" >10 reviews</p>    
        </div>
        <div v-else class="q-mb-sm bg-accent rounded-borders text-white">
          New Tutor
        </div>

        <q-btn
        v-if="$store.getters.requestedAlready"
        label="cancel"         
        @click="$store.dispatch('removeRequest', 
        {studentId: $store.getters.user.providerData[0].uid, 
        tutorId:tutor.id})"
        size="10px" />

        <q-btn
        v-if="!$store.getters.requestedAlready"
        @click="sendingRequest = true"
        label="request"
        size="10px" />

      </q-card-section>
    </div>
  
    <request-lesson :sendingRequest="sendingRequest" :readingMore="readingMore" v-on:cancelRequest="sendingRequest = false; readingMore = false" :tutor="tutor" />

  </q-card>


</template>

<script>
import requestLesson from 'src/components/findtutor/requestLesson.vue'

export default {
  props:['tutor'],

  data(){
    return{
      sendingRequest: false,
      readingMore: false,
      photoUrl: '',
      totalRate: null
    }
  },

  components:{
    requestLesson
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