import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import NotFound from '../views/NotFound.vue'
import DetailPost from '../views/DetailPost.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Acceuil'
    }
  },
  { 
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      title: 'Connection'
    }
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
    meta: {
      title: 'CréationDeCompte'
    }
  },
  {
    path: '/:id',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
  },
  {
    path: '/Post',
    name: 'Post',
    component: Post ,
    meta: {
      title: 'PagePosts'
    }
  },
  {
    path: '/create',
    name: 'create',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreatePost.vue'),
    meta: {
      title: 'CréationDePost'
    }
  },
  {
  path: '/DetailPost',
  name: 'DetailPost',
  component: DetailPost ,
  meta: {
    title: 'DetailPost'
  }
},
  {
    name: '/NotFound',
    path: '/:pathMatch(.*)',
    component: NotFound,
    meta: {
      title:'404 Not Found'
    }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


router.afterEach((to, from, next) => {
  document.title = to.meta.title;
})

export default router
