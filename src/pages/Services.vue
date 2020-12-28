<template>
  <div>
    <section>
      <b-tabs>
        <b-tab-item icon="human-male" label="Stand up">
          <div class="buttons" style=".buttons:not(:last-child) : margin-bottom: 1rem">
            <b-button
              size="is-medium"
              class="fas fa-plus"
              @click="isAddNewStandUpActive = true"
            >
            </b-button>
          </div>

          <b-modal
            v-model="isAddNewStandUpActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
          >
            <template #default="props">
              <AddNewStandUpModal
                @close="props.close"
                :reload="loadStandUpService"
              ></AddNewStandUpModal>
            </template>
          </b-modal>

          <b-modal
            v-model="isUpdateStandUpActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
          >
            <template #default="props">
              <UpdateStandUpModal
                @close="props.close"
                :service="service"
                :reload="loadStandUpService"
              ></UpdateStandUpModal>
            </template>
          </b-modal>
          <b-table
            :data="services"
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

            <b-table-column label="Gói dịch vụ">
              <template v-slot="props">
                {{ props.row.name }}
              </template>
            </b-table-column>

            <b-table-column label="Khoảng thời gian">
              <template v-slot="props">
                {{ props.row.time }}
              </template>
            </b-table-column>

            <b-table-column label="Giá tiền">
              <template v-slot="props">
                {{ props.row.money }}
              </template>
            </b-table-column>

            <b-table-column label="Hành động">
              <template v-slot="props">
                <md-button
                  class="md-just-icon md-simple md-primary"
                  @click="loadStandUpByID(props.row.sub_service_id)"
                >
                  <md-icon>edit</md-icon>
                  <md-tooltip md-direction="top">Chỉnh sửa</md-tooltip>
                </md-button>
              </template>
            </b-table-column>
          </b-table>
        </b-tab-item>

        <b-tab-item icon="bed" label="Lay Down">
          <div class="buttons" style=".buttons:not(:last-child) : margin-bottom: 1rem">
            <b-button
              size="is-medium"
              class="fas fa-plus"
              @click="isAddNewLayDownActive = true"
            >
            </b-button>
          </div>
          <!-- add new modal -->
          <b-modal
            v-model="isAddNewLayDownActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
          >
            <template #default="props">
              <AddNewLayDownModal
                @close="props.close"
                :reload="loadLayDownService"
              ></AddNewLayDownModal>
            </template>
          </b-modal>
          <!-- update modal -->
          <b-modal
            v-model="isUpdateLayDownActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
          >
            <template #default="props">
              <UpdateLayDownModal
                @close="props.close"
                :service="service1"
                :reload="loadLayDownService"
              ></UpdateLayDownModal>
            </template>
          </b-modal>
          <b-table
            :data="services1"
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

            <b-table-column label="Gói dịch vụ">
              <template v-slot="props">
                {{ props.row.name }}
              </template>
            </b-table-column>

            <b-table-column label="Khoảng thời gian">
              <template v-slot="props">
                {{ props.row.time }}
              </template>
            </b-table-column>

            <b-table-column label="Giá tiền">
              <template v-slot="props">
                {{ props.row.money }}
              </template>
            </b-table-column>

            <b-table-column label="Hành động">
              <template v-slot="props">
                <md-button
                  class="md-just-icon md-simple md-primary"
                  @click="loadLayDownByID(props.row.sub_service_id)"
                >
                  <md-icon>edit</md-icon>
                  <md-tooltip md-direction="top">Chỉnh sửa</md-tooltip>
                </md-button>
              </template>
            </b-table-column>
          </b-table>
        </b-tab-item>

        <b-tab-item icon="spray" label="Spray">
          <div class="buttons" style=".buttons:not(:last-child) : margin-bottom: 1rem">
            <b-button
              size="is-medium"
              class="fas fa-plus"
              @click="isAddSprayActive = true"
            >
            </b-button>
          </div>
          <b-modal
            v-model="isAddSprayActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
          >
            <template #default="props">
              <AddNewSprayModal
                @close="props.close"
                :reload="loadSprayService"
              ></AddNewSprayModal>
            </template>
          </b-modal>
          <!-- update modal -->
          <b-modal
            v-model="isUpdateSprayActive"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-modal
          >
            <template #default="props">
              <UpdateSprayModal
                @close="props.close"
                :service="service2"
                :reload="loadSprayService"
              ></UpdateSprayModal>
            </template>
          </b-modal>
          <b-table
            :data="services2"
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

            <b-table-column label="Gói dịch vụ">
              <template v-slot="props">
                {{ props.row.name }}
              </template>
            </b-table-column>

            <b-table-column label="Chi tiết">
              <template v-slot="props">
                {{ props.row.session }}
              </template>
            </b-table-column>

            <b-table-column label="Giá tiền">
              <template v-slot="props">
                {{ props.row.money }}
              </template>
            </b-table-column>

            <b-table-column label="Action">
              <template v-slot="props">
                <md-button
                  class="md-just-icon md-simple md-primary"
                  @click="loadSprayByID(props.row.sub_service_id)"
                >
                  <md-icon>edit</md-icon>
                  <md-tooltip md-direction="top">Chỉnh sửa</md-tooltip>
                </md-button>
              </template>
            </b-table-column>
          </b-table>
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config/config";
import AddNewStandUpModal from "../components/Modal/AddNewStandUpModal";
import AddNewLayDownModal from "../components/Modal/AddNewLayDownModal";
import AddNewSprayModal from "../components/Modal/AddNewSprayModal";
import UpdateStandUpModal from "../components/Modal/UpdateStandUpModal";
import UpdateLayDownModal from "../components/Modal/UpdateLayDownModal";
import UpdateSprayModal from "../components/Modal/UpdateSprayModal";

