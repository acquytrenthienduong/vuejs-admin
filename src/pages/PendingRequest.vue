<template>
  <div>
    <section>
      <b-tabs>
        <b-tab-item icon="google-photos" label="Tạo mới">
          <b-table
            :data="requests"
            ref="table"
            paginated
            per-page="5"
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

            <b-table-column label="SĐT">
              <template v-slot="props">
                {{ props.row.customer.account }}
              </template>
            </b-table-column>

            <b-table-column label="Tên">
              <template v-slot="props">
                {{ props.row.customer.name }}
              </template>
            </b-table-column>

            <b-table-column label="Thời gian">
              <template v-slot="props">
                {{ props.row.checkin_time }}
              </template>
            </b-table-column>

            <b-table-column label="Ngày">
              <template v-slot="props">
                {{ props.row.reservation_date }}
              </template>
            </b-table-column>

            <b-table-column label="Dịch vụ">
              <template v-slot="props">
                {{ props.row.sub_service.name }}
              </template>
            </b-table-column>

            <b-table-column label="Hành động">
              <template class="displayflex" v-slot="props">
                <md-button
                  class="md-just-icon md-simple md-primary"
                  @click="
                    confirm(
                      props.row.reservation_id,
                      props.row.customer.customer_id,
                      props.row
                    )
                  "
                >
                  <md-icon>done</md-icon>
                  <md-tooltip md-direction="top">Chấp nhận</md-tooltip>
                </md-button>
                <md-button
                  @click="deleteManager(props.row.manager_id)"
                  class="md-just-icon md-simple md-danger"
                >
                  <md-icon>delete</md-icon>
                  <md-tooltip md-direction="top">Không chấp nhận</md-tooltip>
                </md-button>
              </template>
            </b-table-column>
            <h3 class="empty" v-if="requests.length == 0">
              Không có cuộc hẹn nào đang chờ được duyệt
            </h3>
          </b-table>
        </b-tab-item>

        <b-tab-item icon="google-drive" label="Thay đổi">
          <h3>Thay đổi ngày</h3>
          <b-table
            :data="requests1"
            ref="table"
            paginated
            per-page="5"
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

            <b-table-column label="SĐT">
              <template v-slot="props">
                {{ props.row.customer.account }}
              </template>
            </b-table-column>

            <b-table-column label="Tên">
              <template v-slot="props">
                {{ props.row.customer.name }}
              </template>
            </b-table-column>

            <b-table-column label="Thời gian">
              <template v-slot="props">
                {{ props.row.checkin_time }}
              </template>
            </b-table-column>

            <b-table-column label="Ngày">
              <template v-slot="props">
                {{ props.row.reservation_date }}
              </template>
            </b-table-column>

            <b-table-column label="Dịch vụ">
              <template v-slot="props">
                {{ props.row.sub_service.name }}
              </template>
            </b-table-column>

            <b-table-column label="Hành động">
              <template v-slot="props">
                <div class="displayflex">
                  <section>
                    <md-button
                      class="md-just-icon md-simple md-primary"
                      @click="updateInfor(props.row)"
                    >
                      <md-icon>create</md-icon>
                      <md-tooltip md-direction="top">Accept</md-tooltip>
                    </md-button>
                    <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
                      <div class="card">
                        <div class="card-content">
                          <div class="media">
                            <div class="media-left"></div>
                            <div class="media-content">
                              <p class="title is-4">Thay đổi lịch</p>
                            </div>
                          </div>

                          <div class="content">
                            <b-field label="Dịch vụ">
                              <b-select
                                v-model="selectedType"
                                placeholder="Chọn loại dịch vụ"
                                rounded
                              >
                                <option value="1">Stand up</option>
                                <option value="2">Lay Down</option>
                                <option value="3">Spray</option>
                              </b-select>
                              <b-select
                                v-model="selectSubService"
                                placeholder="Gói dịch vụ"
                                rounded
                              >
                                <option
                                  v-for="item in items"
                                  :key="item.value"
                                  :value="item.value"
                                >
                                  {{ item.name }}
                                </option>
                              </b-select>
                            </b-field>
                            <b-field label="Ngày">
                              <b-input v-model="date" type="date" required> </b-input>
                            </b-field>
                            <b-field label="Giờ">
                              <b-input v-model="time" type="time" required> </b-input>
                            </b-field>
                          </div>
                          <button class="button is-primary" @click="OK(props.row)">
                            Thay đổi
                          </button>
                          <button
                            class="button"
                            type="button"
                            @click="isCardModalActive = false"
                          >
                            Không thay đổi
                          </button>
                        </div>
                      </div>
                    </b-modal>
                  </section>
                  <md-button
                    @click="rejectChange(props.row.reservation_id, props.row.customer_id)"
                    class="md-just-icon md-simple md-danger"
                  >
                    <md-icon>delete</md-icon>
                    <md-tooltip md-direction="top">Reject</md-tooltip>
                  </md-button>
                </div>
              </template>
            </b-table-column>
            <h3 class="empty" v-if="requests1.length == 0">No request Pending</h3>
          </b-table>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config/config";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { id } from "date-fns/locale";

