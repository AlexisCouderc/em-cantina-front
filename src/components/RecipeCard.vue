<template>
	<article class="recipe-card">
		<router-link :to="`/recette/${recipe.id}`" tag="div" class="card-head">
			<figure>
				<img v-if="recipe.photo" :src="recipe.photo" :alt="`Photo de ${recipe.titre}`">
				<img v-else src="../assets/default-picture.png" :alt="`Photo de ${recipe.titre}`">
			</figure>
			<h2>{{recipe.titre}}</h2>
		</router-link>
		<div class="card-body">
			<IconsFields :niveau="recipe.niveau" :tempsPreparation="recipe.tempsPreparation" :personnes="recipe.personnes" />
			<div class="button-container">
				<router-link :to="`/modifier/${recipe.id}`" class="btn btn-small">Modifier</router-link>
				<button class="btn btn-small" v-confirm="{
				ok: removeRecipe,
				cancel: null,
				message: 'Voulez vous vraiment supprimer cette recette ?'}">Supprimer</button>
			</div>
		</div>
	</article>
</template>

<script>
import IconsFields from './IconsField'

export default {
	name: 'RecipeCard',
	components: {
		IconsFields
	},
	props:{
		recipe: {
			type: Object,
			required: true
		}
	},
	methods: {
		// Supression d'une recette
		removeRecipe() {
			this.$emit('removeRecipe', this.recipe)
		}
	}
}
</script>

<style>
	.recipe-card {
		width: 300px;
		margin: 10px 0;
		position: relative;
		display: block;
		box-shadow: 0 0 10px rgba(245, 204, 113, 0.5);
		background: #FCFAF1;
	}

	.recipe-card:hover {
		box-shadow: 0 0 10px #f5cc71;
	}

	.card-head {
		display: block;
		position: relative;
	}

	figure {
		margin: 0;
		height: 300px;
		overflow: hidden;
	}

	figure img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: 0.5s;
	}

	.card-head h2 {
		position: absolute;
		display: block;
		width: calc(100% - 30px);
		bottom: 0;
		padding: 20px 15px;
		margin: 0;
		background: rgba(114, 39, 105, 0.6);
		color: #FCFAF1;
	}

	.card-head:hover {
		cursor: pointer;
	}

	.card-head:hover h2 {
		background: rgba(114, 39, 105, 0.8);
	}

	.card-head:hover img {
		transform: scale(1.5);
		filter: blur(2px);
	}

	.card-body {
		padding: 15px 0;
	}

	.icons-content {
		display: flex;
		justify-content: space-around;
		margin-bottom: 15px;
	}

	.icons-details {
		display: flex;
		align-items: center;
	}

	.icons-details img {
		width: 25px;
		margin-right: 5px;
	}


	.icons-field {
		width: 100%;
		max-width: 500px;
		margin: 15px auto;
		display: flex;
		justify-content: space-around;
	}

	.icons-details {
		display: flex;
		align-items: center;
	}

	.icons-details img {
		width: 25px;
		margin-right: 5px;
	}

	.button-container {
		width: calc(100% - 20px);
		display: flex;
		justify-content: space-between;
		padding: 0 10px;
	}

	.button-container button, 
	.button-container a {
		text-decoration: none;
		color: #772769;
		padding: 3px 6px;
		border: 1px solid #772769;
		background: #FFF;
		font-size: 0.9em;
	}

	.button-container button:hover, 
	.button-container a:hover {
		font-weight: bold;
	}

	@media (min-width: 580px) {
		.recipe-card {
			margin: 10px;
		}

		.card-body {
			padding: 15px 5px;
		}

		.button-container {
			width: calc(100% - 10px);
			padding: 0 5px;
		}

	}
</style>