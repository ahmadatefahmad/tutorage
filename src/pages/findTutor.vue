<template>
  
  <q-page>
    
    <div class="row justify-center q-my-sm" >

      <!-- Content -->
      <div class=" col-xs-12 col-md-6" :class="!displayingTutors?'q-mt-xl':''">
        <p v-if="!displayingTutors" :class="$q.screen.width > 600 ? 'text-h5' : 'text-h6'">Find The Right Tutor For You!</p>
        <p v-if="!displayingTutors" :class="$q.screen.width > 600 ? 'text-h6' : 'text-h7'" class="text-weight-medium ">Book one-on-one lessons with verified tutors in your area...<br/>oh wait! from all over the world!</p>


        <q-select
          @filter="filterFn"
          @keyup.enter="findTutor"
          :use-input="subjectQuery ? false : true"
          clearable 
          class="bg-var shadow-2 q-my-sm full-width q-py-xs q-px-sm rounded-borders"
          options-dense
          menu-anchor="bottom start"
          :options="subjects"
          v-model="subjectQuery"
          dense
          borderless
          label="What do you wanna learn?" >
          <template v-slot:after>
             <q-btn flat :size="$q.screen.xs ?'10px':''" label="find tutor" @click.stop="findTutor()" class="bg-primary text-white text-caption" type="submit"/>
          </template>
           <template v-slot:before>
             <q-icon v-if="displayingTutors" color="primary" class="cursor-pointer" @click="filterByLocation = !filterByLocation; countryQuery = ''" name="person_pin_circle"/>
          </template>
             
        </q-select>

        <q-select
        v-if="displayingTutors && filterByLocation"
        borderless
        clearable
        label="country"
        class="bg-var shadow-2 q-my-sm full-width q-py-xs q-px-sm rounded-borders"
        dense
        options-dense
        :options="countries"
        v-model="countryQuery"/>
             
        </q-select>

      </div>  

      <!-- Image -->
      <q-img
        v-if="!displayingTutors"
        class="col-sm-12 col-md-6 q-ma-none"
        contain
        id="teacherImg"
        src="~assets/Images/findtutor.png"
        alt="teacher tutor" />
    </div>

    <tutors-display :subject="subjectQuery" v-if="displayingTutors"/>

   </q-page>


</template>

<script>
import tutorsDisplay from 'src/components/findtutor/tutorsDisplay.vue'
export default {
  data(){
    return{
      subjectQuery: null,
      countryQuery: null,
      filterByLocation: false,
      displayingTutors: false,
      subjects: this.$store.getters.subjects
    }
  },

  components:{
    tutorsDisplay
  },

  beforeCreate(){
    this.$store.dispatch('fetchSubjects')
    this.$store.dispatch('countries')
  },

  methods:{
    findTutor(){
      if(this.subjectQuery){
        this.$store.dispatch('filterTutors',{subject: this.subjectQuery, country: this.countryQuery})
        this.displayingTutors = true
      }
    },

    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.subjects = this.$store.getters.subjects
        }
        else {
          const needle = val.toLowerCase()
          this.subjects = this.$store.getters.subjects.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },

    

  },

  computed:{
    countries(){
      let countries = []
      for(let country of this.$store.getters.countries){
        countries.push(country.country)
      }
      return countries
    }
  }
}
</script>

<style scoped>
/* q-menu q-position-engine scroll q-menu--dark q-dark */
</style>