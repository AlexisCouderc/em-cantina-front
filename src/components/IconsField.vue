<template>
	<div class="icons-content">
		<div class="icons-details">
			<img src="../assets/lightsaber.svg" alt=""><p>{{ upperCaseLevel }}</p>
		</div>
		<div class="icons-details">
			<img src="../assets/darth-vader.svg" alt=""><p>{{ people }}</p>
		</div>
		<div class="icons-details">
			<img src="../assets/clock.svg" alt=""><p>{{ minToHour }}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'IconsFields',
	props:{
		niveau: String,
		tempsPreparation: Number,
		personnes: Number

	},
	computed: {
		// Ajout d'une majuscule au début du niveau
		upperCaseLevel() {
			return this.niveau.charAt(0).toUpperCase() + this.niveau.substring(1)
		},
		// Formater les minutes en heure/minute
		minToHour() {
			let temps = this.tempsPreparation
			if (temps >= 60) {
				let hours = temps /60
				let rhours = Math.floor(hours)
				let min = Math.round((hours - rhours) * 60)
				return rhours + 'h' + min + 'min'
			}
			return temps + 'min'
		},
		// Gestion du plurieurs du champs personne
		people() {
			const person = this.personnes
			if (person > 1) {
				return person + ' personnes'
			}
			return person + ' personne'
		}
	}
}
</script>