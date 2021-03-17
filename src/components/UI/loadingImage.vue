<template>
  <div class="row justify-center">
      <img
      v-if="imageType == 'files'"
      class="col col-xl-5 col-lg-5 col-md-7 col-sm-9 col-xs-10"
      contain
      id="teacherImg"
      src="~assets/Images/files.png"
      alt="teacher tutor" />

       <img
       v-if="imageType == 'calendar'"
      class="col col-xl-5 col-lg-5 col-md-7 col-sm-9 col-xs-10"
      contain
      id="teacherImg"
      src="~assets/Images/calendar.png"
      alt="teacher tutor" />

       <img
       v-if="imageType == 'classes'"
      class="col col-xl-5 col-lg-5 col-md-7 col-sm-9 col-xs-10"
      contain
      id="teacherImg"
      src="~assets/Images/classes.png"
      alt="teacher tutor" />
    </div>
</template>

<script>
export default {
  props:{imageType:{required:true, type:String}},
}
</script>

<style>

</style>