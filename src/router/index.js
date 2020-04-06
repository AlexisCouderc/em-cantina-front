import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RecipeAdd from '../views/RecipeAdd.vue'
import RecipeEdit from '../views/RecipeEdit.vue'
import Recipe from '../views/Recipe.vue'

Vue.use(VueRouter)

const routes = [
	// Route pour accéder à la page d'accueil
	{
		path: '/',
		component: Home
	},
	// Route pour accéder à la page d'ajout d'une recette
	{ 
		path: '/ajouter', 
		component: RecipeAdd 
	},
	// Route pour accéder à la page de modification d'une recette
	{ 
		path: '/modifier/:id', 
		component: RecipeEdit 
	},
	// Route pour accéder à la page d'une recette
	{ 
		path: '/recette/:id', 
		component: Recipe 
	}
]

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes
})

export default router
