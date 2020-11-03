<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey darken-2" dark v-bind="attrs" v-on="on">
          View Bill
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Bill</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  components: {},
  props: {
    reload: {
      type: Function,
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {},
};
</script>
