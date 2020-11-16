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
            <md-list-item href="#/dashboard">
              <i class="material-icons">dashboard</i>
              <p class="hidden-lg hidden-md">Dashboard</p>
            </md-list-item>

            <li class="md-list-item">
              <a
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification">{{
                        numberOfNotificationNotSeen
                      }}</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li v-if="notifications.length == 0"><a>Nothing</a></li>
                      <li
                        class="notification-item"
                        v-for="noti in notifications"
                        :key="noti.content"
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
                <ul class="dropdown-menu dropdown-menu-right">
                  <md-button @click="logout"> Logout</md-button>
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
import axios from "axios";
export default {
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
    };
  },

  mounted() {
    this.loadNotification();

    setInterval(() => {
      this.loadNotification();
    }, 10000);
  },
  methods: {
    loadNotification() {
      axios
        .get("http://localhost:8000/getNotificationForManager")
        .then((response) => {
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
          // this.notifications = response.data;
        });
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logout: function() {
      if (localStorage.getItem("username")) {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        axios
          .get("http://localhost:8000/logoutCustomer")
          .then((response) => {});

        this.$router.push("/login");
      }
    },

    seenNoti(noti) {
      console.log(noti);
      noti.seen = 1;
      axios
        .post("http://localhost:8000/seenNoti/" + noti.notification_id, {
          noti,
        })
        .then((response) => {
          if (this.$route.name != "Typography") {
            this.$router.push("/typography");
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
</style>
