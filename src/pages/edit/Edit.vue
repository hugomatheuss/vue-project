<template>
  <div class="col s12">
    <div class="row">
      <div class="input-field col s6 offset-s3">
        <label class="active">Title</label>
        <input type="text" placeholder="title" v-model="product.title" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Type</label>
        <input type="text" id="type" placeholder="type" v-model="product.type" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Description</label>
        <input type="text" placeholder="type" v-model="product.description" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Filename</label>
        <input type="text" placeholder="type" v-model="product.filename" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Height</label>
        <input type="text" placeholder="type" v-model="product.height" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Width</label>
        <input type="text" placeholder="type" v-model="product.width" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Price</label>
        <money v-model="product.price"></money>
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Rating</label>
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
      filename: '',
      description: '',
      price: '',
      height: '',
      width: '',
      rating: ''
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
        filename: this.product.filename,
        description: this.product.description,
        price: this.product.price,
        height: this.product.height,
        width: this.product.width,
        rating: this.product.rating
      }, {
        headers: {
            'Authorization': "Bearer " + this.$store.getters.getToken
          }
      })
      .then(res => {
        console.log(res.data.data)
        this.$store.commit('setProduct', res.data.data);
        this.$router.push('/', () => {});
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  computed: {
    product() {
      console.log(this.$store.getters.getProduct)
      return this.$store.getters.getProduct[0];
    }
  }
}
</script>
