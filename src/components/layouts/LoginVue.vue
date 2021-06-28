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
import axios from 'axios';

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
      axios.post(`http://127.0.0.1:8000/api/login`, {
        email: this.user.email,
        password: this.user.password
      })
      .then(res => {
        if (res.data.access_token) {
          console.log(res.data.status);
          console.log("logged in");
          sessionStorage.setItem('user', JSON.stringify(res.data));
          this.$router.push('/');
        } else {
          console.log(res);
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