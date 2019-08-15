<template>
  <div id="app" class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between fixed-top">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/upload">Upload</router-link>
          <router-link class="nav-item nav-link" to="/about">About</router-link>
        </div>
        <a class="navbar-brand" href="#"><i>Highlight</i></a>
        <span class="navbar-text">
           Last modified
        </span>
      </nav>
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
}

</script>

<style>
#app {
  font-family: 'Montserrat', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#main {
  margin-top: 4em;
}

.nav-item.nav-link.router-link-active {
  color:black;
}

p {
  font-size: 1.25em;
  text-align: left;
}

</style>
