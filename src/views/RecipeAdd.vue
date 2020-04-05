<template>
	<div class="site_content">
		<h1>Ajouter une recette</h1>
		<Form @send="send"/>
	</div>
</template>

<script>
import recipesServices from '../services/recipesServices'
import Form from '../components/Form.vue'

export default {
	name: 'RecipeAdd',
	components: {
		Form
	},
	methods: {
		send(recipe) {
			recipesServices.createRecipe(recipe)
			.then((res) => {
				console.log(res)
				this.$router.replace("/")
			})
		}
	}
}
</script>