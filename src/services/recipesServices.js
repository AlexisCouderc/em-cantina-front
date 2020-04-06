import axios from 'axios'

const API_ENDPOINT = 'http://localhost:9000/api'

export default {
	// Recevoir toute les recettes
	getAllRecipes() {
		return axios
		.get(`${API_ENDPOINT}/recipes`)
		.then((res)=> {
			return res.data
		})
		.catch((error) => {
			return error
		})
	},
	// Recevoir une recette spécifique 
	getOneRecipe(recipeId) {
		return axios
		.get(`${API_ENDPOINT}/recipe/${recipeId}`)
		.then((res)=> {
			return res.data
		})
		.catch((error) => {
			return error
		})
	},
	// Suppression d'une recette
	deleteRecipe(recipeId) {
		return axios
		.delete(`${API_ENDPOINT}/recipe/${recipeId}`)
		.then((res) => {
			return res.data
		})
		.catch((error) => {
			return error
		})
	},
	// création d'une recette
	createRecipe(recipe) {
		return axios
		.post(`${API_ENDPOINT}/recipes`, recipe)
		.then((res)=> {
			return res.data
		})
		.catch((error) => {
			return error
		})
	},
	// mise à jour d'une recette
	updateRecipe(recipe) {
		return axios
		.put(`${API_ENDPOINT}/recipe/${recipe.id}`, recipe)
		.then((res)=> {
			return res.data
		})
		.catch((error) => {
			return error
		})
	}
}