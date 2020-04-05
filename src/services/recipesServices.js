import axios from 'axios'

const API_ENDPOINT = 'http://localhost:9000/api'

export default {
	getAllRecipes() {
		return axios
		.get(`${API_ENDPOINT}/recipes`)
		.then((res)=> res.data)
		.catch((error) => console.log(`Ajax error getAll : ${error}`))
	},
	getOneRecipe(recipeId) {
		return axios
		.get(`${API_ENDPOINT}/recipe/${recipeId}`)
		.then((res)=> res.data)
		.catch((error) => console.log(`Ajax error getOne : ${error}`))
	},
	deleteRecipe(recipeId) {
		return axios
		.delete(`${API_ENDPOINT}/recipe/${recipeId}`)
		.then((res) => console.log('Recette bien supprimé', res))
		.catch((error) => console.log('Une erreur est survenue, la  recette n\'est pas supprimé : ', error))
	},
	createRecipe(recipe) {
		return axios
		.post(`${API_ENDPOINT}/recipes`, recipe)
		.then((res)=> res.data)
		.catch((error) => {
			console.log(`Ajax error create : ${error}`)
		})
	},
	updateRecipe(recipe) {
		console.log(recipe)
		return axios
		.put(`${API_ENDPOINT}/recipe/${recipe.id}`, recipe)
		.then((res)=> res.data)
		.catch((error) => console.log(`Ajax error : ${error}`))
	}
}