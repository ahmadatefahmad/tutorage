<template>
  <div class="q-mt-sm">

    <!-- Basic Info Section -->
    <basic-info :userInfo="userInfo"/>

    <!-- Education & Experience Sections -->
    <div class="row q-mt-lg">
      
      <!-- Education Section -->
      <div class="col q-mr-lg bg-var shadow-5 q-pa-md rounded-borders"
      :class="$q.screen.width < 700 ? 'col-12 full-width q-mb-lg' : ''" >
        <education-section :education="userInfo.education" />
      </div>

      <!-- Experience Section -->
      <div class="col bg-var shadow-5 q-pa-md rounded-borders"
      :class="$q.screen.width < 700 ? 'col-12 full-width q-mb-lg' : ''">
        <experience-section :experience="userInfo.experience"/>
      </div>

    </div>

    <!-- Specialization Section -->
    <div class="col bg-var shadow-5 q-pa-md rounded-borders"
    :class="$q.screen.width < 700 ? 'col-12 full-width  q-mb-lg q-px-none' : '  q-mt-lg q-px-lg'">
      <specialization-section :specialization="userInfo.specialization"/>
    </div>

  </div>
  </div>
</template>

<script>
import basicInfo from "./basicInfo";
import educationSection from "./educationSection";
import experienceSection from "./experienceSection";
import specializationSection from "./specializationSection";

export default {
  
  components: {
    basicInfo,
    educationSection,
    experienceSection,
    specializationSection,
  },

  props: ['userInfo'],


}
</script>


