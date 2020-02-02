
const routes = [{
  path: '/',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    name: 'collect',
    component: () => import('pages/CollectEmail.vue'),
    meta: {
      requiresAuth: false
    }
  }]
},
{
  path: '/brunch',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    name: 'brunch',
    component: () => import('pages/Brunch.vue'),
    meta: {
      requiresAuth: false
    }
  }]
},
{
  path: '/auth',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    path: '',
    name: 'auth',
    component: () => import('pages/Auth.vue'),
    meta: {
      requiresAuth: false
    }
  }]
},
{
  path: '/profile',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    name: 'profile',
    path: '',
    props: true,
    component: () => import('pages/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  }]
},
{
  path: '/admin',
  component: () => import('layouts/MyLayout.vue'),
  children: [{
    name: 'admin',
    path: '',
    component: () => import('pages/Admin.vue'),
    meta: {
      requiresAuth: true
    }
  }]
}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}
export default routes
