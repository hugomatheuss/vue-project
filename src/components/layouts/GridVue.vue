<template>
  <div class="col s12">
    <div class="row">
      <p v-if="errors.length">
        <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
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
      errors: [],
      allOk: false,
      jsonFile: '',
      products:[],
    };
  },
  created() {
    let u = this.$store.getters.getUser;
    if (u) {
      this.$http.get(this.$urlAPI + `products`, {
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "auth",
            "Access-Control-Allow-Methods": "get, post, options, put, patch, delete",
            "Authorization": "Bearer " + this.$store.getters.getToken
          }
      })
      .then(res => {
        if (res.data.message != 'Expired token') {
          this.$store.commit('setProducts', res.data.data);
        } else {
          this.$store.commit('setUser', null);
          sessionStorage.clear();
          this.user = false;
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

    submitFile(e) {
      this.errors = [];
      let formData = new FormData();

      if (!this.jsonFile) {
        this.errors.push('arquivo json é obrigatório.');
      } else if (this.jsonFile['type'] != 'application/json') {
        this.errors.push('algum problema com o arquivo.');
      }

      if (!this.errors.length) {
        this.allOk = true;
      }

      e.preventDefault();
      
      if (this.allOk) {
          formData.append("jsonFile", this.jsonFile);

          this.$http.post(this.$urlAPI + `jsonUpload`, formData, {
          headers: {
                'Content-Type': "multipart/form-data",
                'Authorization': "Bearer " + this.$store.getters.getToken
              },
        })
        .then(res => {
          console.log(res);
          this.$store.commit('setProducts', res.data);
          location.reload();
        })
        .catch(e => {
          console.log(e);
        });
      }
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