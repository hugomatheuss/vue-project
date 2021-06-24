<template>
  <div id="app">
    <header>
      <nav-bar-vue />
    </header>
    
    <main>
      <div class="container">
        <div class="row">
          <login-vue>
            <slot />
          </login-vue>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NavBarVue from '@/components/layouts/NavBarVue'
import GridVue from '@/components/layouts/GridVue'
import LoginVue from '@/components/layouts/LoginVue'

export default {
  name: 'LoginTemplate',
  components: {
    NavBarVue,
    GridVue,
    LoginVue
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
