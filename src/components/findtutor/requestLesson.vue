<template>
      <q-dialog v-model="sendingRequest" persistent>
        <q-card style="min-width:30%;" class="bg-var q-px-md">
          <q-form @submit.stop="
            $store.dispatch('requestLesson', 
            {studentId: $store.getters.user.providerData[0].uid, 
            tutorId:tutor.id,
            msg:requestMessage});
            $emit('cancelRequest')">

            <!-- close button -->
            <div class="row justify-end">
              <q-btn class="bg-negative" dense icon="close" @click="$emit('cancelRequest')"/>
            </div>
            
            <!-- tutor info -->
            <teacher-profile v-if="readingMore" class="col-6" :user="tutor" :userInfo="tutor"/>

            <!-- request message -->
            <q-input
              outlined
              autogrow
              dense
              v-model="requestMessage"
              class="text-h5 q-my-md no-scroll"
              label="write a message"/>

            <!-- form buttons -->
            <div class="row justify-center q-gutter-md q-mb-md">
              <q-btn label="Send"
                type="submit" class=" q-px-sm bg-primary"/>

              <q-btn label="cancel" @click="$emit('cancelRequest')" class=" q-px-xs bg-negative" />
            </div>

          </q-form>
        </q-card>
      </q-dialog>
</template>

<script>
import teacherProfile from 'src/components/profile/teacherProfile.vue'
export default {
  props:['sendingRequest','readingMore','tutor'],
  emits:['cancel'],
  components:{teacherProfile},
  data(){
    return{
      requestMessage: ''
    }
}
}
</script>

<style>

</style>