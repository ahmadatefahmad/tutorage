<template>
  <div>

    
    <loading-image v-if="!loadingIsDone" :imageType="'calendar'"/>

    <div v-if="loadingIsDone">
      <div class="row q-mt-lg">


        <p class="col-3 text-weight-light col-2" :class="$q.screen.width < 1023 ? 'text-h5' : 'text-h4'"> {{viewTitle}}</p>

        <div class="col-9">

          <div class="row justify-end q-gutter-xs">

            <q-btn icon="chevron_left" class="rounded-borders primary bg-var" :size="btnSize" @click="previous"/>
            <q-btn icon="chevron_right" class="rounded-borders primary bg-var" :size="btnSize" @click="nextPage"/>
            <q-btn icon="event" class="rounded-borders primary bg-var" :size="btnSize" @click="today"/>

            <q-btn class="viewButton primary bg-var" label="view" :size="btnSize"/>
              <q-menu
                transition-show="flip-right"
                transition-hide="flip-left"
                target=".viewButton"
                :offset="[0,5]"
                anchor="bottom left">

                <q-item
                  v-for="(btnInfo, index) in viewButtons" :key="index"
                  clickable
                  v-close-popup
                  style="min-width:100px"
                  @click="setViewType(btnInfo.viewType)"
                  :class="$q.screen.width < 1023 ? 'text-h7' : 'text-h6'"
                  class="text-center q-pa-sm primary bg-var">

                    <q-item-section>{{btnInfo.label}}</q-item-section>
                  </q-item>
                

              </q-menu>
            </q-btn>
          
          </div>
        
        </div>
        
        
      </div>

      <full-calendar
      ref="fullCalendar"
      :options="calendarOptions" />
    </div>
  </div>

</div>


</template>

<script>
import { mapGetters } from 'vuex'
import loadingImage from 'src/components/UI/loadingImage.vue' 

import FullCalendar, { preventDefault } from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import rrulePlugin from '@fullcalendar/rrule'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'

import googleCalendarPlugin from '@fullcalendar/google-calendar';

export default {

  data () {
    return {
      btnSize: this.$q.screen.width < 1023 ? '12px' : '14',
      loadingIsDone: false,
      viewButtons: 
      [
        {viewType:'dayGridMonth', label: 'Month'},
        {viewType:'timeGridWeek', label: 'Week'},
        {viewType:'listWeek', label: 'Agenda'}
      ],
      viewTitle: '',
      calendarOptions: {
        headerToolbar:false,
        height:'80vh',
        plugins: [ googleCalendarPlugin, listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin , rrulePlugin],
        initialView: 'timeGridWeek',
        eventClick: this.handleEventClick,
        googleCalendarApiKey: 'AIzaSyD22FHl7ERk44bLp4xV1lyLWOVfUQ0WOxo',     
        eventSources: [],
      }
    }
  },

  async beforeMount(){
    await this.$store.dispatch('listCalendar')
    this.loadingIsDone = true
  },

  components:{
    FullCalendar,
    loadingImage
  },

  methods:{

    handleDateClick(){
    },
    handleEventClick(event){
      event.jsEvent.preventDefault()
      this.$router.absUrl(event.event._def.url)
    },   
    nextPage(){
      this.$refs.fullCalendar.getApi().next()
      this.setViewTitle()

    },
    previous(){
      this.$refs.fullCalendar.getApi().prev()
      this.setViewTitle()
    },
    today(){
      this.$refs.fullCalendar.getApi().today()
      this.setViewTitle()
    },
    setViewType(viewType){
      this.$refs.fullCalendar.getApi().changeView(viewType)
      this.setViewTitle()
    },
    setViewTitle(){
      if(this.$refs.fullCalendar){
        this.viewTitle = this.$refs.fullCalendar.getApi().currentData.viewTitle
      }
    }
    
  },

  computed:{
    ...mapGetters(['calendarEvents'])

  },

  watch: {
    calendarEvents: {
    handler(newVal) {
      this.setViewTitle()
        if(this.$refs.fullCalendar){
          this.$refs.fullCalendar.options.eventSources = newVal
        }
      }
    },
    
  }

}
</script>

<style>
.fc-event-title{
  font-size: 16px;
  padding-left: 4px;
}

.fc-event-time{
  font-size: 12px !important;
  padding-left: 4px;
}
.body--dark .fc-list-day-cushion{
  background-color : var(--dark);
}

.body--dark .fc-list-event:hover{
  color : var(--dark) !important
}
.q-field__native, .q-field__marginal{
 /* color: var(--dark) !important; */
}
.q-field__control{
  color: grey !important;
}

</style>
