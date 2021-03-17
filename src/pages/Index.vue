<template>
<q-page ref="landingPage"> 

    <!-- First Block -->
    <div class="row justify-center reverse-wrap q-mb-md" >

      <!-- Content -->
      <div class="col-sm-12 col-md-5" style="margin: auto 0;">
        <div class="q-py-xl" >
          <p :class="variableHeader">Hire The Right Tutor For You!</p>
          <p class="text-weight-medium text-h6 no-wrap">Struggling with studying ? don't have the time to help your kids study?<br/>We can help you with that!</p>
          <q-btn 
            v-hoverEffect="'shadow-10'" 
            class="q-mb-md" 
            @click="$router.push('/auth'); $store.commit('SET_SIGNINGIN', {signingIn :false, userType: 'student'})"  
            icon-right="arrow_right_alt" size="18px" label="Hire A Tutor" color="primary"/>
          <br/>
          <p class="text-weight-medium">Want to become a tutor? 
            <q-btn flat class="primary" 
            @click="$router.push('/auth'); $store.commit('SET_SIGNINGIN', {signingIn :false, userType: 'tutor'})" 
            label="Join Us"/>
          </p>
        </div>
      </div>  

      <!-- Image -->
      <q-img
        class="col-xs-9 col-sm-7 col-md-5"
        contain
        id="teacherImg"
        src="~assets/Images/Online_lesson_Monochromatic.png"
        alt="teacher tutor" />
    </div>
    
    <!-- Second Block -->
    <div
      class="row bg-accent wrap q-px-md  q-py-lg justify-center" style="border-radius: 5px 5px 0 0 ">

      <div data-aos="fade-up" class=" col-12 text-center text-white q-my-md">
        <p :class="variableHeader">What Do We Offer</p>
      </div>
      
      <q-card
        data-aos="fade-up"
        v-hoverEffect="'shadow-12'"
        class="shadow-5 col-xs-12 col-sm-6 col-md-3 q-pa-sm q-ma-md">
      <q-item>

        <q-item-section avatar class="shadow-10 bg-accent q-pa-sm on-left rounded-borders">
          <q-avatar rounded >
            <img src="~assets/Images/teacher.svg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="primary text-h6">Home Tutoring</q-item-label>
          <q-item-label class="text-weight-medium">
            Meet Tutor at the conveince of your home and enjoy the class at your place
          </q-item-label>
        </q-item-section>
      </q-item>


      </q-card>

      <q-card
        data-aos="fade-up" 
        v-hoverEffect="'shadow-12'"
        class="shadow-5 col-xs-12 col-sm-6 col-md-3 q-pa-sm q-ma-md">
        
      <q-item>

        <q-item-section avatar class="shadow-10 bg-accent q-pa-sm  on-left rounded-borders">
          <q-avatar rounded >
            <img src="~assets/Images/tutor.svg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="primary text-h6">Online Tutoring</q-item-label>
          <q-item-label class="text-weight-medium">
            Get in touch with tutors from all over the world, in the comfort of your home
          </q-item-label>
        </q-item-section>
      </q-item>


      </q-card>

      <q-card 
        data-aos="fade-up"
        v-hoverEffect="'shadow-12'"
        class="shadow-5 col-xs-12 col-sm-6 col-md-3 q-pa-sm q-ma-md">
        
      <q-item>

        <q-item-section avatar class="shadow-10 bg-accent q-pa-sm on-left rounded-borders">
          <q-avatar rounded >
            <img src="~assets/Images/education.svg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="primary text-h6">Group Tutoring</q-item-label>
          <q-item-label text-weight-medium>
            If you want a tutor to teach you and your friends in a group
          </q-item-label>
        </q-item-section>
      </q-item>


      </q-card>

    </div>

    <!-- Third Block -->
    <div class="row wrap q-pa-md q-mb-md q-py-lg bg-primary justify-center" style="border-radius: 0 0  5px 5px ">

      <div data-aos="fade-up" class="col-12 text-center text-white q-my-md">
        <p  :class="variableHeader">How it Works for Students & Parents</p>
      </div>

      <q-card
        flat
        data-aos="fade-up" 
        class="col-xs-12 col-sm-6 col-md-3 transparent">
        
      <q-item>
        <q-item-section
          avatar
          v-hoverEffect="'shadow-12'"
          class="q-mx-auto q-pa-sm bg-grey-10 rounded-borders">
          <q-avatar rounded >
            <img src="~assets/Images/choosing-tutor.svg">
          </q-avatar>
        </q-item-section>
      </q-item>


      <q-card-section horizontal class="q-mx-auto" >
        <q-card-section class="text-h6 text-white q-mx-auto">
         Search for the right tutor for you 
        </q-card-section>

      </q-card-section>
      </q-card>

      <q-card
        flat
        data-aos="fade-up"
        class="col-xs-12 col-sm-6 col-md-4 transparent">
        
      <q-item>
        <q-item-section
          avatar
          v-hoverEffect="'shadow-12'"
          class="q-mx-auto q-pa-sm bg-grey-10 rounded-borders">
          <q-avatar rounded >
            <img src="~assets/Images/calling-tutor.svg">
          </q-avatar>
        </q-item-section>
      </q-item>


      <q-card-section horizontal >
        <q-card-section  class="text-h6 text-white q-mx-auto">
         Get in touch with the Tutor & reach an agreement
        </q-card-section>

      </q-card-section>
      </q-card>

      <q-card
        flat
        data-aos="fade-up" 
        class="col-xs-12 col-sm-6 col-md-3 transparent">
        
      <q-item>
        <q-item-section
          avatar
          v-hoverEffect="'shadow-12'"
          class="q-mx-auto q-pa-sm bg-grey-10 rounded-borders">
          <q-avatar rounded >
            <img src="~assets/Images/online-learning.svg">
          </q-avatar>
        </q-item-section>
      </q-item>


      <q-card-section horizontal >
        <q-card-section class="text-h6 text-white q-mx-auto">
         Start learning! 
        </q-card-section>

      </q-card-section>
      </q-card>

    </div>
    
    <!-- Fourth Block -->
    <div class="row wrap q-pa-md q-py-lg justify-center q-gutter-lg" style="border-radius: 0 0  5px 5px ">

      <div data-aos="fade-up" class="col-12 text-center q-my-md">
        <p  :class="variableHeader">How it Works for Tutors</p>
      </div>

      <q-card
        flat
        data-aos="fade-up" 
        class="shadow-12 col-xs-12 col-sm-6 col-md-3 bg-primary">
        
      <q-item>
        <q-item-section
          avatar
          class="q-mx-auto q-pa-sm rounded-borders">
          <q-avatar rounded >
            <q-icon size="30px" name="person_add" />
          </q-avatar>
        </q-item-section>
      </q-item>


      <q-card-section horizontal class="text-center" >
        <q-card-section class="text-h6  q-mx-auto">
         Create a free account 
        </q-card-section>

      </q-card-section>
      </q-card>

      <q-card
        flat
        data-aos="fade-up" 
        class="shadow-12 col-xs-12 col-sm-6 col-md-3 bg-primary">
        
      <q-item>
        <q-item-section
          avatar
          class="q-mx-auto q-pa-sm rounded-borders">
          <q-avatar rounded >
            <q-icon size="30px" name="notifications" />
          </q-avatar>
        </q-item-section>
      </q-item>


      <q-card-section horizontal class="text-center" >
        <q-card-section class="text-h6  q-mx-auto">
          Get tutoring job alers
        </q-card-section>

      </q-card-section>
      </q-card>

      <q-card
        flat
        data-aos="fade-up" 
        class="shadow-12 col-xs-12 col-sm-6 col-md-3 bg-primary">
        
      <q-item>
        <q-item-section
          avatar
          class="q-mx-auto q-pa-sm rounded-borders">
          <q-avatar rounded >
            <q-icon size="30px" name="task_alt" />
          </q-avatar>
        </q-item-section>
      </q-item>


      <q-card-section horizontal class="text-center" >
        <q-card-section class="text-h6 q-mx-auto">
         Accept your desired job
        </q-card-section>

      </q-card-section>
      </q-card>

    </div>

</q-page>
</template>

<script>

export default {
  
  data(){
    return{
      headerClass: '',
    }
  },

  computed:{
    variableHeader(){
      [this.$q.screen.name == 'xs' ? this.headerClass = 'text-h5' : 
      [this.$q.screen.name == 'sm' ? this.headerClass = 'text-h4' : 
      [this.$q.screen.name == 'md' ? this.headerClass = 'text-h4' : 
      [this.$q.screen.name == 'lg' ? this.headerClass = 'text-h3' : 'text-h2']]]]
      return this.headerClass
    }
  },

  watch:{
    '$q.dark.isActive': function(){
      console.log(this.$q.dark.isActive)
      window.scrollBy(0, 1)
    }

  }

}
</script>

<style>

</style>