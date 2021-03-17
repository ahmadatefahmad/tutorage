<template>
<q-page :class="$q.screen.width >= 600 ? 'row q-gutter-md':''">
    
    <!-- horizontal cards -->
    <horizontal-tutor-card
      v-if="$q.screen.width < 600"
      v-for="(tutor, index) in $store.getters.filteredTutors"
      :key="index"
      :tutor="tutor" />

    <!-- carousel cards -->
    <carousel
    navigationNextLabel=""
    navigationPrevLabel=""
    :perPageCustom="[[768, 3],[896, 4], [1024, 5]]"
    class="fit"
    :navigationEnabled="true"
    v-if="$q.screen.width >= 600">
     <slide v-for="(tutor, index) in $store.getters.filteredTutors" :key="index">
        <grid-tutor-card :tutor="tutor" />
      </slide>   
    </carousel>

  </q-page>
</template>

<script>
import horizontalTutorCard from 'src/components/findtutor/horizontalTutorCard.vue'
import gridTutorCard from 'src/components/findtutor/gridTutorCard.vue'
import { Carousel, Slide } from 'vue-carousel'

export default {
  props:['subject'],
 
  components:{
    horizontalTutorCard,
    gridTutorCard,
    Carousel,
    Slide,
  },

  
}
</script>

<style>

</style>