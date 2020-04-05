<template>
	<article class="recipe-card">
		<router-link :to="`/recipe/${recipe.id}`" tag="div" class="card-head">
			<figure>
				<img v-if="recipe.photo" :src="recipe.photo" :alt="`Photo de ${recipe.titre}`">
				<img v-else src="../assets/default-picture.png" :alt="`Photo de ${recipe.titre}`">
			</figure>
			<h2>{{recipe.titre}}</h2>
		</router-link>
		<div class="card-body">
			<div class="card-content">
				<div class="card-details">
					<img src="../assets/lightsaber.svg" alt=""><p>{{ upperCaseLevel }}</p>
				</div>
				<div class="card-details">
					<img src="../assets/darth-vader.svg" alt=""><p>{{ people }}</p>
				</div>
				<div class="card-details">
					<img src="../assets/clock.svg" alt=""><p>{{ minToHour }}</p>
				</div>
			</div>
			<div class="button-container">
				<router-link :to="`/edit/${recipe.id}`" class="btn btn-small">Modifier</router-link>
				<button class="btn btn-small" v-confirm="{
				ok: removeRecipe,
				cancel: null,
				message: 'Voulez vous vraiment supprimer cette recette ?'}">Supprimer</button>
			</div>
		</div>
	</article>
</template>

<script>
export default {
	name: 'RecipeCard',
	props:{
		recipe: {
			type: Object,
			required: true
		}
	},
	computed: {
		upperCaseLevel() {
			return this.recipe.niveau.charAt(0).toUpperCase() + this.recipe.niveau.substring(1)
		},
		minToHour() {
			let temps = this.recipe.tempsPreparation
			if (temps >= 60) {
				let hours = temps /60
				let rhours = Math.floor(hours)
				let min = Math.round((hours - rhours) * 60)
				return rhours + 'h' + min + 'min'
			}
			return temps + 'min'
		},
		people() {
			const person = this.recipe.personnes
			if (person > 1) {
				return person + ' personnes'
			}
			return person + ' personne'
		}
	},
	methods: {
		removeRecipe() {
			this.$emit('removeRecipe', this.recipe)
		}
	}
}
</script>

<style scoped>
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

	.card-content {
		display: flex;
		justify-content: space-around;
		margin-bottom: 15px;
	}

	.card-details {
		display: flex;
		align-items: center;
	}

	.card-details img {
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
		color: #722769;
		padding: 3px 6px;
		border: 1px solid #722769;
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