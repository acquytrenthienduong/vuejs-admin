<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="dark">
            <h4 class="title">Account List</h4>
            <p class="category">
              This is where you can config the Account information
            </p>
          </md-card-header>
          <md-card-content>
            <!-- <ManagerTable /> -->
            <section>
              <b-tabs>
                <b-tab-item icon="google-photos" label="Manager">
                  <ManagerTable />
                </b-tab-item>

                <b-tab-item icon="google-drive" label="Staff">
                   <StaffTable />
                </b-tab-item>

                <b-tab-item icon="video" label="Receptionist">
                  <h1>List of Receptionist</h1>
                </b-tab-item>
              </b-tabs>
            </section>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ManagerTable } from "@/components";
import StaffTable from '../components/Tables/StaffTable'


export default {
  components: {
    ManagerTable,
    StaffTable
  },
  
};
</script>
