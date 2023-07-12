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
        rules="required|date-format"
      >
        <v-text-field
          v-model="formattedDate"
          outlined
          required
          placeholder="DD.MM.YYYY"
          :error-messages="errors"
          v-bind="attrs"
          @blur="parseDate(formattedDate)"
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
extend("date-format", {
  validate(value) {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    return regex.test(value);
  },
  message: "{_field_} must be in the format DD.MM.YYYY",
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
      this.$emit("date-updated", this.formattedDate);
    },
    formattedDate() {
      this.$emit("validate-date");
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    },
    parseDate(date) {
      if (!date) {
        this.date = null;
      } else {
        const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
        if (!regex.test(date)) {
          this.date = null;
          return;
        }

        const [day, month, year] = date.split(".");
        const parsedDay = parseInt(day, 10);
        const parsedMonth = parseInt(month, 10);
        const parsedYear = parseInt(year, 10);

        const isValidDate = this.isValidDate(
          parsedDay,
          parsedMonth,
          parsedYear
        );
        if (!isValidDate) {
          // Handle invalid date
          this.date = null;
          // You can show an error message or take appropriate action here
          return;
        }

        this.date = `${year}-${month}-${day}`;
      }
    },
    isValidDate() {
      if (!this.formattedDate) {
        return false;
      }

      const [day, month, year] = this.formattedDate.split(".");
      const parsedDay = parseInt(day, 10);
      const parsedMonth = parseInt(month, 10);
      const parsedYear = parseInt(year, 10);

      const isLeapYear =
        (parsedYear % 4 === 0 && parsedYear % 100 !== 0) ||
        parsedYear % 400 === 0;
      const maxDays = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

      return parsedDay >= 1 && parsedDay <= maxDays[parsedMonth - 1];
    },
  },
  created() {
    this.date = this.sentDate;
    this.formattedDate = this.formatDate(this.date);
  },
};
</script>
