<template>
	<form class="recipeform" @submit.prevent="send">
		<div class="form-up">
			<div class="up-group">
				<div class="form-group" :class="{'form-group--error': $v.recipe.titre.$error }">
					<label for="title">Titre :</label>
					<br>
					<input
						type="text"
						id="title"
						v-model.trim="$v.recipe.titre.$model"
						placeholder="Les deux soleils de Tatooine"
					/>
					<div class="error" v-if="!$v.recipe.titre.required">Titre obligatoire.</div>
				</div>

				<div class="form-group" :class="{'form-group--error': $v.recipe.description.$error }">
					<label for="description">Description :</label>
					<br>
					<input
						type="text"
						id="description"
						v-model.trim="$v.recipe.description.$model"
						placeholder="Tartine de pain avec deux oeufs..."
					/>
					<div class="error" v-if="!$v.recipe.description.required">Description obligatoire.</div>
				</div>
			</div>
			<div class="form-group up-group middle-group" :class="{'form-group--error': $v.recipe.niveau.$error }">
				<p>Niveau de difficulté :</p>
				<div class="radio-container">
					<label for="padawan"><span>Padawan</span></label>
					<input 
						type="radio" 
						name="level" 
						id="padawan" 
						v-model.trim="$v.recipe.niveau.$model" 
						value="padawan" />
				</div>
				<br>
				<div class="radio-container">
					<label for="jedi"><span>Jedi</span></label>
					<input 
						type="radio" 
						name="level" 
						id="jedi" 
						v-model.trim="$v.recipe.niveau.$model" 
						value="jedi" />
				</div>
				<br>
				<div class="radio-container">
					<label for="master"><span>Maître</span></label>
					<input 
						type="radio" 
						name="level" 
						id="master" 
						v-model.trim="$v.recipe.niveau.$model" 
						value="maitre" />
				</div>
				<div class="error" v-if="!$v.recipe.niveau.required">Niveau obligatoire.</div>
			</div>
			<div class="up-group">
				<div class="form-group" :class="{'form-group--error': $v.recipe.personnes.$error }">
					<label for="nbpers">Nombre de personnes :</label>
					<br>
					<input 
						type="number" 
						id="nbpers"
						min="0" 
						v-model.trim="$v.recipe.personnes.$model" 
						placeholder="6" />
					<div class="error" v-if="!$v.recipe.personnes.required">Nombres de personnes obligatoire.</div>
				</div>

				<div class="form-group" :class="{'form-group--error': $v.recipe.tempsPreparation.$error }">
					<label for="time">Temps de préparation (en minute):</label>
					<br>
					<input 
						type="number" 
						id="time" 
						min="0" 
						v-model.trim="$v.recipe.tempsPreparation.$model" 
						placeholder="20" />
					<div class="error" v-if="!$v.recipe.tempsPreparation.required">Temps de préparation obligatoire.</div>
				</div>
			</div>
			
		</div>

		<div class="form-below">
			<div class="form-group form-left">
				<h2>Ingrédients :</h2>
				<ul>
					<li class="ingredients-qt">
						<p>Quantité</p>
						<input v-for="(ingredient, index) in composants" :key="index" type="text" name="quantity" v-model="ingredient[0]"/>
					</li>
					<li class="ingredients-type">
						<p>Type</p>
						<select v-for="(ingredient, index) in composants" :key="index" name="" v-model="ingredient[1]" >
							<option value=""></option>
							<option value="ml">ml</option>
							<option value="cl">cl</option>
							<option value="l">l</option>
							<option value="mg">mg</option>
							<option value="g">g</option>
							<option value="kg">kg</option>
						</select>
					</li>
					<li class="ingredients-name">
						<p class="name">Nom</p>
						<input 
							v-for="(ingredient, index) in composants" 
							:key="index" 
							type="text" 
							v-model="ingredient[2]"
							placeholder="concombre"/>
					</li>
					<li class="empty" v-if="recipe.ingredients.length > 1">
						<p></p>
						<button v-for="(ingredient, index) in composants" :key="index" type="button" @click="removeIngredient(index)" >x</button>
					</li>
				</ul>
				<div class="btn-container" :class="{'form-group--error': errorIngredient }">
					<button type="button" class="btn-add" @click="addNewIngredient">Ajouter un ingrédient</button>
					<div class="error">Nom de l'ingrédient obligatoire.</div>
				</div>
			</div>

			<div class="form-group form-right">
				<h2>Étapes :</h2>
				<ul>
					<li v-for="(step, index) in recipe.etapes" :key="index">
						<div class="step-content">
							<textarea 
								type="textarea" 
								name="quantity" 
								v-model="recipe.etapes[index]" 
								rows="3"> </textarea>
							<button v-if="recipe.etapes.length > 1" type="button" @click="recipe.etapes.splice(index, 1)">x</button>
						</div>
					</li>
				</ul>
				<div class="btn-container" :class="{'form-group--error': errorStep }">
					<button type="button" class="btn-add" @click="recipe.etapes.push('')">Ajouter une étape</button>
					<div class="error">Remplir le champs étape.</div>
				</div>
			</div>
		</div>
		

		<div class="form-group photo-container">
			<label for="photo">Photo :</label>
			<input type="url" id="photo" v-model="recipe.photo" placeholder="http://" />
		</div>

		<div class="actions">
			<button type="submit" class="btn">Envoyer</button>
			<p class="typo__p" v-if="submitStatus === 'OK'">Merci pour l'ajout de la recette !</p>
			<p class="typo__p error" v-if="submitStatus === 'ERROR'">Merci de bien vouloir remplir les champs manquant.</p>
			<p class="typo__p" v-if="submitStatus === 'PENDING'">Envoie...</p>
		</div>
	</form>
