<template>
  <div class="col s12">
    <div clas="row">
      <div class="input-field col s6 offset-s3">
        <input type="text" placeholder="email" v-model="user.email">
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="password" placeholder="senha" v-model="user.password">
      </div>
      <div class="input-field col s6 offset-s3">
        <button class="btn" v-on:click="login">Entrar</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginVue",  
  props:[],
  data() {
    return {
      user: {
        email:'',
        password:''
      },
    };
  },
  methods: {
    login() {
      this.$http.post(this.$urlAPI + `login`, {
        email: this.user.email,
        password: this.user.password
      })
      .then(res => {
        if (res.data.access_token) {
          this.$store.commit('setUser', res.data)
          sessionStorage.setItem('user', JSON.stringify(res.data));
          this.$router.push('/', () => {});
        } else {
          console.log('Errors');
          let errors = '';
          for(let error of Object.values(res.data)) {
            errors += error + " ";
          }
          alert(errors);
        }
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>