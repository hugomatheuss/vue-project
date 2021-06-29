<template>
  <div class="row">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-content">
          <div>
            <label>Title:</label>
            <p>{{ product[0].title }}</p>
          </div>
          <div>
            <label>Type: </label>
            <p>{{ product[0].type }}</p>
          </div>
          <div>
            <label>Rating:</label>
            <p>{{ product[0].rating }}</p>
          </div>
          <div>
            <label>Price</label>
            <p>{{ product[0].price }}</p>
          </div>
          <div>
            <label>Created</label>
            <p>{{ product[0].created_at }}</p>
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
        console.log(res);
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
      return this.$store.getters.getProduct;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
