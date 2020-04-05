<template>
  <div class="site_content">
	<h1>Les recettes du Jet d'ail ! </h1>
	<button class="show-filter" @click="showHide"><span>{{ btnFilter }}</span>Filtrer</button>
	<transition name="slide-form">
		<form v-if="show" class="filter-form">
			<div class="form-container">
				<div class="form-content search">
					<label for="search" class="form-content-title">Recherchez votre recette :</label>
					<br>
					<input type="search" name="search" placeholder="Recherchez votre recette" v-model="search">
				</div>
				<div class="form-content difficulty">
					<label for="difficulty" class="form-content-title">Difficulté :</label>
					<br>
					<select name="difficulty" v-model="difficulty">
						<option value="Toutes">Toutes</option>
						<option value="padawan">Padawan</option>
						<option value="jedi">Jedi</option>
						<option value="maitre">Maître</option>
					</select>
				</div>
				<div class="form-content nb-person">
					<p class="form-content-title">Nombre de personnes :</p>
					<div class="min">
						<label for="min">Min :</label>
						<input type="number" name="min" v-model="min" placeholder="2">
					</div>
					<div class="max">
						<label for="max">Max :</label>
						<input type="number" name="max" v-model="max" placeholder="6">
					</div>
				</div>
				<div class="form-content time">
					<label for="max" class="form-content-title">Temps de préparation maximum :</label>
					<br>
					<input type="number" name="temps" v-model="time" placeholder="35">
					<span>minutes</span>
				</div>
			</div>
			<input class="reset" type="reset" value="Réinitialiser" v-on:click="resetForm">
		</form>
	</transition>

	<div class="recipe-list" v-if="recipesList">
		<RecipeCard v-for="recipe in filterList" :key="recipe.id" :recipe="recipe" @removeRecipe="deleteRecipe"/>
	</div>
  </div>
</template>

<script>
import RecipeCard from '../components/RecipeCard'
import recipesServices from '../services/recipesServices.js'

export default {
	name: 'Home',
	components: {
		RecipeCard
	},
	data() {
		return {
			recipesList: null,
			search: '',
			difficulty: 'Toutes',
			min: '',
			max: '',
			time: '',
			show: false,
			btnFilter: "+"
		}
	},
	computed: {
		filterList() {
			return this.recipesList.filter((recipe) => {
				const onSearch = recipe.titre.toLowerCase()
				const diff = recipe.niveau.toLowerCase()
				const nbPers = recipe.personnes
				const prepTime = recipe.tempsPreparation
				if(onSearch.includes(this.search.toLowerCase()) == false){
					return false
				}
				if(this.difficulty && this.difficulty !== 'Toutes'){
					if(diff.includes(this.difficulty.toLowerCase()) == false){
						return false
					}
				}
				if(this.max !== '') {
					if(nbPers > this.max) {
						return false
					}
				}
				if(this.min !== '') {
					if(nbPers < this.min) {
						return false
					}
				}
				if(this.time !== '') {
					if(prepTime > this.time) {
						return false
					}
				}
				return true
			})
		}
	},
	methods: {
		deleteRecipe(recipe) {
			const index = this.recipesList.indexOf(recipe)
			console.log(index)
			if (index > -1){
				const deleted_recipe = this.recipesList.splice(index , 1)
				recipesServices
				.deleteRecipe(recipe.id)
				.then((res) => {
					if(res){
						if (res.data.error && res.data.error == 1){
							this.$dialog.alert('Erreur serveur : Veuillez refaire l\'opération ultérieurement').then(function(dialog) {
								console.log('Closed', dialog)
							})
							console.log('Error: Roll back')
							this.recipesList.splice(index,0, deleted_recipe.pop())
						}
					}
				})
				.catch((err) => console.log(`Ajax error delete : ${err}`))
			}
		},
		resetForm() {
			this.search = ''
			this.max = ''
			this.min = ''
			this.difficulty = 'Toutes'
			this.time = ''
		},
		showHide() {
			this.show = !this.show
			this.btnFilter = this.btnFilter === '+' ? '-' : '+'
		}
	},
	created() {
		recipesServices.getAllRecipes().then((list) => {
			this.recipesList = list
		})
	}
}
</script>

<style scoped>
	/* Filter */

	.show-filter {
		font-size: 1em;
		padding: 3px 5px;
		border: none;
		background: rgba(245,204,113,.2);
		margin: 0;
	}

	.show-filter span {
		margin-right: 4px;
		font-size: 1.2em;
		line-height: 10px;
	}

	/* Filter animation */

	.slide-form-enter-active {
		-moz-transition-duration: 0.3s;
		-webkit-transition-duration: 0.3s;
		-o-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-moz-transition-timing-function: ease-in;
		-webkit-transition-timing-function: ease-in;
		-o-transition-timing-function: ease-in;
		transition-timing-function: ease-in;
	}

	.slide-form-leave-active {
		-moz-transition-duration: 0.3s;
		-webkit-transition-duration: 0.3s;
		-o-transition-duration: 0.3s;
		transition-duration: 0.3s;
		-moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
		-webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
		-o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
		transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	}

	.slide-form-enter-to, .slide-form-leave {
		max-height: 100px;
		overflow: hidden;
	}

	.slide-form-enter, .slide-form-leave-to {
		overflow: hidden;
		max-height: 0;
	}

	/* Form content */

	.filter-form {
		width: calc(100% - 30px);
		display: block;
		position: relative;
		padding: 15px;
		background: rgba(245,204,113,.2);
	}

	.form-container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.form-content {
		width: 100%;
		margin-bottom: 20px;
	}
	
	.form-content-title {
		font-size: 1em;
		font-weight: bold;
	}

	.form-content label {
		width: 100%;
	}

	.form-content p {
		margin: 0;
	}

	.form-content input, .form-content select {
		margin: 15px 0 0;
		background-color: #fff;
		border: 1px solid #000;
		border-radius: 0;
		padding: 5px 10px;
		font-size: 1em;
	}

	.search input {
		padding: 5px 10px;
		width: 80%;
	}

	.nb-person div {
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 15px;
	}

	.nb-person div input{
		width: 50px;
		margin: 0;
		padding: 2px 10px;
	}

	.nb-person div label{
		width: 40px;
		margin: 0 10px 0 0;
	}

	.time input{
		width: 50px;
		margin-right: 10px;
		padding: 2px 10px;
	}

	.reset {
		border: 1px solid #000;
		padding: 3px 10px;
		font-size: 1em;
		background: #fff;
	}

	.recipe-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding: 20px 0 ;
	}

	@media (min-width: 1024px) {
		.form-content {
			width: 25%;
		}
	}

	@media (min-width: 580px) and  (max-width: 1023px) {
		.form-content {
			width: 50%;
		}
	}

</style>
