<template>
  <div id="app">
    <header>
      <nav-bar-vue />
    </header>
    
    <main>
      <div class="container">
        <div class="row">
          <grid-vue>
            <slot />
          </grid-vue>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavBarVue from '@/components/layouts/NavBarVue'
import GridVue from '@/components/layouts/GridVue'

export default {
  name: 'HomeTemplate',
  components: {
    NavBarVue,
    GridVue
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
