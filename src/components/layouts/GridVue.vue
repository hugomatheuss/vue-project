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
          <tr>
            <td>Baking cake</td>
            <td>dairy</td>
            <td>4</td>
            <td>R$ 600</td>
            <td>02/01/2020</td>
            <td>
              <a href="#">Edit</a>
              <a href="#">Delete</a>
            </td>
          </tr>
          <tr>
            <td>Raw legums</td>
            <td>vegetable</td>
            <td>3</td>
            <td>R$ 700</td>
            <td>29/12/2019</td>
            <td>
              <a href="#">Edit</a>
              <a href="#">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "GridVue",  
  props:[],
  data() {
    return {
      jsonFile: ''
    };
  },
  methods: {
    async jsonUpload(e) {
      //this.jsonFile = e.target.files[0] || e.dataTransfer.files[0];
      this.jsonFile = this.$refs.file.files[0];
      let formData = new FormData();

      formData.append("jsonFile", this.jsonFile);
      console.log(this.jsonFile);

      axios.post(`http://127.0.0.1:8000/api/jsonUpload`, formData, {
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>