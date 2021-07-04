<template>
  <div class="col s12">
    <div clas="row">
      <p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <div class="input-field col s6 offset-s3">
        <input type="email" placeholder="email" v-model="user.email">
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
      errors: [],
      allOk: false,
      user: {
        email:'',
        password:''
      },
    };
  },
  methods: {
    login(e) {
      this.errors = [];

      if (!this.user.email) {
        this.errors.push('o email é obrigatório.');
      } else if (!this.validEmail(this.user.email)) {
        this.errors.push('Utilize um e-mail válido.');
      }

      if (!this.user.password) {
        this.errors.push('a senha é obrigatória.');
      }
      
      if (!this.errors.length) {
        this.allOk = true;
      }

      e.preventDefault();

      if (this.allOk) {
          this.$http.post(this.$urlAPI + `login`, {
          email: this.user.email,
          password: this.user.password
        })
        .then(res => {
          if (res.data.access_token) {
            this.$store.commit('setUser', res.data)
            sessionStorage.setItem('user', JSON.stringify(res.data));
            this.$router.push('/', () => {});
          }
        })
        .catch(e => {
          this.errors.push("Login não autorizado.");
        })
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>