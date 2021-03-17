<template>
  <q-page class="row ">
    <carousel
    navigationNextLabel=""
    navigationPrevLabel=""
    :perPageCustom="[[300, 1],[599, 2],[768, 3],[896, 4], [1024, 5]]"
    class="fit"
    :navigationEnabled="true">
      <slide class="q-ma-xs" v-for="(request, index) of this.$store.getters.requests" :key="index">
          
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
            
            <p v-if="request.userInfo.basicInfo.bio" class="col-12">{{request.userInfo.basicInfo.bio}}</p>
            <p class="col-12">{{ request.msg }}</p>

            <div class="row justify-center q-gutter-md">
              <q-btn class="bg-primary" @click="creatingCourse = true" label="accept request"/>
              <q-btn
                class="bg-negative"
                @click="declineConfirm = true"
                label="decline request" />
            </div>

          </q-card>

          <q-dialog v-model="declineConfirm">
            <q-card>
              <q-card-section class="row items-center bg-var text-var">
                <q-avatar icon="block" color="primary" text-color="white"/>
                <span class="q-ml-sm">Are you sure you want to decline that request?</span>
              </q-card-section>

              <q-card-actions align="right" class="bg-var text-var">
                <q-btn
                  flat
                  v-hoverEffect="'shadow-5'"
                  label="Confirm"
                  @click="$store.dispatch('removeRequest', {studentId: request.studentId, tutorId: request.tutorId})"
                  class="bg-primary"
                  v-close-popup />

                  <q-btn
                    v-hoverEffect="'shadow-5'"
                    flat
                    label="Cancel"
                    class="bg-negative"
                    v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <create-course
            :studentName="request.userInfo.name"
            :studentId="request.studentId"
            :tutorId="request.tutorId"
            :isRequest="true"
            :creatingCourse="creatingCourse" 
            @cancel="creatingCourse = false"/>
      </slide>      
    </carousel>
          
  </q-page>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import createCourse from 'src/components/classes/createCourse.vue'

export default {

  data(){
    return{
      creatingCourse: false,
      declineConfirm: false
    }
  },
  beforeCreate(){
    this.$store.dispatch('fetchRequests', {role:this.$store.getters.userInfo.role, uid:this.$store.getters.user.providerData[0].uid})
  },
  components:{
    Carousel,
    Slide,
    createCourse
  },
}
</script>

<style>

</style>