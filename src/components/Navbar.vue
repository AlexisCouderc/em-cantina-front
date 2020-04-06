<template>
	<nav class="navbar">
		<div class="nav-content">
			<a href="/" class="logo-link"><img class="logo" src="../assets/logo.svg" alt=""></a>
			<ul>
				<li>
					<router-link class="nav-link" to="/">Recettes</router-link>
				</li>
				<li>
					<router-link class="nav-link" to="/ajouter">Ajouter une recette</router-link>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar'
}
</script>

<style scoped>
	.navbar {
		position: fixed;
		top: 0;
		width: 100%;
		height: 70px;
		background: #772769;
		z-index: 3;
	}

	.logo, .logo-link {
		height: 50px;
	}

	.nav-content {
		position: relative;
		display: flex;
		max-width: 768px;
		height: 70px;
		margin: 0 auto;
		justify-content: space-evenly;
		align-items: center;
		padding-left: 10px;
	}

	.nav-content ul {
		position: relative;
		display: flex;
		text-decoration: none;
		padding: 0;
		margin: 0;
		height: 100%;
	}

	.nav-content ul li {
		position: relative;
		display: flex;
		height: 100%;
		font-size: 12px;
	}

	.nav-link {
		position: relative;
		line-height: 1em;
		text-decoration: none;
		color: #FCFAF1;
		font-size: 1em;
		font-weight: bold;
		text-transform: uppercase;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 10px;
	}

	@media (min-width: 580px) {
		.nav-content ul li {
			font-size: 14px;
		}

		.nav-content ul li:first-child {
			margin-right: 40px;
		}

		.nav-link::before {
			content: "";
			width: 0;
			height: 5px;
			left: 0;
			top: 0;
			position: absolute;
			transition: all 0.3s linear;
			background: #772769;
		}

		.nav-link:hover::before {
			width: 100%;
			left: 0;
		}
	}
</style>