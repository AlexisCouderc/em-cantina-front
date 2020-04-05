<template>
  <div id="app">
	<Navbar />
	<router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		background: #FCFAF1;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		margin-top: 70px;
		font-size: 14px;
	}
	
	.site_content {
		position: relative;
		display: block;
		max-width: 994px;
		padding: 15px 15px 0;
		margin: 0 auto;
	}

	h1 {
		margin: 0 0 15px;
		padding: 0;
	}

	button,
	input,
	select,
	p, 
	textarea,
	label {
		margin: 0;
		padding: 0;
	}

	button:active, 
	button:focus, 
	input:active, 
	input:focus, 
	select:active, 
	select:focus,
	textarea:active, 
	textarea:focus {
		box-shadow: none;
		outline: none;
	}
</style>
