<template>
	<div class="site_content">
		<h1>Modifier un collaborateur</h1>
		<Form :recipe="recipe" v-if="recipe" @send="send"/>
	</div>
</template>

<script>
import Form from '../components/Form'
import recipesServices from '../services/recipesServices.js'

export default {
	name: 'recipeEdit',
	data() {
		return {
			recipe: null
		}
	},
	components: {
		Form
	},
	methods: {
		// Envoie de la modification de la recette
		send(recipe) {
			console.log("send", recipe)
			recipesServices.updateRecipe(recipe).then((res) => console.log(res))
			this.$router.replace("/")
		}
	},
	// Reception des données du serveur pour la recette à modifier
	created() {
		recipesServices.getOneRecipe(this.$route.params.id).then((recipe) => {
			this.recipe = recipe
		})
	},
}
</script>

<style scoped>
	h1 {
		font-size: 1.5em;
	}

	@media (min-width: 768px) {
		h1 {
			font-size: 2em;
		}
	}

</style>