<template>
  <v-menu
    :ref="reference"
    v-model="dateState"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <validation-provider
        ref="provider"
        v-slot="{ errors }"
        :name="name"
        rules="required"
      >
        <v-text-field
          v-model="formattedDate"
          outlined
          required
          readonly
          placeholder="DD.MM.YYYY"
          :error-messages="errors"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </validation-provider>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="dateState = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import { extend, ValidationProvider } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "{_field_} cannot be empty",
});

export default {
  props: ["sentDate", "invalid", "name", "reference"],
  components: { ValidationProvider },
  data() {
    return {
      date: null,
      formattedDate: null,
      dateState: false,
      requiredRule: "required",
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    date() {
      this.formattedDate = this.formatDate(this.date);
      this.$emit("date-updated", this.date);
    },
    formattedDate() {
      this.$emit("validate-date");
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split(".");
      return `${day}.${month}.${year}`;
    },
    parseDate(date) {
      if (!date) {
        this.date = null;
      } else {
        const [day, month, year] = date.split(".");
        this.date = `${day}.${month}.${year}`;
      }
    },
  },
  created() {
    this.date = this.sentDate;
    this.formattedDate = this.formatDate(this.date);
  },
};
</script>
