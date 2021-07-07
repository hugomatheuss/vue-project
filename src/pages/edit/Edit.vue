<template>
  <div class="col s12">
    <div class="row">
      <div class="col s6 offset-s3">
        <p v-if="errors.length">
          <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
      </div>

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
        <input type="text" placeholder="description" v-model="product.description" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Filename</label>
        <input type="text" placeholder="filename" v-model="product.filename" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Height</label>
        <input type="text" placeholder="height" v-model="product.height" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Width</label>
        <input type="text" placeholder="width" v-model="product.width" />
      </div>
      <div class="input-field col s6 offset-s3">
        <label class="active">Price</label>
        <input v-model="product.price"></input>
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
      errors: [],
      allOk: false,
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
    edit(e) {
      this.errors = [];

      !this.product.title == true ? this.errors.push('o título é obrigatório.') : "";
      !this.product.type == true ? this.errors.push('o tipo é obrigatório.') : "";
      !this.product.description == true ? this.errors.push('a descrição é obrigatória.') : "";
      !this.product.filename == true ? this.errors.push('o nome do arquivo é obrigatório.') : "";
      !this.product.height == true ? this.errors.push('a altura é obrigatória.') : "";
      !this.product.width == true ? this.errors.push('a largura é obrigatória.') : "";
      !this.product.price == true ? this.errors.push('o preço é obrigatório.') : "";
      !this.product.rating == true ? this.errors.push('a avaliação é obrigatória.') : "";

      if (!this.errors.length) {
        this.allOk = true;
      }

      e.preventDefault();
      
      if (this.allOk) {
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
          this.$store.commit('setProduct', res.data.data);
          this.$router.push('/', () => {});
        })
        .catch(e => {
          console.log(e);
        })
      }
    }
  },
  computed: {
    product() {
      return this.$store.getters.getProduct[this.$store.getters.getProduct.length - 1];
    }
  }
}
</script>
