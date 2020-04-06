<template>
	<div class="site_content">
		<h1>Modifier une recette</h1>
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
			// Appel de la méthode PUT axios pour mettre à jour la recette
			recipesServices
			.updateRecipe(recipe)
			.then((res) => {
				// Détecter si il y a une erreur
				if (res.data.error && res.data.error == 1){
					this.$dialog.alert('Erreur serveur : Veuillez refaire l\'opération ultérieurement')
				} else {
					// redirection vers la page principale
					this.$router.replace("/")
				}
			})
			.catch((err) => {
				if (err) {
					this.$dialog.alert('Erreur serveur : Veuillez refaire l\'opération ultérieurement')
				}
			})
		}
	},
	// Réception des données du serveur pour la recette à modifier
	created() {
		recipesServices
		.getOneRecipe(this.$route.params.id)
		.then((recipe) => {
			// Détecter si il y a une erreur
			if (recipe.error && recipe.error == 1){
				this.$dialog.alert('Erreur serveur : Veuillez refaire l\'opération ultérieurement')
			} else {
				// Récupération des données de la recette
				this.recipe = recipe
			}
		})
		.catch((err) => {
			if (err) {
				this.$dialog.alert('Erreur serveur : Veuillez refaire l\'opération ultérieurement')
			}
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