<template>
  <div class="col s12">
    <div class="row">
      <form action="#">
        <div class="file-field input-field">
          <div class="btn">
            <span>Enviar</span>
            <input type="file" ref="file" v-on:change="jsonUpload" multiple>
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" placeholder="Anexar arquivo .json">
          </div>
        </div>
      </form>
    </div>

    <div class="row">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in productsList" :key="item.id">
            <td>{{ item.title }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.rating }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.created_at }}</td>
            <td>
              <a href="#">Show</a>
              <router-link to="/edit">Edit</router-link>
              <a href="#">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: "GridVue",  
  props:[],
  data() {
    return {
      jsonFile: '',
      products:[]
    };
  },
  created() {
    let u = this.$store.getters.getUser;
    if (u) {
      this.$http.get(this.$urlAPI + `products`, {
        "headers": {"Authorization": "Bearer " + this.$store.getters.getToken}
      })
      .then(res => {
        //this.products = res.data.data;
        this.$store.commit('setProducts', res.data.data);
      })
      .catch(e => {
        console.log(e);
      })
    }
  },
  methods: {
    jsonUpload(e) {
      //this.jsonFile = e.target.files[0] || e.dataTransfer.files[0];
      this.jsonFile = this.$refs.file.files[0];
      let formData = new FormData();

      formData.append("jsonFile", this.jsonFile);
      console.log(this.jsonFile);

      this.$http.post(this.$urlAPI + `jsonUpload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log('SUCCESS!!');
      })
      .catch(e => {
        console.log(e);
      });
    }
  },
  computed: {
    productsList() {
      return this.$store.getters.getProducts;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>