<template>
  <div class="col s12">
    <div clas="row">
      <form action="#">
        <div class="input-field col s6 offset-s3">
          <input type="text" placeholder="login" value="">
        </div>
        <div class="input-field col s6 offset-s3">
          <input type="text" placeholder="senha" value="">
        </div>
        <div class="input-field col s6 offset-s3">
          <button class="btn">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginVue",  
  props:[],
  data() {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>