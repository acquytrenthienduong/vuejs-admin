<template>
  <div>
    <template>
      <v-card>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>Login Navatan</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Receptionist
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Manager
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Administrator
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="username"
                  :counter="10"
                  label="Username"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 6 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>

                <v-btn class="mr-4" @click="loginForReceptionist">
                  Login
                </v-btn>
              </v-form>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="username"
                  :counter="10"
                  label="Username"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 6 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>

                <v-btn class="mr-4" @click="loginForManager">
                  LoginManager
                </v-btn>
              </v-form>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-form ref="form" lazy-validation>
                <v-text-field
                  v-model="username"
                  :counter="10"
                  label="Username"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  hint="At least 6 characters"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>

                <v-btn class="mr-4" @click="loginForAdmin">
                  LoginAdmin
                </v-btn>
              </v-form>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import config from "../../config/config.js";
export default {
  data() {
    return {
      postBody: "",
      errors: [],
      username: "",
      password: "",
      show1: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 3 || "Min 3 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      host: config.config.host,
    };
  },

  methods: {
    loginForManager: function() {
      axios
        .post(this.host + "/loginManager", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("username", response.data.account);
            localStorage.setItem("role", response.data.role);
            this.$router.push("/dashboard");
          }
        })
        .catch((e) => {
          alert("SAI TAI KHOAN HOAC MAT KHAU");
          this.errors.push(e);
        });
    },
    loginForReceptionist: function() {
      axios
        .post(this.host + "/loginReceptionist", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            localStorage.setItem("username", response.data.account);
            localStorage.setItem("role", response.data.role);

            console.log("username", localStorage.getItem("username"));
            console.log("role", localStorage.getItem("role"));
            this.$router.push("/dashboard");
          }
        })
        .catch((e) => {
          alert("SAI TAI KHOAN HOAC MAT KHAU");
          this.errors.push(e);
        });
    },
    loginForAdmin: function() {
      axios
        .post(this.host + "/loginAdmin", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("role", response.data.role);

            console.log("username", localStorage.getItem("username"));
            console.log("role", localStorage.getItem("role"));
            this.$router.push("/dashboard");
          }
        })
        .catch((e) => {
          alert("SAI TAI KHOAN HOAC MAT KHAU");
          this.errors.push(e);
        });
    },
  },
};
</script>

<style>
/* .container {
  height: 100%%;
  display: flex;
  align-items: center;
  justify-content: center;
} */
</style>
