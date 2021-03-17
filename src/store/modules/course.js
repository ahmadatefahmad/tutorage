const state = () => ({
  courses: { activeCourses: [], archivedCourses: [] },

})

const actions = {

  // Course Actions
  async listCourses({ commit }) {

    let courses = {
      activeCourses: [],
      archivedCourses: []
    }

    await this._vm.$gapi.getGapiClient().then(client => {
      client.client.classroom.courses
        .list({ pageSize: 20 })
        .then(foundCourses => {
          if (foundCourses.result.courses) {
            for (let course of foundCourses.result.courses) {
              if (course.courseState == "ACTIVE") { courses.activeCourses.push(course) }
              else if (course.courseState == "ARCHIVED") { courses.archivedCourses.push(course) }
            }
          }
        })

    })

    commit('SET_COURSES', courses)

  },

  async deleteCourse({ dispatch }, id) {

    await this._vm.$gapi.getGapiClient().then(client => {

      client.client.classroom.courses.delete({ id: id })
        .then(() => dispatch('listCourses'),
          err => console.error("Execute error", err))
    })

  },

  async createCourse({ dispatch }, {name, description, uid, studentId}){
    await this._vm.$gapi.getGapiClient().then(client => {
      
      client.client.classroom.courses.create({
        "resource": {
          "name": name,
          "description": description,
          "ownerId": uid
        }
      })
      .then(createdCourse => {
          
          dispatch('archiveOrUnarchiveCource',{
            id: createdCourse.result.id,
            name: createdCourse.result.name,
            action : 'ACTIVE'
          })

          if(studentId)
          dispatch('inviteToClassroom',{courseId:createdCourse.result.id, userId: studentId, tutorId: uid})
          
        },
          err => console.error("Execute error", err))
    })
  },

  async archiveOrUnarchiveCource({ dispatch }, { id, action, name }) {
    
    await this._vm.$gapi.getGapiClient().then(client => {
      client.client.classroom.courses.update({
        "id": id,
        "resource": {
          "courseState": action,
          "name": name
        }
      })
        .then(() => dispatch('listCourses'),
          err => console.error("Execute error", err))

    })

  },

  async unsubscribeCourse({ dispatch }, {courseId, uid}){
    
    await this._vm.$gapi.getGapiClient().then(client => {
      client.client.classroom.courses.students.delete({
        "courseId": courseId,
        "userId": uid
      })
      .then(() => {
        dispatch('initRoom', courseId)
        dispatch('listCourses')
        })
    })
  },

  async ListCourseMaterial({commit}, {id, name}){
    let coursesMaterial = [
      singleCourseMaterial = []
    ]

    await this._vm.$gapi.getGapiClient().then(client =>{
      client.client.classroom.courses.courseWorkMaterials
      .list({"courseId": id}).then( materials =>{

          if(materials.result.courseWorkMaterial){

            for(let material of materials.result.courseWorkMaterial){

              let courseWork = {
                courseName : name,
                courseWork : material.title,
                courseWorkDesc : material.description,
                courseWorkLink: material.alternateLink,
                creationTime: material.creationTime,
                materials : material.materials,
                updateTime: material.updateTime
                
              }
              coursesMaterial.push(coursesMaterial)
            }
          }
          
          
      }).then(() => commit('SET_FILES', coursesMaterial),
      err => console.error("Execute error", err))
    }) 

  },

  async inviteToClassroom({ dispatch }, {courseId, userId, tutorId}){
    await this._vm.$gapi.getGapiClient().then(client => {
      client.client.classroom.invitations.create({
        "resource": {
          "courseId" : courseId,
          "userId" : userId,
          "role": "STUDENT"
        }
      }).then(() =>{
        dispatch('removeRequest',{studentId:userId, tutorId})
        dispatch('initRoom', courseId)
      }).catch(err =>console.log(err))
    })
  },

  async fetchInvitations({ commit }, userId){
    await this._vm.$gapi.getGapiClient().then(client =>{
      client.client.classroom.invitations.list({userId})
      .then(
        res => res.result.invitations ? 
        commit('SET_INVITATION',res.result.invitations.length)  : 
        commit('SET_INVITATION',null))
    })
  }


}

const mutations = {

  SET_COURSES(state, courses) {
    state.courses = courses
  },

  SET_INVITATION( state, invitations){
    state.invitations = invitations
  }

}

const getters = {

  courses:(state) => state.courses,
  invitations:(state) => state.invitations

}

export default {
  state,
  getters,
  actions,
  mutations
}

