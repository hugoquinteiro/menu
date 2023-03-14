<template>
  <div id="app">
    <Header title="Menu - Personalizado"
    :hideToggle="false"
    />
    <Content />
    <Footer></Footer>
    <!-- <h1>Cardápio Online</h1> -->
    <!-- <router-view /> -->
  </div>
  <!-- <footer><a href="#" to="/controle">Ir para o controle</a></footer> -->
</template>

<script>
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
export default {
  components: { Header, Content, Footer }
}
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}

	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}

	

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

/* body {
    background-color: #E5E7E9;
  } */
</style>
