import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Post from '../views/Post.vue'
import NotFound from '../views/NotFound.vue'
import Profile from '../views/Profile.vue'
import OnePost from '../views/OnePost.vue';

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
    path: '/posts/:id',
    name: 'OnePost',
    component: OnePost,
    meta: {
      title: 'PagePost'
    }
  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})


router.afterEach((to, from, next) => {
  document.title = to.meta.title;
})

export default router