</template>

<script>
import { required, minLength, minValue } from 'vuelidate/lib/validators'

export default {
	name: 'Form',
	data() {
		return {
			submitStatus: null,
			errorStep: false,
			errorIngredient: false
		}
	},
	props: {
		recipe: {
			type: Object,
			default() {
				return {
					titre: '',
					description: '',
					niveau: '',
					personnes: null,
					tempsPreparation: null,
					ingredients: [],
					etapes: [''],
					photo: ''
				}
			}
		}
	},
	validations: {
		recipe: {
			required,
			titre: {
				required,
				minLength: minLength(2)
			},
			description: {
				required,
				minLength: minLength(6)
			},
			niveau: {
				required
			},
			personnes: {
				required,
				minValue: minValue(0)
			},
			tempsPreparation: {
				required,
				minValue: minValue(0)
			}
		}
	},
	computed: {
		// formater les ingredients au format [['','','']] [['','']]
		composants() {
			const ingredients = this.recipe.ingredients
			let composants = []
			if(ingredients.length > 0) {
				for (let i = 0; i < ingredients.length; i++) {
					const element = ingredients[i];
					let composant = []
					let quantity, mesure
	
					// récupération de la quantité 

					if(element[0].match(/(\d+)/)) {
						quantity = element[0].match(/(\d+)/)[0]
					} else if(element[0].match('½')) {
						quantity = element[0].match('½')[0]
					} else {
						quantity = ''
					}
					composant.push(quantity)
	
					// récupération du type de mesure

					if(element[0].match(/[a-z]+/g)) {
						mesure = element[0].match(/[a-z]+/g)[0]
					} else {
						mesure = ''
					}
					composant.push(mesure)
	
					// type
					composant.push(element[1])

					// ajout du composant dans le tableau de composants
					composants.push(composant)
				}
			} else {
				// Valeur par defaut pour avoir un champs ingrédient automatiquement
				composants.push(['','',''])
			}
			return composants
		}
	},
	methods: {
		// ajout d'un champs ingrédient
		addNewIngredient() {
			this.composants.push(['','',''])
			this.updateIngredients()
		},
		// supression d'un champs ingrédient
		removeIngredient(index) {
			this.composants.splice(index, 1)
			this.updateIngredients()
		},
		// Ajout des composants dans le tableau des ingrédients au bon format
		updateIngredients() {
			const composants = this.composants
			let ingredients =[]
			for (let i = 0; i < composants.length; i++) {
				const element = composants[i];
				let firstComposant = element[0] + element[1]
				let secondComposant = element[2]
				ingredients.push([firstComposant, secondComposant])
			}
			this.recipe.ingredients = ingredients
		},
		// vérification de la validé des champs des ingrédients
		invalidIngredients() {
			const ingr = this.recipe.ingredients
			for (let i = 0; i < ingr.length; i++) {
				const element = ingr[i];
				if(element[1] === '' && element[1].length < 2){
					this.errorIngredient = true
					return true
				}
			}
			this.errorIngredient = false
			return false
		},
		// vérification de la validé des champs des étapes
		invalidSteps() {
			const ingr = this.recipe.etapes
			for (let i = 0; i < ingr.length; i++) {
				const element = ingr[i];
				if(element === '' && element.length < 6){
					this.errorStep = true
					return true
				}
			}
			this.errorStep = false
			return false
		},
		send() {
			// mise à jour du tableau des ingredients
			this.updateIngredients()
			// formater personnes et tempsPreparations de string à number
			if (this.recipe.personnes) {
				this.recipe.personnes = Number(this.recipe.personnes)
			}
			if (this.recipe.tempsPreparation) {
				this.recipe.tempsPreparation = Number(this.recipe.tempsPreparation)
			}
			const errorIngredients = this.invalidIngredients()
			const errorSteps = this.invalidSteps()
			this.$v.$touch()

			// Vérification de la validité au formulaire
			if (this.$v.$invalid || errorIngredients || errorSteps) {
				this.submitStatus = 'ERROR'
			} else {
				// do your submit logic here
				this.submitStatus = 'PENDING'
				setTimeout(() => {
					this.submitStatus = 'OK'
					// envoie des données
					this.$emit('send', this.recipe)
				}, 500)
			}
		}
	}		
}
</script>

