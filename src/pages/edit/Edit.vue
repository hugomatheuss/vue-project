<template>
  <div class="col s12">
    <div class="row">
      <div class="input-field col s6 offset-s3">
        <input type="text" placeholder="email" v-model="product.title" />
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="password" placeholder="senha" v-model="product.type" />
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="password" placeholder="senha" v-model="product.rating" />
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="password" placeholder="senha" v-model="product.price" />
      </div>
      <div class="input-field col s6 offset-s3">
        <button class="btn" v-on:click="edit">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "EditVue",
  data() {
    return {
      product: {
        title: '',
        type: '',
        rating: '',
        price: ''
      },
    };
  },
  methods: {
    edit() {
      this.$http.put(this.$urlAPI + `products`, {
        title: this.title,
        type: this.type,
        rating: this.rating,
        price: this.price
      }, {
        "headers": {"Authorization": "Bearer " + this.$store.getters.getToken}
      })
      .then(res => {
        this.$store.commit('setUser', res.data);
        sessionStorage.setItem('user', JSON.stringify(res.data));
      })
      .catch(e => {
        console.log(e);
      })
    }
  }
}
</script>
