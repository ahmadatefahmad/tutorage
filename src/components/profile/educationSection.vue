<template>
  <q-timeline :class="$q.screen.width < 700 ? 'q-px-none' : 'q-px-md'" color="secondary" >

      <!-- Timeline Heading -->
      <q-timeline-entry heading> Education 

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

            <q-item v-if="orderdEducation.length > 0" class="q-pa-none" style="min-width:80px" v-close-popup>
              <q-btn flat label="Edit" class="full-width" @click="editMode = true"/>
            </q-item>

          </q-menu>
        </q-btn>

      </q-timeline-entry>

      
        
      <q-form @submit.prevent="onSubmit">

        <!-- Adding Input Fields -->
        <q-timeline-entry v-if="addMode"
          :title="newEducation.name + [newEducation.location ? `, ${newEducation.location}`: '']"
          :body="newEducation.specialization"
          :subtitle="newEducation.since + [newEducation.till ? ` - ${newEducation.till}`: ''] ">

          <div  class="row q-gutter-md q-px-lg">
            
            <q-input    
              v-model="newEducation.name"
              outlined
              class="text-h5 col-11 q-pb-sm"
              :rules="[ val => val && val.length > 0 || 'This field is required']"
              label="Institution"/>

            <q-input
              v-model="newEducation.location"
              outlined
              class="text-h5 col-11 q-pb-sm"
              label="Location"/>

              <q-input
              v-model="newEducation.specialization"
              outlined
              class="text-h5 col-11 q-pb-sm"
              label="specialization"/>

            <q-input     
              v-model="newEducation.since"
              outlined
              :rules="[ val => val > 1950 && val < 2022 || val == '' || 'This is not a valid date']"
              class="text-h5 col-11 q-pb-sm"
              label="Since (Year)"
              mask="####"/>

            <q-input
              v-model="newEducation.till"
              outlined
              :rules="[ val => val > 1950 && val < 2022 || val == '' || 'This is not a valid date']"
              class="text-h5 col-11 q-pb-sm"
              label="Till (Year)"
              mask="####"/>

          </div>
        </q-timeline-entry>

        <!-- Timeline Entries -->
        <q-timeline-entry
          v-if="education"
          v-for="(education, index) in orderdEducation"
          :key="index"
          :title="education.name + [education.location ? `, ${education.location}`: '']"
          :body="education.specialization"
          :subtitle="education.since + [education.till ? ` - ${education.till}`: ''] " >

          <!-- Editing Input Fields -->
          <div v-if="editMode" class="q-py-md q-pr-md">
            
            <q-input
              v-model="education.name"
              outlined
              :rules="[ val => val && val.length > 0 || 'This field is required']"
              class="text-h5 q-mb-xs"
              label="Institution"/>

            <q-input
              v-model="education.location"
              outlined
              class="text-h5 q-pb-md"
              label="Location"/>

            <q-input
              v-model="education.specialization"
              outlined
              class="text-h5 q-pb-md"
              label="Location"/>

            
            <q-input     
              v-model="education.since"
              outlined
              :rules="[ val => val > 1950 && val < 2022 || val == ''  || 'This is not a valid date']"
              class="text-h5 q-mb-xs"
              label="Since (Year)"
              mask="####"/>

            <q-input
              v-model="education.till"
              outlined
              :rules="[ val => val > 1950 && val < 2022 || val == '' || val == '' || 'This is not a valid date']"
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
      newEducation : {
        since:'',
        till:'',
        name:'',
        specialization:'',
        location:''
        },
      educationInfo: this.education ? JSON.parse(JSON.stringify(this.education)) : [],
    }
  },

  props: ["education"],

  computed:{

    orderdEducation(){  
      
      let orderdEducation = this.educationInfo

      if(this.education){
        
        if(!this.editMode){
          orderdEducation =  this.educationInfo.sort((a,b) => a.since - b.since)
        }
        
      }

      return orderdEducation

    }
  },

  methods:{
    
    deleteItem(index){
      this.educationInfo.splice(index, 1)
    },

    onSubmit(){
      if(this.addMode){
        this.orderdEducation.push(this.newEducation)
      }
      this.$store.dispatch('updateProfile', {type :'education', info : this.orderdEducation })
      this.onCancel()
    },

    onCancel(){
      this.newEducation = {
        since:'',
        till:'',
        name:'',
        specialization:'',
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