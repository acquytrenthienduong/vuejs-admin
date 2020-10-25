<template>
  <div class="vue-tempalte">
    <form>
      <h3>Sign In</h3>

      <div class="form-group">
        <label>Username</label>
        {{ username }}
        <input
          v-model="username"
          type="text"
          class="form-control form-control-lg"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        {{ password }}
        <input
          v-model="password"
          type="password"
          class="form-control form-control-lg"
        />
      </div>
    </form>
    <button v-on:click="login" class="btn btn-dark btn-lg btn-block">
      Sign In
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      postBody: "",
      errors: [],
      username: "",
      password: ""
    };
  },

  methods: {
    login: function() {
      axios
        .post("http://localhost:8000/login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem("username", response.data.username);

            this.$router.push("/dashboard");
            // window.location.reload();
            // window.location.href = 'http://localhost:8080/home'
          }
        })
        .catch(e => {
          alert("SAI TAI KHOAN HOAC MAT KHAU");
          this.errors.push(e);
        });
    }
  }
};
</script>