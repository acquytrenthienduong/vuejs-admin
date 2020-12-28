<template>
  <div>
    <section>
      <b-table
        :data="activities"
        ref="table"
        paginated
        per-page="10"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <b-table-column label="STT" width="40" numeric>
          <template v-slot="props">
            {{ props.row.stt }}
          </template>
        </b-table-column>

        <b-table-column label="Hoạt động" centered>
          <template v-slot="props">
            {{ props.row.content }}
          </template>
        </b-table-column>
        <h3 class="empty" v-if="activities.length == 0">No request Pending</h3>
      </b-table>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config/config";

import { id } from "date-fns/locale";
export default {
  components: {},
  data() {
    return {
      activities: [],
      request: {},
      isActive: false,
      host: config.config.host,
      role: localStorage.getItem("username"),
    };
  },
  methods: {
    loadData() {
      this.activities = [];
      var stt = 1;
      axios.get(this.host + "/findAllActivity").then((response) => {
        response.data.forEach((element) => {
          let activity = {};
          activity = element;
          activity.stt = stt++;
          this.activities.push(activity);
        });
      });
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
.buttons:last-child {
  margin-bottom: 1rem !important;
}

li {
  list-style: none !important;
}

ul {
  margin-bottom: unset !important;
}
.toast {
  flex-basis: 45px !important;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
}
table {
  margin-left: 30px;
  width: 94% !important;
}

.level-right {
  margin-right: 33px !important;
}

table td {
  vertical-align: inherit !important;
}
</style>
