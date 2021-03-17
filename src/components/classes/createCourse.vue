<template>
  <q-dialog v-model="creatingCourse" persistent>
    <q-card :style="$q.screen.width<=599 ? 'min-width:100%': $q.screen.width<=1023 ? 'min-width:50%':'min-width:30%'" class="bg-var q-pa-md">
      <p :class="$q.screen.width <= 599? 'text-h7':'text-h6'" v-if="isRequest">You can create a new classroom and {{ studentName.split(' ')[0] }} will be added to it automatically, <br> or you can add the student to an existing class</p>
      <q-form v-if="!success" @submit="addCourse">
        <div>
          <q-input
            v-model="name"
            outlined
            dense
            class="q-mb-xs"
            label="Course Name"
            :rules="[ val => val && val.length > 0 || 'Please type the course name']"/>

            <q-input
            v-model="description"
            outlined
            dense
            class="q-mb-md"
            label="Course description"/>
        </div>
        <div class="row justify-center q-gutter-md">
          <q-btn label="create" type="submit" class="bg-primary"/>
          <q-btn label="cancel" class="bg-negative" @click="closeForm"/>
        </div>
      </q-form>
      <q-banner v-if="success" class="bg-var q-pa-md">
        It will take few seconds to get updated
      </q-banner>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props:['creatingCourse','isRequest','tutorId','studentId','studentName'],
  data(){
    return{
      success: false,
      description: '',
      name: '',
    }
  },

  methods:{

    addCourse(){
      if(this.name != ''){
        this.$store.dispatch('createCourse', {
          name : this.name,
          description: this.description,
          uid: this.$store.getters.user.providerData[0].uid,
          studentId:this.studentId
        })
        this.showSuccessMsg()
      }
    },

    showSuccessMsg(){
      this.success = true
      setTimeout(() => {
        this.closeForm()
        this.$router.push('/classes')
      }, 3000)
    },

    closeForm(){
      this.$emit('cancel')
      this.description= ''
      this.name= ''
    }
  },
}
</script>

<style>

</style>