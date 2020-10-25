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
              This is where you can config the staff information
            </p>
          </md-card-header>
          <md-card-content>
            <ManagerTable />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ManagerTable } from "@/components";

export default {
  components: {
    ManagerTable,
  },
};
</script>
