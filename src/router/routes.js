import store from 'src/store'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {name:'home', path: '/', component: () => import('pages/Index.vue') }
    ],
    meta: {
      guest: true
    }
  },

  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {name: 'auth', path: '/auth', component: () => import('src/pages/auth.vue') }
    ],
    meta: {
      guest: true
    }
  },

  {
    path: '/findtutor',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/findTutor.vue') }
    ],
    meta: {
      auth: true
    }
  },

  {
    path: '/profile/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/profile/_id.vue') }
    ],
    meta: {
      auth: true
    }
  },

  {
    path: '/calendar',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/calendar', component: () => import('pages/calendar.vue') }
    ],
    meta: {
      auth: true
    }
  },

  {
    path: '/files',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/files', component: () => import('pages/files.vue') }
    ],
    meta: {
      auth: true
    }
  },

  {
    path: '/requests',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/requests', component: () => import('pages/requests.vue') }
    ],
    meta: {
      auth: true
    }
  },
  
  {
    path: '/classes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/classes/index.vue') }
    ],
    meta: {
      auth: true
    }
  },

  {
    path: '/classes/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/classes/_id.vue') }
    ],
    meta: {
      auth: true
    }
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
