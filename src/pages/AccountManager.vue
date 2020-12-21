<template>
  <div>
    <!-- <ManagerTable /> -->
    <section>
      <b-tabs>
        <b-tab-item icon="google-photos" label="Quản lí">
          <ManagerTable />
        </b-tab-item>

        <b-tab-item icon="video" label="Lễ tân">
          <ReceptionistTable />
        </b-tab-item>
      </b-tabs>
    </section>
  </div>
</template>

<script>
import { ManagerTable } from "@/components";
import ReceptionistTable from "../components/Tables/ReceptionistTable";

export default {
  components: {
    ManagerTable,
    ReceptionistTable,
  },
};
</script>

<style lang="css">
.buttons .button {
  margin-left: 30px !important;
}

.content ul {
  margin-top: unset;
}

md-theme-default a:not(.md-button) {
  color: white !important;
}
</style>
