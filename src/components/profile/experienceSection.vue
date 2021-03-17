<template>
  <q-timeline :class="$q.screen.width < 700 ? 'q-px-none' : 'q-px-md'" color="secondary" >

      <!-- Timeline Heading -->
      <q-timeline-entry heading> Experience 

        <!-- Add or Edit Buttons -->
        <q-btn
          flat
          round
          v-if="$route.params.id == $store.getters.user.uid && !editMode && !addMode"
          size="14px"
          class="float-right"
          icon="more_vert">
          <q-menu class="col" :offset="[30,0]">
            
            <q-item class="q-pa-none" style="min-width:80px" v-close-popup >
              <q-btn flat label="Add" class="full-width"@click="addMode = true"/>
            </q-item>

            <q-item v-if="orderedExperience.length > 0" class="q-pa-none" style="min-width:80px" v-close-popup>
              <q-btn flat label="Edit" class="full-width" @click="editMode = true"/>
            </q-item>

          </q-menu>
        </q-btn>

      </q-timeline-entry>

      
        
      <q-form @submit.prevent="onSubmit">

        <!-- Adding Input Fields -->
        <q-timeline-entry v-if="addMode"
          :title="newExperience.company + [newExperience.location ? `, ${newExperience.location}`: '']"
          :body="newExperience.role"
          :subtitle="newExperience.since + [newExperience.till ? ` - ${newExperience.till}`: ''] ">

          <div  class="row q-gutter-md q-px-lg">
            
            <q-input    
              v-model="newExperience.company"
              outlined
              class="text-h5 col-11 q-pb-sm"
              :rules="[ val => val && val.length > 0 || 'This field is required']"
              label="Institution"/>

            <q-input
              v-model="newExperience.location"
              outlined
              class="text-h5 col-11 q-pb-sm"
              label="Location"/>

              <q-input
              v-model="newExperience.role"
              outlined
              class="text-h5 col-11 q-pb-sm"
              label="role"/>

            <q-input     
              v-model="newExperience.since"
              outlined
              :rules="[ val => val > 1950 && val < 2022 || val == ''  || 'This is not a valid date']"
              class="text-h5 col-11 q-pb-sm"
              label="Since (Year)"
              mask="####"/>

            <q-input
              v-model="newExperience.till"
              outlined
              :rules="[ val => val > 1950 && val < 2022 || val == '' || 'This is not a valid date']"
              class="text-h5 col-11 q-pb-sm"
              label="Till (Year)"
              mask="####"/>

          </div>
        </q-timeline-entry>

        <!-- Timeline Entries -->
        <q-timeline-entry
          v-if="experience"
          v-for="(experience, index) in orderedExperience"
          :key="index"
          :title="experience.company + [experience.location ? `, ${experience.location}`: '']"
          :body="experience.role"
          :subtitle="experience.since + [experience.till ? ` - ${experience.till}`: ''] " >

          <!-- Editing Input Fields -->
          <div v-if="editMode" class="q-py-md q-pr-md">
            
            <q-input
              v-model="experience.company"
              outlined
              :rules="[ val => val && val.length > 0 || 'This field is required']"
              class="text-h5 q-mb-xs"
              label="Institution"/>

            <q-input
              v-model="experience.location"
              outlined
              class="text-h5 q-pb-md"
              label="Location"/>

            <q-input
              v-model="experience.role"
              outlined
              class="text-h5 q-pb-md"
              label="Location"/>

            
            <q-input     
              v-model="experience.since"
              outlined
              :rules="[ val => val > 1950 && val < 2022 || val == '' || 'This is not a valid date']"
              class="text-h5 q-mb-xs"
              label="Since (Year)"
              mask="####"/>

            <q-input
              v-model="experience.till"
              outlined
              :rules="[ val => val > 1950 && val < 2022 || val == '' || 'This is not a valid date']"
              class="text-h5 q-mb-xs"
              label="Till (Year)"
              mask="####"/>

            <q-btn class="full-width" icon="delete" @click="deleteItem(index)"/>

          </div>

        </q-timeline-entry>

        <!-- Submitting Buttons -->
        <div v-if="editMode || addMode" class="row q-mt-md q-gutter-md">

            <q-btn
              class="bg-primary"
              label="update"
              type="submit"
              />

            <q-btn class="bg-negative" label="Cancel" @click="onCancel"/>

        </div>

      </q-form>

  </q-timeline>

</template>

<script>

export default {
  data() {
    return {
      editMode: false,
      addMode: false,
      newExperience : {
        since:'',
        till:'',
        company:'',
        role:'',
        location:''
        },
      experienceInfo: this.experience ? JSON.parse(JSON.stringify(this.experience)) : [],
    }
  },

  props: ["experience"],

  computed:{

    orderedExperience(){  
      
      let orderedExperience = this.experienceInfo

      if(this.experience){
        
        if(!this.editMode){
          orderedExperience =  this.experienceInfo.sort((a,b) => a.since - b.since)
        }
        
      }

      return orderedExperience

    }
  },

  methods:{
    deleteItem(index){
      this.experienceInfo.splice(index, 1)
    },

    onSubmit(){
      if(this.addMode){
        this.orderedExperience.push(this.newExperience)
      }
      this.$store.dispatch('updateProfile', {type :'experience', info : this.orderedExperience })
      this.onCancel()
    },

    onCancel(){
      this.newExperience = {
        since:'',
        till:'',
        company:'',
        role:'',
        location:''
      }
      this.addMode = false
      this.editMode = false
    }
  }

};
</script>

<style>
</style>