export default {
  components: {},
  data() {
    return {
      requests: [],
      requests1: [],
      request: {},
      isActive: false,
      host: config.config.host,
      role: localStorage.getItem("username"),
      isCardModalActive: false,
      today: new Date(),
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      items: [],
      selectedType: 1,
      selectSubService: null,
      chooseServices: [
        { value: 1, name: "Stand up" },
        { value: 2, name: "Lay Down" },
        { value: 3, name: "Spray" },
      ],
      time: null,
    };
  },
  methods: {
    confirm(id, customer_id, customer) {
      this.$buefy.dialog.confirm({
        message: "Do you want to accept the request?",
        onConfirm: () => this.acceptRequest(id, customer_id, customer),
      });
    },
    success() {
      this.$buefy.toast.open({
        message: "Request Accepted!",
        type: "is-success",
        // duration: 5000000,
      });
    },
    loadAllPendingRequests() {
      this.requests = [];
      var stt = 1;
      axios.get(this.host + "/getAllReservationNotAccess").then((response) => {
        // console.log("response", response.data);
        response.data.forEach((element) => {
          let request = {};
          request = element;
          request.stt = stt++;
          this.requests.push(request);
        });
        // console.log("requests", requests);
      });
    },

    loadAllPendingChange() {
      this.requests1 = [];
      var stt = 1;
      axios.get(this.host + "/getAllReservationChange").then((response) => {
        response.data.forEach((element) => {
          let request = {};
          request = element;
          request.stt = stt++;
          this.requests1.push(request);
        });
      });
    },

    acceptRequest(requestID, customer_id, customer) {
      let dateRaw = new Date();
      axios
        .post(this.host + "/updateReservation/" + requestID, {
          is_access: 1,
        })
        .then((response) => {
          this.success();
          this.loadAllPendingRequests();

          axios
            .post(this.host + "/createNotification/" + customer_id, {
              content: "Lịch của bạn đã được đặt thành công!",
            })
            .then((response) => {
              console.log(response);
            });

          axios
            .post(this.host + "/createActivity", {
              content:
                this.role +
                " chấp nhận lịch hẹn của khách hàng " +
                customer.customer.name +
                "lúc " +
                customer.reservation_date +
                " " +
                customer.checkin_time,
            })
            .then(() => {});
        });
    },

    rejectChange(id, customer_id) {
      Swal.fire({
        title: "Hủy thay đổi?",
        text: "Chắc chắn hủy thay đổi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Không",
        confirmButtonText: "Đúng vậy!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(this.host + "/updateReservation/" + id, {
              is_access: 1,
            })
            .then(() => {
              Swal.fire("Thành công!", "đã hủy thay đổi lịch.", "success");
              axios
                .post(this.host + "/createNotification/" + customer_id, {
                  content: "Lịch của bạn vẫn giữ nguyên như cũ",
                })
                .then((response) => {
                  console.log(response);
                });
              this.loadAllPendingChange();
            });
        }
      });
    },

    updateInfor(row) {
      this.isCardModalActive = true;
      this.chooseServices.forEach((element) => {
        if (element.name === row.sub_service.name) {
          switch (element.name) {
            case "Stand up":
              this.selectedType = 1;
              break;
            case "Lay Down":
              this.selectedType = 2;
              break;
            case "Spray":
              this.selectedType = 3;
              break;
          }
          console.log("this.selectedType", this.selectedType);
          this.selectSubService = row.sub_service.sub_service_id;
          this.date = row.reservation_date;
          this.time = row.checkin_time;
        }
      });
    },

    OK(row) {
      console.log(row);
      if (this.compareDate(this.date)) {
        axios
          .post(this.host + "/updateReservation/" + row.reservation_id, {
            is_access: 1,
            reservation_date: this.date,
            checkin_time: this.time,
            sub_service_sub_service_id: this.selectSubService,
          })
          .then(() => {
            Swal.fire("Thành công!", "Update lịch thành công.", "success");
            axios
              .post(this.host + "/createNotification/" + row.customer.customer_id, {
                content:
                  "Lịch của bạn đã đổi sang ngày " + this.date + " vào lúc " + this.time,
              })
              .then((response) => {
                console.log(response);
                axios
                  .post(this.host + "/createActivity", {
                    content:
                      this.role +
                      " đã tạo thay đổi lịch cho khách hàng " +
                      row.customer.name +
                      " sang ngày " +
                      this.date +
                      " vào lúc " +
                      this.time,
                  })
                  .then(() => {});
              });
            this.isCardModalActive = false;
            this.loadAllPendingChange();
          });
      } else {
        Swal.fire("Không thành công!", "Hãy chọn 1 ngày trong tương lai.", "warning");
      }
    },

    loadSubService(type) {
      axios
        .get(this.host + "/getAllSubService/" + type)
        .then((res) => {
          this.items = [];
          res.data.forEach((element) => {
            let selectItem = {};
            if (element.type === 1) {
              selectItem.name = element.time.replace(
                /(?:0)?(\d+):(?:0)?(\d+).*/,
                "$1h $2m"
              );
              selectItem.value = element.sub_service_id;
            } else if (element.type === 2) {
              selectItem.name = element.time.replace(
                /(?:0)?(\d+):(?:0)?(\d+).*/,
                "$1h $2m"
              );
              selectItem.value = element.sub_service_id;
            } else {
              selectItem.name = element.session;
              selectItem.value = element.sub_service_id;
            }
            console.log("selected item");
            this.items.push(selectItem);
          });
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },

    compareDate(date) {
      let today = new Date();
      let dateRaw = new Date(date);
      if (today > dateRaw) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    this.loadAllPendingRequests();
    this.loadAllPendingChange();
    this.loadSubService(this.selectedType);
  },

  watch: {
    selectedType: function (val) {
      console.log(val);
      this.loadSubService(val);
    },
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

.modal .animation-content .modal-card {
  overflow: visible !important;
}

.modal-card-body {
  overflow: visible !important;
}

.displayflex {
  display: flex !important;
}
</style>
