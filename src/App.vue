<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Inicio/>
    <hr>
    <!-- <Teste/> -->
  </div>
</template>

<script>
import Inicio from './components/Inicio.vue'
import Teste from './components/Teste.vue'

export default {
  name: 'App',
  components: {
    Inicio: Inicio,
    Teste
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