import { id } from "date-fns/locale";
export default {
  components: {
    AddNewStandUpModal,
    AddNewLayDownModal,
    AddNewSprayModal,
    UpdateStandUpModal,
    UpdateLayDownModal,
    UpdateSprayModal,
  },
  data() {
    return {
      services: [],
      service: {},
      services1: [],
      service1: {},
      services2: [],
      service2: {},
      host: config.config.host,
      //data for modal
      isAddNewStandUpActive: false,
      isAddNewLayDownActive: false,
      isAddSprayActive: false,
      isUpdateStandUpActive: false,
      isUpdateLayDownActive: false,
      isUpdateSprayActive: false,
    };
  },
  methods: {
    loadStandUpByID(standup_id) {
      this.isUpdateStandUpActive = true;
      axios
        .get(this.host + "/getServiceByID/" + standup_id)
        .then((response) => (this.service = response.data));
    },

    loadLayDownByID(laydown_id) {
      this.isUpdateLayDownActive = true;
      axios
        .get(this.host + "/getServiceByID/" + laydown_id)
        .then((response) => (this.service1 = response.data));
    },

    loadSprayByID(spray_id) {
      this.isUpdateSprayActive = true;
      axios
        .get(this.host + "/getServiceByID/" + spray_id)
        .then((response) => (this.service2 = response.data));
    },

    loadStandUpService() {
      this.services = [];
      var stt = 1;
      axios.get(this.host + "/getAllSubService/" + 1).then((response) => {
        response.data.forEach((element) => {
          let stand = {};
          stand = element;
          stand.stt = stt++;
          this.services.push(stand);
        });
        // this.services = response.data;
      });
    },
    loadLayDownService() {
      this.services1 = [];
      var stt = 1;
      axios.get(this.host + "/getAllSubService/" + 2).then((response) => {
        response.data.forEach((element) => {
          let laydown = {};
          laydown = element;
          laydown.stt = stt++;
          this.services1.push(laydown);
        });
      });
    },
    loadSprayService() {
      this.services2 = [];
      var stt = 1;
      axios.get(this.host + "/getAllSubService/" + 3).then((response) => {
        response.data.forEach((element) => {
          let spray = {};
          spray = element;
          spray.stt = stt++;
          this.services2.push(spray);
        });
      });
    },
  },
  mounted() {
    // this.services = this.loadAllServices(1);
    this.loadStandUpService();
    this.loadLayDownService();
    this.loadSprayService();

    // this.loadAllServices(2);
    // this.loadAllServices(3);
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
</style>
