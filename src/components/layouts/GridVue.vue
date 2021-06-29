<template>
  <div class="col s12">
    <div class="row">
      <div class="file-field input-field">
          <input type="file" ref="file" @change="handleFileUpload" multiple>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" placeholder="Anexar arquivo .json">
          </div>
      </div>
      <div>
        <button class="btn" @click="submitFile">
            <span>Send</span>
        </button>
      </div>
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
              <router-link :to="{ name: 'Show', params: { id: item.id } }">Show</router-link>
              <router-link :to="{ name: 'Edit', params: { id: item.id } }">Edit</router-link>
              <button v-on:click="deleteProduct(item.id)">Delete</button>
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
      products:[],
    };
  },
  created() {
    let u = this.$store.getters.getUser;
    if (u) {
      this.$http.get(this.$urlAPI + `products/`, {
        "headers": {"Authorization": "Bearer " + this.$store.getters.getToken}
      })
      .then(res => {
        this.$store.commit('setProducts', res.data.data);
      })
      .catch(e => {
        console.log(e);
      })
    } 
  },
  methods: {
    deleteProduct(id) {
      this.$http.delete(this.$urlAPI + `products/` + id, {
        "headers": {"Authorization": "Bearer " + this.$store.getters.getToken}
      })
      .then(res => {
        this.$store.commit('deleteProduct', id);
      })
      .catch(e => {
        console.log(e);
      })
    },

    submitFile() {
      let formData = new FormData();
      formData.append("jsonFile", this.jsonFile);
      this.$http.post(this.$urlAPI + `jsonUpload`, formData, {
        headers: {
              'Content-Type': "multipart/form-data",
              'Authorization': "Bearer " + this.$store.getters.getToken
            },
      })
      .then(res => {
        console.log(res.data);
        this.$store.commit('setProducts', res.data);
      })
      .catch(e => {
        console.log(e);
      });
    },
    handleFileUpload() {
      this.jsonFile = this.$refs.file.files[0];
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