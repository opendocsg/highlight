<template>
  <div id="app">
    <AppHeader/>
    <AppBody/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppBody from './components/AppBody'

export default {
  name: 'app',
  components: {
    AppHeader,
    AppBody
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
