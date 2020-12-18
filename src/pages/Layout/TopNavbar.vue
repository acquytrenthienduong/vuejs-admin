<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <div v-if="role == 'manager' || role == 'receptionist'">
              <AddNewCustomerDialog />
            </div>

            <md-list-item v-if="role == 'manager'" href="#/dashboard">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <li class="md-list-item">
              <a
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div
                  v-if="role == 'manager' || role == 'receptionist'"
                  class="md-list-item-content"
                >
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification">{{ numberOfNotificationNotSeen }}</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li v-if="notifications.length == 0"><a>Nothing</a></li>
                      <li
                        class="notification-item"
                        v-for="noti in notifications"
                        :key="noti.notification_id"
                      >
                        <a @click="seenNoti(noti)">{{ noti.content }}</a>
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>

            <div class="md-list-item-content">
              <drop-down>
                <md-button
                  slot="title"
                  class="md-button md-just-icon md-simple"
                  data-toggle="dropdown"
                >
                  <i class="material-icons">person</i>
                  <p class="hidden-lg hidden-md">Profile</p>
                </md-button>
                <ul class="dropdown-menu dropdown-menu-right center">
                  <md-button @click="logout"> Đăng xuất</md-button>
                </ul>
              </drop-down>
            </div>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import config from "../../config/config";
import AddNewCustomerDialog from "../../components/Modal/AddNewCustomerDialog";

export default {
  components: {
    AddNewCustomerDialog,
  },
  data() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone",
      ],
      numberOfNotificationNotSeen: 0,
      notifications: [],
      host: config.config.host,
      role: localStorage.getItem("role"),
    };
  },

  mounted() {
    this.loadNotification();

    setInterval(() => {
      this.loadNotification();
    }, 5000);
  },
  methods: {
    loadNotification() {
      axios.get(this.host + "/getNotificationForManager").then((response) => {
        if (response.data) {
          this.numberOfNotificationNotSeen = 0;
          this.notifications = [];
          response.data.forEach((element) => {
            if (element.seen === 0) {
              this.numberOfNotificationNotSeen++;
              this.notifications.push(element);
            }
          });
        }
      });
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logout: function () {
      if (localStorage.getItem("username")) {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        axios.get(this.host + "/logoutCustomer").then((response) => {});
        this.$router.push("/login");
      }
    },

    seenNoti(noti) {
      this.numberOfNotificationNotSeen--;
      console.log(noti);
      noti.seen = 1;
      axios
        .post(this.host + "/seenNoti/" + noti.notification_id, {
          noti,
        })
        .then((response) => {
          this.loadNotification();
          if (this.$route.name != "PendingRequest") {
            this.$router.push("/pendingRequest");
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style lang="css">
.notification-item {
  display: flex;
  align-items: center;
}
.margin-left {
  margin-left: 29px;
}
.md-title {
  font-family: ui-monospace;
  font-size: x-large !important;
}

.center {
  display: flex !important;
  justify-content: center !important;
  padding-right: 20px !important;
}
</style>
