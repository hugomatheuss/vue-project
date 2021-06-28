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
    let u = this.$store.getters.getUser;
    if (u) {
      this.user = u;
      this.$router.push('/', () => {});
    } else {
      this.$router.push('/login', () => {});
    }
  },
  methods:{
    logout() {
      this.$store.commit('setUser', null);
      sessionStorage.clear();
      this.user = false;
      this.$router.push('/login', () => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
