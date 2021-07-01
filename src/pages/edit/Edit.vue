<template>
  <div class="col s12">
    <div class="row">
      <div class="input-field col s6 offset-s3">
        <input type="text" placeholder="title" v-model="product.title" />
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="text" placeholder="type" v-model="product.type" />
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="text" placeholder="type" v-model="product.description" />
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="text" placeholder="type" v-model="product.height" />
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="text" placeholder="type" v-model="product.width" />
      </div>
      <div class="input-field col s6 offset-s3">
        <money v-model="product.price"></money>
      </div>
      <div class="input-field col s6 offset-s3">
        <input type="number" placeholder="rating" v-model="product.rating" />
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
      title: '',
      type: '',
      rating: '',
      price: '',
      description: '',
      heigth: '',
      width: ''
    };
  },
  created () {
    let u = this.$store.getters.getUser;
    if (u) {
      this.$http.get(this.$urlAPI + `products/` + this.$route.params.id, {
        "headers": {"Authorization": "Bearer " + this.$store.getters.getToken},
      })
      .then(res => {
        if (res.data.message != 'Expired token') {
          this.$store.commit('setProduct', res.data.data);
        } else {
          this.$router.push('/login', () => {});
        }
      })
      .catch(e => {
        console.log(e);
      })
    } else {
      this.$router.push('/login', () => {});
    }
  },
  methods: {
    edit() {
      this.$http.put(this.$urlAPI + `products/` + this.$route.params.id, {
        title: this.product.title,
        type: this.product.type,
        rating: this.product.rating,
        price: this.product.price,
        description: this.product.description,
        heigth: this.product.heigth,
        width: this.product.width
      }, {
        headers: {
            'Authorization': "Bearer " + this.$store.getters.getToken
          }
      })
      .then(res => {
        this.$store.commit('setUser', res.data.data);
        this.$router.push('/', () => {});
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  computed: {
    product() {
      return this.$store.getters.getProduct[0];
    }
  }
}
</script>
