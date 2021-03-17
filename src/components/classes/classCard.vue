<template>
  <q-card
    v-hoverEffect="'shadow-10'"
    class="col-lg-3 col-md-3 col-sm-5 col-xs-11 shadow-5 bg-var text-var text-dark q-my-lg"
    dark
    bordered>
    <q-card-section horizontal>
      
      <q-btn
        flat
        @click.stop
        round
        size="16px"
        icon="more_vert"
        style="height:10%">
            
        <q-menu clickable anchor="top left" self="top left" >
          
          <!-- Teacher Functions -->
          <div v-if="course.teacherFolder">
            <q-item class="q-pa-none" v-if="course.courseState == 'ACTIVE'" >
              <q-btn class="full-width" flat style="min-width:80px" v-close-popup  @click="$store.dispatch('archiveOrUnarchiveCource',{id: course.id, name: course.name, action: 'ARCHIVED'})" label="Archive"/>
            </q-item>

            <q-item class="q-pa-none" v-if="course.courseState == 'ARCHIVED'">
              <q-btn class="full-width" flat style="min-width:80px" v-close-popup @click="$store.dispatch('archiveOrUnarchiveCource',{id: course.id, name: course.name, action: 'ACTIVE'})" label="restore"/>
            </q-item>

            <q-separator v-if="course.courseState == 'ARCHIVED'"/>

            <q-item class="q-pa-none" v-if="course.courseState == 'ARCHIVED'">
              <q-btn class="full-width" flat style="min-width:80px" v-close-popup @click="courseDeletionConfirm = true" label="Delete"/>
            </q-item>
          
          </div>

          <!-- Students Functions -->
          <div v-else>
            <q-item class="q-pa-none" >
              <q-btn
                class="full-width"
                flat
                style="min-width:80px"
                v-close-popup
                @click="unsubscribtionConfirm = true"
                label="Unsubscribe"/>
            </q-item>

            <q-item v-if="!$store.getters.ratedAlready" class="q-pa-none" >
              <q-btn
                class="full-width"
                flat
                style="min-width:80px"
                v-close-popup
                @click="rateTutor = true"
                label="Rate tutor"/>
            </q-item>

          </div>
        </q-menu>

      </q-btn>

      <q-img
        contain
        src="~assets/Images/Book Lover_Monochromatic.png"
      >
      </q-img>
      
      <q-card-actions vertical class="justify-top q-px-md">
        
        <q-btn
          class="shadow-5"
          v-hoverEffect="'shadow-12'"
          flat
          round
          icon="launch"
          @click="$router.push({
          path:'/classes/'+course.id, 
          query: { courseName: course.name }})"/>

      </q-card-actions>

    </q-card-section>

    <q-separator inset/>

    <div>
      <p class="float-right text-h6 text-center q-my-none q-mx-sm">
        <q-tooltip :delay="500">
          Creation Date
        </q-tooltip>
        {{course.creationTime.slice(0, 10)}}
      </p>
      <p class="text-h6 text-center q-ma-none q-pa-none q-mx-sm">
        {{course.name}} 
        <q-tooltip :delay="500">
          Course Name
        </q-tooltip>
      </p>
    </div>

    <q-dialog v-model="courseDeletionConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center bg-var text-var">
          <q-avatar icon="delete" color="primary" text-color="white"/>
          <span class="q-ml-sm">Are you sure you want to delete that Course?</span>
        </q-card-section>

        <q-card-actions align="right" class="bg-var text-var">
          <q-btn v-hoverEffect="'shadow-10'" flat label="Cancel" color="primary" v-close-popup />
          <q-btn v-hoverEffect="'shadow-10'" flat label="Confirm" @click="$store.dispatch('deleteCourse', course.id)" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="unsubscribtionConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center bg-var text-var">
          <q-avatar icon="delete" color="primary" text-color="white"/>
          <span class="q-ml-sm">Are you sure you want to unsubscribie from that Course?</span>
        </q-card-section>

        <q-card-actions align="right" class="bg-var text-var">
          <q-btn v-hoverEffect="'shadow-10'" flat label="Cancel" color="primary" v-close-popup />
          <q-btn v-hoverEffect="'shadow-10'" flat label="Confirm" @click="$store.dispatch('unsubscribeCourse', {courseId: course.id, uid: $store.getters.user.providerData[0].uid})" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="rateTutor">
      <q-card>
        <div class="q-pa-md bg-var">
          <div class="bg-var">
            <q-rating
              v-model="rating"
              :max="5"
              size="3.5em"
              :color="rate.colors"
              :icon="rate.icons"
            />
          </div>
        </div>

        <q-card-actions align="right" class="bg-var text-var">
          <q-btn v-hoverEffect="'shadow-10'" flat label="Cancel" color="primary" v-close-popup />
          <q-btn v-hoverEffect="'shadow-10'" flat @click="$store.dispatch('rateTutor',{studentId: $store.getters.user.providerData[0].uid, tutorId: course.ownerId, rating})" label="rate" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-card>
</template>

<script>
export default {

  props:['course'],

  data(){
    return{     
      courseDeletionConfirm: false,
      unsubscribtionConfirm: false,
      rateTutor: false,
      rating: 0,
      rate: {
        icons : [
        'sentiment_very_dissatisfied',
        'sentiment_dissatisfied',
        'sentiment_satisfied',
        'sentiment_satisfied_alt',
        'sentiment_very_satisfied'
      ],
      colors :[
        'red',
        'orange',
        'yellow',
        'light-green',
        'green'
      ]
      }
    }
  },
  
  beforeMount(){
    if(!this.course.teacherFolder){
     this.$store.dispatch('ratedAlready',{studentId: this.$store.getters.user.providerData[0].uid, tutorId: this.course.ownerId})
    }
  },
  mounted(){
    this.$parent.$emit('loadingIsDone')
  }

}
</script>
