<template>
  <q-card class="q-pa-md" 
  :class="this.courseName?'bg-main shadow-0 no-border-radius':'bg-var shadow-5'" >
    
    <p v-if="this.course" class="text-h4">{{course.name}}
      <q-btn v-if="course.teacherFolder" label="google Drive Folder" @click="$router.absUrl(course.teacherFolder.alternateLink)" class="float-right" rounded />
    </p>

    <p v-if="courseName" class="text-h4">{{courseName}}</p>

    <div class="shadow-10 rounded-borders" v-for="(courseWork, index) in courseMaterial" :key="index">
      <q-separator class="q-my-md" inset/>
      
      <p class="q-ma-none" style="max-width:70px">
        {{courseWork.updateTime.slice(0, 10)+' '+courseWork.updateTime.slice(11, 16)}}
        <q-tooltip :delay="500">
          Last Update
        </q-tooltip>
      </p>

      <p class="text-h6">{{ courseWork.title }}
        <q-btn @click="$router.absUrl(courseWork.link)" class="float-right" round icon="folder"/>
      </p>

      <p>{{ courseWork.description }}</p>
      
      <q-item class="rounded-borders" style="width:auto"  v-for="(material, index) in courseWork.materials" :key="index" @click="$router.absUrl(material.driveFile.driveFile.alternateLink)" clickable v-ripple>

        <q-item-section  side>
          <q-avatar  :size="$q.screen.width >1023 ? '80px' :  '60px' " rounded class="cursor-pointer thumbnail">
              <img referrerPolicy="no-referrer"  :src="material.driveFile.driveFile.thumbnailUrl">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{material.driveFile.driveFile.title}}</q-item-label>
          <q-item-label caption>{{material.driveFile.driveFile.title.substr(material.driveFile.driveFile.title.length - 3)}}</q-item-label>
        </q-item-section>

      </q-item>    

        
    </div>

    <p class="text-h6" v-if="!courseMaterial.length > 0">There is no material for that course</p>

  </q-card>
</template>

<script>
export default {

  props:['course','courseId','courseName'],

  data(){
    return{
      courseMaterial: [],
    }
  },

  emit:['loadingIsDone'],

  async beforeCreate(){  

    let courseMaterial = []

    await this.$gapi.getGapiClient().then(client =>{
      client.client.classroom.courses.courseWorkMaterials
      .list({"courseId":  this.course ? this.course.id : this.courseId })
      .then( materials =>{

        if(materials.result.courseWorkMaterial){

          for(let material of materials.result.courseWorkMaterial){

            let courseWork = {
              
              title : material.title,
              description : material.description,
              link: material.alternateLink,
              materials : material.materials,
              updateTime: material.updateTime
              
            }

            courseMaterial.push(courseWork)
          }
        }

      })
    })
    .then(()=> {
            this.courseMaterial = courseMaterial
            },
      err => console.error("Execute error", err))
      this.$emit('loadingIsDone')
  }

}
</script>

<style>
.thumbnail:hover{
  font-size: 200px !important;
  position: absolute;
  z-index: 2;
}
</style>