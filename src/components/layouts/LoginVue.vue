<template>
  <div class="col s12">
    <div clas="row">
      <div class="input-field col s6 offset-s3">
        <input type="text" placeholder="login" v-model="user.login">
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="text" placeholder="senha" v-model="user.password">
      </div>
      <div class="input-field col s6 offset-s3">
        <button class="btn" v-on:click="login">Entrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginVue",  
  props:[],
  data() {
    return {
      user: {
        login:'',
        password:''
      },
    };
  },
  methods: {
    login() {
      axios.post(`http://127.0.0.1:8001/api/login`, {
        login: this.user.login,
        password: this.user.password
      })
      .then(res => {
        if (res.data.token) {
          console.log("logged in");
          sessionStorage.setItem('user', JSON.stringify(res.data));
          this.$router.push('/');
        } else if (res.data.status == false) {
          console.log('login not found');
          alert('Login not found');
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