<template>
	<div class="site_content">
		<article class="recipe-content" v-if="recipe">
			<h1>{{recipe.titre}}</h1>
			<figure>
				<img v-if="recipe.photo" :src="recipe.photo" :alt="`Photo de ${recipe.titre}`">
				<img v-else src="../assets/default-picture.png" :alt="`Photo de ${recipe.titre}`">
			</figure>
			<IconsFields :niveau="recipe.niveau" :tempsPreparation="recipe.tempsPreparation" :personnes="recipe.personnes" />
			<div class="description">
				{{recipe.description}}
			</div>
			<div class="kitchen">
				<div class="ingredients">
					<h2>Les ingrédients :</h2>
					<ul>
						<li v-for="(ingredient, index) in recipe.ingredients" :key="index">
							{{ composant(ingredient) }}
						</li>
					</ul>
				</div>
				<div class="composants">
					<h2>Les étapes :</h2>
					<ul>
						<li v-for="(etape, index) in recipe.etapes" :key="index">
							{{ etape }}
						</li>
					</ul>
				</div>
			</div>
			<div class="button-container">
				<router-link :to="`/modifier/${recipe.id}`" class="btn btn-small">Modifier</router-link>
				<button class="btn btn-small" v-confirm="{
				ok: deleteRecipe,
				cancel: null,
				message: 'Voulez vous vraiment supprimer cette recette ?'}">Supprimer</button>
			</div>
		</article>
	</div>
</template>

<script>
import recipesServices from '../services/recipesServices.js'
import IconsFields from '../components/IconsField'

export default {
	name: 'Recipe',
	components: {
		IconsFields
	},
	data() {
		return {
			recipe: null
		}
	},
	methods: {
		composant(ingredient) {
			return ingredient[0] + ' ' + ingredient[1]
		},
		deleteRecipe() {
			recipesServices
			.deleteRecipe(this.recipe.id)
			.then((res) => {
				if(res){
					if (res.data.error && res.data.error == 1){
						this.$dialog.alert('Erreur serveur : Veuillez refaire l\'opération ultérieurement').then(function(dialog) {
							console.log('Closed', dialog)
						})
						console.log('Error: Roll back')
					}
				}
				this.$router.replace("/")
			})
			.catch((err) => console.log(`Ajax error delete ezfz : ${err}`))
		}
	},
	created() {
		recipesServices.getOneRecipe(this.$route.params.id).then((recipe) => {
			this.recipe = recipe
		})
	},
}
</script>

<style scoped>
	.recipe-content {
		max-width: 800px;
		margin: 0 auto;
	}

	h1 {
		text-align: center;
	}

	figure {
		margin: 0 auto;
		height: 320px;
		overflow: hidden;
		width: 100%;
		max-width: 500px;
	}

	figure img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: 0.5s;
	}

	.icons-content {
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

	.description {
		width: 100%;
		max-width: 400px;
		text-align: center;
		margin: 0 auto 15px;
	}

	.kitchen {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		margin-bottom: 15px;
	}

	.ingredients {
		max-width: 350px;
		width: 100%;
	}

	.composants {
		max-width: 350px;
		width: 100%;
	}

	h2 {
		margin-bottom: 30px;
	}

	.kitchen ul {
		padding-left: 20px;
	}

	.kitchen ul li {
		margin-bottom: 15px;
	}

	.button-container {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}

	.button-container a,
	.button-container button {
		margin: 0 20px 0 0;
		color: #772769;
		padding: 5px 10px;
		border: 1px solid #772769;
		font-size: 0.9em;
		background: #fff;
	}

	.button-container a {
		text-decoration: none;
	}

	.button-container a:hover,
	.button-container button:hover {
		font-weight: bold;
	}

	@media (min-width: 580px) {
		figure {
			height: 500px;
			max-width: 500px;
		}

		.ingredients {
			max-width: 250px;
		}
	}

</style>