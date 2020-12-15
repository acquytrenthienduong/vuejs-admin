<template>
  <div class="login1">
    <div id="app">
      <v-app>
        <div class="titleText">
          <h2>Welcome To Navatan Portal</h2>
        </div>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
          min-width="360px"
        >
          <div>
            <v-tabs
              v-model="tab"
              show-arrows
              background-color="deep-purple accent-4"
              icons-and-text
              dark
              grow
            >
              <v-tabs-slider color="purple darken-4"></v-tabs-slider>
              <v-tab v-for="i in tabs" :key="i.key">
                <v-icon large>{{ i.icon }}</v-icon>
                <div class="caption py-1">{{ i.name }}</div>
              </v-tab>
              <v-tab-item>
                <v-card class="px-4">
                  <v-card-text>
                    <v-form ref="loginForm" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="username"
                            :rules="[rules.required, rules.min]"
                            label="Username"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="password"
                            :append-icon="show1 ? 'eye' : 'eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            hint="At least 8 characters"
                            counter
                            @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                          <div class="logoLogin">Studio</div>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col
                          class="d-flex"
                          cols="12"
                          sm="3"
                          xsm="12"
                          align-end
                        >
                          <v-btn
                            x-large
                            block
                            :disabled="!valid"
                            color="success"
                            @click="loginForReceptionist"
                          >
                            Login
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card class="px-4">
                  <v-card-text>
                    <v-form ref="loginForm" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="username"
                            :rules="[rules.required, rules.min]"
                            label="Username"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="password"
                            :append-icon="show1 ? 'eye' : 'eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            hint="At least 8 characters"
                            counter
                            @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col
                          class="d-flex"
                          cols="12"
                          sm="3"
                          xsm="12"
                          align-end
                        >
                          <v-btn
                            x-large
                            block
                            :disabled="!valid"
                            color="success"
                            @click="loginForManager"
                          >
                            Login
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card class="px-4">
                  <v-card-text>
                    <v-form ref="loginForm" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="username"
                            :rules="[rules.required, rules.min]"
                            label="Username"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="password"
                            :append-icon="show1 ? 'eye' : 'eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            hint="At least 8 characters"
                            counter
                            @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col
                          class="d-flex"
                          cols="12"
                          sm="3"
                          xsm="12"
                          align-end
                        >
                          <v-btn
                            x-large
                            block
                            :disabled="!valid"
                            color="success"
                            @click="loginForAdmin"
                          >
                            Login
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-dialog>
      </v-app>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import config from "../../config/config.js";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
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

      dialog: true,
      tab: 0,
      tabs: [
        { name: "Receptionist", icon: "mdi-account", key: 1 },
        { name: "Manager", icon: "mdi-account-tie", key: 2 },
        { name: "Administrator", icon: "mdi-shield-account", key: 3 },
      ],
      valid: true,

      firstName: "",
      lastName: "",
      email: "",
      verify: "",
      loginPassword: "",
      loginEmail: "",
      loginEmailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      emailRules: [
        (v) => !!v || "Required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],

      show1: false,
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
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Sai tài khoản hoặc mật khẩu!",
          });
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
            this.$router.push("/schedule");
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Sai tài khoản hoặc mật khẩu!",
          });
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
            this.$router.push("/account");
          }
        })
        .catch((e) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Sai tài khoản hoặc mật khẩu!",
          });
          this.errors.push(e);
        });
    },

    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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

.logoLogin {
  background-image: url("~@/assets/img/header-logo.png");
  background-size: contain;
  background-position: center center;
  width: 50%;
  height: 129%;
  font-family: fantasy;
}

.titleText {
  animation: titleText 0.9s both;
  padding: 1%;
  margin-left: 6%;
}

/* ----------------------------------------------
 * Generated by Animista on 2020-12-15 14:11:32
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation bounce-top
 * ----------------------------------------
 */
@-webkit-keyframes titleText {
  0% {
    -webkit-transform: translateY(-45px);
    transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-24px);
    transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
}
@keyframes titleText {
  0% {
    -webkit-transform: translateY(-45px);
    transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 1;
  }
  24% {
    opacity: 1;
  }
  40% {
    -webkit-transform: translateY(-24px);
    transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  65% {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  82% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  93% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  100% {
    -webkit-transform: translateY(0px);
    transform: translateY(0px);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1;
  }
}

.login1 {
  background-image: url("~@/assets/img/cover.jpg");
  background-size: cover;
  background-position: center center;
}

.v-window-item {
  background-color: beige !important;
}

.theme--light {
  background: none !important;
}
.v-slide-group__wrapper {
  background-color: #617ae8 !important;
}
</style>
