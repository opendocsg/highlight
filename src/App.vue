<template>
  <div id="app">
    <NavBar/>
    <div id="app-body">
      <HighlightPage/>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import HighlightPage from './components/HighlightPage'

export default {
  name: 'app',
  components: {
    NavBar,
    HighlightPage
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
  display:flex;
  flex-direction: column;
}
</style>
