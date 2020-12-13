<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      v-if="role == 'receptionist'"
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>

      <sidebar-link to="/schedule">
        <md-icon>schedule</md-icon>
        <p>Schedule</p>
      </sidebar-link>

      <sidebar-link to="/pendingRequest">
        <md-icon>pending</md-icon>
        <p>Pending Request</p>
      </sidebar-link>

      <sidebar-link to="/customerDetails">
        <md-icon>search</md-icon>
        <p>Search customer</p>
      </sidebar-link>
    </side-bar>

    <side-bar
      v-if="role == 'admin'"
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/account">
        <md-icon>account_circle</md-icon>
        <p>Account</p>
      </sidebar-link>
    </side-bar>

    <side-bar
      v-if="role == 'manager'"
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
      <sidebar-link to="/schedule">
        <md-icon>schedule</md-icon>
        <p>Schedule</p>
      </sidebar-link>
      <sidebar-link to="/pendingRequest">
        <md-icon>pending</md-icon>
        <p>Pending Request</p>

        <p v-if="numberOfPending != 0" class="count-noti">
          {{ numberOfPending }}
        </p>
      </sidebar-link>
      <sidebar-link to="/report">
        <md-icon>get_app</md-icon>
        <p>Report</p>
      </sidebar-link>
      <sidebar-link to="/customerDetails">
        <md-icon>search</md-icon>
        <p>Search customer</p>
      </sidebar-link>
      <sidebar-link to="/activity">
        <md-icon>history</md-icon>
        <p>Activity</p>
      </sidebar-link>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <fixed-plugin
        :color.sync="sidebarBackground"
        :image.sync="sidebarBackgroundImage"
      >
      </fixed-plugin>

      <dashboard-content> </dashboard-content>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";
import axios from "axios";
import config from "../../config/config";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu,
    FixedPlugin,
  },
  data() {
    return {
      sidebarBackground: "green",
      sidebarBackgroundImage: require("@/assets/img/sidebar-2.jpg"),
      role: localStorage.getItem("role"),
      numberOfPending: 0,
      host: config.config.host,
    };
  },

  methods: {
    loadAllPendingRequests() {
      axios.get(this.host + "/getAllReservationNotAccess").then((response) => {
        this.numberOfPending = response.data.length;
      });
    },
  },

  mounted() {
    this.loadAllPendingRequests();
    setInterval(() => {
      this.loadAllPendingRequests();
    }, 5000);
  },
};
</script>

<style scoped>
.count-noti {
  margin-left: 25px !important;
  border-radius: 50%;
  background-color: red;
  /* padding: 7px; */
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bold;
}
</style>
