<template>

   <!-- Specilization -->
      <div class="col">
      
        <div class="row items-start" :class="$q.screen.width >1023 ? 'text-h2' :[$q.screen.width >320 ? 'text-h4' : 'text-h5']">
          
          <p >Specialized in</p>

          <q-space/>

          <q-btn flat v-if="$route.params.id == $store.getters.user.uid && !editMode" round size="14px" class="q-pa-none" icon="more_vert"> 
            <q-menu :offset="[30,0]">
              <q-btn flat style="min-width:80px" v-close-popup @click="editMode = true " label="Edit"/>
            </q-menu>
          </q-btn>

        </div>

        <q-chip
          class="text-h5 bg-primary"
          v-if="!editMode && specTags.length > 0"
          v-for="(spec, index) in specTags"
          :key="index">{{spec}}
        </q-chip>
        
        <q-select
          v-if="editMode || addMode"
          v-model="specTags"
          use-input
          outlined
          use-chips
          multiple
          input-debounce="0"
          @new-value="createValue"
          :options="subjects"
          dense
          options-dense
          @filter="filterFn"
        />

        <div class="row q-mt-md q-gutter-md">
        <q-btn
          v-if="editMode"
          class="bg-primary"
          label="update"
          @click="$store.dispatch('updateProfile', {type :'specialization', info : specTags })
          editMode = false" />  

        <q-btn
          v-if="editMode"
          class="bg-negative"
          label="Cancel"
          @click="editMode ? specTags = specialization ? JSON.parse(JSON.stringify(specialization)) : null : '';
          editMode = false" />
        </div>
      </div>
</template>

<script>
export default {
data() {
    return {
      editMode: false,
      addMode: false,
      subjects: this.$store.getters.subjects,
      specTags: this.specialization ? JSON.parse(JSON.stringify(this.specialization)) : [],
    };
  },

  methods:{ 
    
    createValue (val, done) {
      if (val.length > 0 && this.$store.getters.subjects.includes(val)) {
        console.log(val)
        if (!this.subjects.includes(val)) {
          this.subjects.push(val)
        }
        done(val, 'toggle')
      }
    },

    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.subjects = this.$store.getters.subjects.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  },

  props: ["specialization"],

  beforeCreate(){
    this.$store.dispatch('fetchSubjects');
  }
}
</script>

<style>

</style>