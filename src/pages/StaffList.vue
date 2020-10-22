<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">Staff Detail</h4>
            <p class="category">
              This is where you can config the staff information
            </p>
          </md-card-header>
          <md-card-content>
            <StaffTable />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { StaffTable } from "@/components";

export default {
  components: {
    StaffTable,
  },
};
</script>
