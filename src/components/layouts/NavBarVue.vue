<template>
  <div>
    <nav>
      <div class="nav-wrapper container">
        <a href="#" class="brand-logo">Home</a>
        <ul class="right hide-on-med-and-down">
          <li v-if="user"><a v-on:click="logout()">Sair</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarVue",  
  data() {
    return {
      user: false
    };
  },
  created () {
    let u = sessionStorage.getItem('user');
    if (u) {
      this.user = JSON.parse(u);
      console.log(u);
    }
  },
  methods:{
    logout() {
      sessionStorage.clear();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
