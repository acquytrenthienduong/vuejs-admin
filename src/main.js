import Vue from "vue";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import vuetify from '@/plugins/vuetify'
import VueRouter from "vue-router";
import App from "./App";
import excel from 'vue-excel-export'

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import 'bootstrap/dist/css/bootstrap.min.css'
// import '@/assets/css/main.css'
// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(Buefy);
Vue.use(excel);


/* eslint-disable no-new */
new Vue({
  vuetify,
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});
