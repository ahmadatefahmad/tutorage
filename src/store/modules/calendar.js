const state = () => ({
})

const actions = {

  // Calendar ACTIONS
  async listCalendar({ commit, dispatch, state }) {

    let eventsIDs = []

    await this._vm.$gapi.getGapiClient().then(client => {

      // fetch calendars
      client.client.calendar.calendarList.list({
        pageSize: 10
      }).then(calendarList => {
        
        for (let item of calendarList.result.items) {
          if (item.id.includes('classroom')) {
            
            // allow access to calendar
            if(item.accessRole == "owner"){
              client.client.calendar.acl.insert({
                  "calendarId": item.id,
                  "resource": {
                    "role": "reader",
                    "scope": {
                      "type": "default"
                    }
                  }
              }).then(
                client.client.calendar.events.
                list({ "calendarId": `${item.id}` }).
                then(prom => {

                  if (prom.result.items[0]) {
                    eventsIDs.push({ googleCalendarId: prom.result.items[0].organizer.email })
                  }
                })
              )
            }

            
            else{
              client.client.calendar.events.
                list({ "calendarId": `${item.id}` }).
                then(prom => {

                  if (prom.result.items[0]) {
                    eventsIDs.push({ googleCalendarId: prom.result.items[0].organizer.email })
                  }
                })
            }
            
          }
        }    
      })
    })
    commit('SET_USER_EVENTS', eventsIDs)
  },

}

const mutations = {
  
  SET_USER_EVENTS(state, events) {
    state.calendarEvents = events
  },

  // SET_FILES(state, files) {
  //   state.files = files
  // }
}

const getters = {
  calendarEvents: (state) => state.calendarEvents,

  // files: (state) => state.files
}

export default {
  state,
  getters,
  actions,
  mutations
}