<style scoped>
	.recipeform {
		width: 100%;
		display: block;
		position: relative;
		margin-bottom: 30px;
	}
	
	.recipeform button {
		background: #fff;
	}

	.form-up,
	.form-below {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		justify-content: space-between;
	}
	/* Formulaire du haut */
	.form-up .up-group {
		width: 100%;
		margin-bottom: 15px;
	}

	.form-up .up-group .form-group:first-child {
		margin-bottom: 15px;
	}

	.form-up .up-group:first-child input{
		width: 200px;
	}

	.up-group .form-group label,
	.middle-group p  {
		font-weight: bold;
		margin-bottom: 15px;
	}

	.form-up .up-group .form-group input{
		margin-top: 15px;
	}

	.middle-group label {
		font-weight: 400;
	}

	.radio-container {
		width: 100px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	/* Formuliare du bas */

	.form-below {
		margin-bottom: 30px;
	}

	.form-below .form-group {
		width: 100%;
	}

	.form-group input {
		padding: 5px 10px;
	}

	.form-group input,
	.form-group select,
	.form-group button {
		border: 1px solid #000;
	}

	/* Formulaire ingredients */

	.form-below .form-left ul {
		padding: 0;
		display: flex;
		margin-bottom: 15px;
	}

	.form-below .form-left li {
		display: block;
		padding: 0;
		list-style: none;
		justify-content: center;
	}

	.form-below .form-left li p{
		margin-bottom: 15px;
		text-align: center;
		height: 19px;
	}

	.form-left input{
		width: calc(100% - 22px);
		margin-bottom: 15px;
		height: 14px;
	}

	.ingredients-qt{
		width: 100%;
		max-width: 65px;
	}

	.form-below .form-group select {
		padding: 5px 20px 5px 10px;
		margin-bottom: 15px;
		max-width: 60px;
		width: 100%;
		height: 26px;
		border-radius: 0;
		appearance: none;
		background-image: url('../assets/down.svg'), linear-gradient(to bottom, #ffffff 0%,#fff 100%);
		background-repeat: no-repeat, repeat;
		background-position: right .7em top 50%, 0 0;
		background-size: .65em auto, 100%;
		border-left: 0px;
		border-right: 0px;
	}

	.ingredients-type{
		width: 100%;
		max-width: 60px;
	}

	.ingredients-name{
		width: 100%;
		max-width: 310px;
	}

	.empty{
		max-width: 26px;
	}

	.empty button{
		margin-bottom: 15px;
		height: 26px;
	}

	.form-below .form-left li button {
		padding: 5px 10px;
		border-left: 0;
	}

	/* Formulaire étapes */

	.form-right ul {
		padding: 0 15px ;
		margin-bottom: 30px;
	}

	.form-right ul li{
		list-style: none;
		margin-bottom: 15px;
	}

	.form-right ul li .step-content{
		display: flex;
		align-items: center;
	}

	.form-right textarea {
		width: 100%;
		max-width: 350px;
		border: 1px solid #000;
		resize: none;
		margin: 0;
		padding: 5px 10px;
	}

	.form-right ul button {
		padding: 5px;
		width: 25px;
		height: 25px;
		margin-left: 15px;
	}

	/* Boutons d'ajout d'un champs et de submit */

	.btn-container {
		width: 100%;
		text-align: center;
	}

	.btn-add, 
	.actions button {
		padding: 5px 10px;
		margin: 0 auto;
		border: 1px solid #772769;
		color: #772769;
		font-size: 1em;
	}

	.btn-add:hover, 
	.actions button:hover {
		font-weight: bold;
	}

	/* Formulaire de photo */

	.form-group.photo-container {
		width: 100%;
		text-align: center;
	}

	.form-group.photo-container label{
		font-weight: bold;
	}

	.form-group.photo-container input{
		margin-left: 15px;
		width: 200px;
	}

	.actions {
		margin: 30px 0;
		text-align: center;
	}

	/* Error */

	.error {
		font-size: 0.75rem;
		line-height: 1;
		display: none;
		margin-top: 10px;
		color: red;
		width: 100%;
	}

	.typo__p.error {
		display: block;
		color: red;
	}

	.typo__p {
		display: block;
		color: green;
	}

	.form-group--error .error {
		display: block;
	}

	.form-group--error input,
	.form-group--error textarea{
		border-color: red;
	}

	@media (min-width: 768px) {
		.form-up .up-group {
			width: calc(100% / 3);
		}

		.form-below .form-group {
			width: 50%;
		}

		.form-below .form-left ul {
			padding: 0 45px 0 15px;
			display: flex;
		}

		.form-right ul {
			padding: 34px 15px 0;
			margin-bottom: 30px;
		}
	}
</style>