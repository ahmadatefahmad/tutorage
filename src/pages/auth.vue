<template>
  <q-page align="center">

    <div class="justify-center row">
      <q-carousel
        v-model="panelName"
        transition-prev="scale"
        transition-next="scale"
        control-color="white"
        swipeable
        animated
        :control-text-color="$q.dark.isActive ? '' : 'primary'"
        padding
        arrows
        :height=" $q.screen.height >= $q.screen.width ? '40vh':'30vw' "
        class="col col-md-6 col-xs-12 rounded-borders bg-main" >
        

        <q-carousel-slide name="tutor" id="tutorImg"  class="imgSrc justify-center row">
            <p class="text-h4">Tutor</p>
        </q-carousel-slide>

        <q-carousel-slide name="student" id="studentImg"  class="imgSrc justify-center row">
          <p class="text-h4">Student</p>
        </q-carousel-slide>
        
      </q-carousel>
    </div>
    <div v-if="!$store.getters.signingIn" :class="$q.screen.xs ? 'text-h7':'text-h6'">Most of the services we provide rely on Google applications and thus its required that you signup with your Google Account</div>
        
    <q-btn
      class="bg-primary text-white shadow-5 q-mt-md q-px-md"
      dense
      size="16px"
      @click="$store.dispatch('loginOrRegister', {role, signin: $store.getters.signingIn })"
      :label="$store.getters.signingIn ? 'Sign In' : 'Sign up'" />

  </q-page>
</template>

<script>
import apitest from 'src/components/apiTest'

export default {
  components: { apitest },
  data () {
    return {
      panelName : this.$store.getters.userType == 'student'? 'student':'tutor',
      role : this.$store.getters.userType == 'student'? 'student':'tutor'
    }
  },

  watch:{
    panelName(newVal){
      this.role = newVal
    }
  }
}
</script>

<style scoped>

#tutorImg{
  background-image: url('~assets/Images/Presentation_Monochromatic.png');
  background-repeat: no-repeat;
}

#studentImg{
  background-image: url('~assets/Images/classes.png');
  background-repeat: no-repeat;
}

@media only screen and (min-width: 200px) {
.imgSrc{
  background-size: 40vw !important;
}
}
@media only screen and (min-width: 599px) {
.imgSrc{
  background-size: 30vw !important;
}
}
@media only screen and (min-width: 1023px) {
.imgSrc{
  background-size: 25vw !important;
}
}
@media only screen and (min-width: 1439px) {
.imgSrc{
  background-size: 20vw !important;
}
}
@media only screen and (min-width: 1919px) {
.imgSrc{
  background-size: 20vw !important;
}
}

</style>