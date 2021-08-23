import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Accueil'
    }
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/Post',
    name: 'Post',
    component: Post,
    meta: {
      title: 'PagePosts'
    }
  },
  {
    name: '/NotFound',
    path: '/:pathMatch(.*)',
    component: NotFound,
    meta: {
      title: '404 Not Found'
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
