<template>
	<div class="site_content">
		<h1>Ajouter une recette</h1>
		<Form @send="send"/>
	</div>
</template>

<script>
import recipesServices from '../services/recipesServices'
import Form from '../components/Form'

export default {
	name: 'RecipeAdd',
	components: {
		Form
	},
	methods: {
		// Envoie des données au serveur
		send(recipe) {
			// Appel de la méthode Post axios pour créer la recette
			recipesServices.createRecipe(recipe)
			.then((res) => {
				// Détecter si il y a une erreur
				if (res.error && res.error == 1){
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
	}
}
</script>