<template>
  <div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-content">
          <div>
            <label>Title:</label>
            <p>{{ product.title }}</p>
          </div>
          <div>
            <label>Type: </label>
            <p>{{ product.type }}</p>
          </div>
          <div>
            <label>Description: </label>
            <p>{{ product.description }}</p>
          </div>
          <div>
            <label>Filename: </label>
            <p>{{ product.filename }}</p>
          </div>
          <div>
            <label>Height: </label>
            <p>{{ product.height }}</p>
          </div>
          <div>
            <label>Width: </label>
            <p>{{ product.width }}</p>
          </div>
          <div>
            <label>Price</label>
            <p>{{ product.price }}</p>
          </div>
          <div>
            <label>Rating:</label>
            <p>{{ product.rating }}</p>
          </div>
          <div>
            <label>Created</label>
            <p>{{ product.created_at }}</p>
          </div>
          <div>
            <label>Updated</label>
            <p>{{ product.updated_at }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ShowVue",
  data() {
    return {
      user: false,
    };
  },
  created () {
    let u = this.$store.getters.getUser;
    if (u) {
      this.$http.get(this.$urlAPI + `products/` + this.$route.params.id, {
        "headers": {
            'Authorization': "Bearer " + this.$store.getters.getToken
          },
      })
      .then(res => {
        console.log(res.data.data);
        this.$store.commit('setProduct', res.data.data);
      })
      .catch(e => {
        console.log(e);
      })
    } else {
      this.$router.push('/login', () => {});
    }
  },
  computed: {
    product() {
      return this.$store.getters.getProduct[0];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
