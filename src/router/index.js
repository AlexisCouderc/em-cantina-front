import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RecipeAdd from '../views/RecipeAdd.vue'
import RecipeEdit from '../views/RecipeEdit.vue'
import Recipe from '../views/Recipe.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
	path: '/add', 
	component: RecipeAdd 
  },
  { 
	path: '/edit/:id', 
	component: RecipeEdit 
  },
  { 
	path: '/recipe/:id', 
	component: Recipe 
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
