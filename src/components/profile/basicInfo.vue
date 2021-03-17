<template>
  <div :class="$q.screen.width < 700 ? 'q-px-none' : 'q-px-lg'" class="col-12 bg-var shadow-5 q-pa-md rounded-borders">
      
      <div class="row items-start" :class="$q.screen.width >1023 ? 'text-h2' :[$q.screen.width >320 ? 'text-h4' : 'text-h5']">
          
          <p> Hello, &nbsp; </p>
          <p class="text-weight-thin"> {{userInfo.name}} </p> 

          <q-space/>
          
          <q-btn
            flat
            v-if="$route.params.id == $store.getters.user.uid && !editMode"
            round
            size="14px"
            class="q-pa-none"
            icon="more_vert">
            <q-menu :offset="[30,0]">
              <q-btn flat style="min-width:80px" v-close-popup @click="editMode = true " label="Edit"/>
            </q-menu>
          </q-btn>
        
      </div>

      <!-- Basic info -->
      <div class="row">

        <!-- BIO -->
        <p v-if="!editMode && basicInfo.bio" class="col-12 text-h5">{{basicInfo.bio}}</p>
        <q-input
        v-if="editMode"
        outlined
        class="text-h6 full-width q-mb-md text-accent"
        label="Bio"
        dense
        v-model="basicInfo.bio"
        autogrow/>

        <!-- Country -->
        <p v-if="!editMode && basicInfo.country" class="text-h5">{{basicInfo.country}}</p>
        <q-select
        v-if="editMode"
        outlined
        clearable
        @input="basicInfo.city = ''"
        label="country"
        class="on-left col-sm-3 col-xs-12 q-mb-md"
        dense
        options-dense
        :options="countries"
        v-model="basicInfo.country"
        autogrow/>

        <!-- City -->
        <p v-if="!editMode && basicInfo.city" class="text-h5">, {{basicInfo.city}}</p>
        <q-select
        v-if="editMode"
        outlined
        clearable
        label="City"
        class="on-left col-sm-3 col-xs-12 q-mb-md"
        dense
        options-dense
        :options="cities"
        v-model="basicInfo.city"
        autogrow/>

         <!-- Age -->
        <p v-if="!editMode && basicInfo.age" class="col-12 text-h5">{{basicInfo.age}}</p>
        <q-input
        v-if="editMode"
        outlined
        clearable
        mask="##"
        label="your age"
        :rules="[ val => val > 10 && val < 100 || val == '' || 'This is not a valid age']"
        class="q-pa-none on-left col-sm-3 col-xs-12 q-mb-md"
        dense
        v-model="basicInfo.age"
        autogrow/>

      </div>

      <!-- Submition Buttons -->
      <div class="row q-mt-md q-gutter-md">
        <q-btn
          v-if="editMode"
          class="bg-primary"
          label="update"
          @click="$store.dispatch('updateProfile', {type :'basicInfo', info : basicInfo });
          editMode = false" />  

        <q-btn v-if="editMode" class="bg-negative" label="Cancel" @click=" basicInfo = userInfo.basicInfo ? JSON.parse(JSON.stringify(userInfo.basicInfo)) : {};
          editMode = false" />
      </div>

    </div>
</template>

<script>
export default {

  props: ['userInfo'],

  data() {
    return {
      editMode: false,
      basicInfo : this.userInfo.basicInfo ? JSON.parse(JSON.stringify(this.userInfo.basicInfo)) : {},
      
    };
  },

  computed: {

    countries(){
      let countries = []
      for(let country of this.$store.getters.countries){
        countries.push(country.country)
      }
      return countries
    },

    cities(){
      for(let country of this.$store.getters.countries){
        if(this.basicInfo.country == country.country){
          return country.cities
        }
      }
    }

  },

  
  
}
</script>

<style>

</style>