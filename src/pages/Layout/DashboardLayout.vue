<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar
      v-if="role == 'receptionist'"
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

      <sidebar-link to="/typography">
        <md-icon>pending</md-icon>
        <p>Pending Request</p>
      </sidebar-link>
    </side-bar>

    <side-bar
      v-if="role == 'admin'"
      :sidebar-item-color="sidebarBackground"
      :sidebar-background-image="sidebarBackgroundImage"
    >
      <mobile-menu slot="content"></mobile-menu>
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
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

      <sidebar-link to="/lichlamviec">
        <md-icon>facebook</md-icon>
        <p>lichlamviec</p>
      </sidebar-link>

      <sidebar-link to="/products">
        <md-icon>extension</md-icon>
        <p>Products</p>
      </sidebar-link>

      <sidebar-link to="/schedule">
        <md-icon>schedule</md-icon>
        <p>Schedule</p>
      </sidebar-link>
      <sidebar-link to="/typography">
        <md-icon>pending</md-icon>
        <p>Pending Request</p>
      </sidebar-link>
      <sidebar-link to="/account">
        <md-icon>account_circle</md-icon>
        <p>Account</p>
      </sidebar-link>
      <sidebar-link to="/report">
        <md-icon>get_app</md-icon>
        <p>Export report</p>
      </sidebar-link>
      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Maps</p>
      </sidebar-link>
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
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
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";
import FixedPlugin from "./Extra/FixedPlugin.vue";

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
    };
  },
};
</script>
