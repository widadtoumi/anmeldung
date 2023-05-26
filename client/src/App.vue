<template>
  <v-app>
    <v-main class="form">
      <div class="top-bar">
        <img src="@/assets/sb-logo.svg" alt="" class="logo" srcset="" />
      </div>
      <v-container>
        <div class="about-section">
          <h1 class="form-header">Anmeldung in English</h1>
          <div class="about-description">
            This form is provided as a free service to help you complete your
            Anmeldung (city registration) form for Germany in English. It will
            generate a PDF ready to take to the Bürgeramt or town hall. It works
            in all cities in Germany.
            <br />
            <br />
            Data protection information: None of your data is transmitted to the
            internet. The answers are processed by your own computer.
            <br />
            <br />
            <i>
              Datenschutzhinweis: Wir übertragen Ihre Daten nicht ins Internet.
              Das Antwortschreiben wird auf Ihrem Computer erstellt.
            </i>
          </div>
        </div>
        <v-card flat class="form-card">
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submitForm">
              <div class="one-person-form">
                <div class="opf-title">first person</div>
                <div class="opf-content">
                  <div class="opf-section-title">name:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="First name"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.firstName"
                      :error-messages="errors"
                      label="First name"
                      outlined
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="Last name"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.lastName"
                      :error-messages="errors"
                      label="Last name"
                      outlined
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider v-slot="{ errors }" name="Maiden name">
                    <v-text-field
                      v-model="formData.maidenName"
                      :error-messages="errors"
                      label="Maiden name (if any)"
                      outlined
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">gender:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="gender"
                    rules="required"
                  >
                    <v-select
                      v-model="formData.gender"
                      :items="formData.genders"
                      :error-messages="errors"
                      label="- Please choose -"
                      outlined
                      data-vv-name="gender"
                      required
                    ></v-select>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">religion:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="religion"
                    rules="required"
                  >
                    <v-select
                      v-model="formData.religion"
                      :items="formData.religions"
                      :error-messages="errors"
                      label="- Please choose -"
                      outlined
                      data-vv-name="religion"
                      required
                    ></v-select>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title-wrap">
                    <div class="opf-section-title">
                      Stage name: <span> (optional) </span>
                    </div>
                    <v-hover v-slot="{ hover }" open-delay="200">
                      <div class="tooltip">
                        <v-icon color="#3894D3"> mdi-information </v-icon>
                        <div
                          class="tp"
                          :class="hover ? 'show-tooltip' : 'hide-tooltip'"
                        >
                          If you used a previous surname, write it here
                        </div>
                      </div>
                    </v-hover>
                  </div>
                  <validation-provider v-slot="{ errors }" name="stage name">
                    <v-text-field
                      v-model="formData.stageName"
                      :error-messages="errors"
                      outlined
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Date of birth:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Birth Date"
                    rules="required"
                  >
                    <v-menu
                      ref="birthDate"
                      v-model="birthDate"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dateFormatted"
                          outlined
                          :error-messages="errors"
                          v-bind="attrs"
                          @blur="date = parseDate(dateFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        @input="birthDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title-wrap">
                    <div class="opf-section-title">
                      Place of birth:
                      <span> (town or city and state, where appropriate) </span>
                    </div>
                    <v-hover v-slot="{ hover }" open-delay="200">
                      <div class="tooltip">
                        <v-icon color="#3894D3"> mdi-information </v-icon>
                        <div
                          class="tp"
                          :class="hover ? 'show-tooltip' : 'hide-tooltip'"
                        >
                          This must match the gender in your passport
                        </div>
                      </div>
                    </v-hover>
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Place of birth"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.birthPlace"
                      :error-messages="errors"
                      outlined
                      required
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">country of birth:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="country of birth"
                    rules="required"
                  >
                    <v-select
                      v-model="formData.birthCountry"
                      :items="formData.countries"
                      :error-messages="errors"
                      label="- Please choose -"
                      outlined
                      data-vv-name="country of birth"
                      required
                    ></v-select>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Nationality:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="nationality"
                    rules="required"
                  >
                    <v-select
                      v-model="formData.nationality"
                      :items="formData.nationalities"
                      :error-messages="errors"
                      label="- Please choose -"
                      outlined
                      data-vv-name="nationality"
                      required
                    ></v-select>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">
                    Second nationality: <span> (if any) </span>
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="secondNationality"
                  >
                    <v-select
                      v-model="formData.secondNationality"
                      :items="formData.nationalities"
                      :error-messages="errors"
                      label="- Please choose -"
                      outlined
                      data-vv-name="secondNationality"
                    ></v-select>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Document type:</div>
                  <validation-provider v-slot="{ errors }" name="document type">
                    <v-select
                      v-model="formData.document"
                      :items="formData.documents"
                      :error-messages="errors"
                      placeholder="- Please choose -"
                      outlined
                      data-vv-name="document"
                    ></v-select>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Issuing authority:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Authority name"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.authorityName"
                      :error-messages="errors"
                      label="Authority name"
                      outlined
                      required
                    ></v-text-field>
                  </validation-provider>

                  <validation-provider
                    v-slot="{ errors }"
                    name="Place name"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.placeName"
                      :error-messages="errors"
                      label="Place name"
                      outlined
                      required
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Document serial number:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="serial number"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.serialNum"
                      :error-messages="errors"
                      outlined
                      required
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Valid from:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Valid from"
                    rules="required"
                  >
                    <v-menu
                      ref="validFrom"
                      v-model="validFromDate"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="validFromFormatted"
                          outlined
                          :error-messages="errors"
                          v-bind="attrs"
                          @blur="validFromDate = parseDate(validFromFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="validFrom"
                        no-title
                        @input="validFromDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">to:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Valid to"
                    rules="required"
                  >
                    <v-menu
                      ref="validTo"
                      v-model="validToDate"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="validToFormatted"
                          outlined
                          :error-messages="errors"
                          v-bind="attrs"
                          @blur="validToDate = parseDate(validToFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="validTo"
                        no-title
                        @input="validToDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Marital status:</div>
                  <validation-provider v-slot="{ errors }" name="marital">
                    <v-select
                      v-model="formData.marital"
                      :items="formData.maritalStatus"
                      :error-messages="errors"
                      placeholder="- Please choose -"
                      outlined
                      data-vv-name="marital"
                    ></v-select>
                  </validation-provider>
                </div>
                <div
                  v-if="formData.marital == 'Married'"
                  class="opf-content__marital-cac"
                >
                  <div class="opf-content">
                    <div class="opf-section-title">
                      Date of marriage/partnership:
                    </div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="married from"
                      rules="required"
                    >
                      <v-menu
                        ref="marriedFrom"
                        v-model="marriedFromDate"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="marriedFromFormatted"
                            outlined
                            :error-messages="errors"
                            v-bind="attrs"
                            @blur="
                              marriedFromDate = parseDate(marriedFromFormatted)
                            "
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="marriedFrom"
                          no-title
                          @input="marriedFromDate = false"
                        ></v-date-picker>
                      </v-menu>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title-wrap">
                      <div class="opf-section-title">
                        Place of marriage/partnership:
                      </div>
                    </div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Place of marriage"
                      rules="required"
                    >
                      <v-text-field
                        v-model="formData.marriagePlace"
                        :error-messages="errors"
                        outlined
                        required
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">
                      Country of marriage/partnership:
                    </div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="gender"
                      rules="required"
                    >
                      <v-select
                        v-model="formData.marriageCountry"
                        :items="formData.countries"
                        :error-messages="errors"
                        label="- Please choose -"
                        outlined
                        data-vv-name="gender"
                        required
                      ></v-select>
                    </validation-provider>
                  </div>
                </div>
              </div>
              <div
                v-for="(person, index) in formData.people"
                :key="index"
                class="one-person-form _second"
              >
                <div class="opf-header">
                  <div class="opf-title d-flex mb-2">
                    person {{ index + 2 }} <v-spacer></v-spacer>
                    <v-icon @click="removePerson(index)"
                      >mdi-trash-can-outline</v-icon
                    >
                  </div>
                  <div class="opf-desc">
                    This person must be married to {{ formData.firstName }}. If
                    they’re not, you should use a new form.
                  </div>
                </div>
                <div class="opf-content">
                  <div class="opf-content">
                    <div class="opf-section-title">name:</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="First name"
                      rules="required"
                    >
                      <v-text-field
                        v-model="person.FirstName"
                        :error-messages="errors"
                        label="First name"
                        outlined
                        required
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      name="Last name"
                      rules="required"
                    >
                      <v-text-field
                        v-model="person.LastName"
                        :error-messages="errors"
                        label="Last name"
                        outlined
                        required
                      ></v-text-field>
                    </validation-provider>

                    <validation-provider v-slot="{ errors }" name="Maiden name">
                      <v-text-field
                        v-model="person.MaidenName"
                        :error-messages="errors"
                        label="Maiden name (if any)"
                        outlined
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">gender:</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="gender"
                      rules="required"
                    >
                      <v-select
                        v-model="person.Gender"
                        :items="formData.genders"
                        :error-messages="errors"
                        label="- Please choose -"
                        outlined
                        data-vv-name="gender"
                        required
                      ></v-select>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">religion:</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="religion"
                      rules="required"
                    >
                      <v-select
                        v-model="person.Religion"
                        :items="formData.religions"
                        :error-messages="errors"
                        label="- Please choose -"
                        outlined
                        data-vv-name="religion"
                        required
                      ></v-select>
                    </validation-provider>
                  </div>
                </div>
              </div>
              <v-btn
                rounded
                block
                large
                color="#3894d3"
                elevation="0"
                dark
                class="my-8"
                @click="addPerson()"
              >
                Add a person
              </v-btn>
              <div class="apartment-form">
                <div class="opf-content mt-5">
                  <div class="opf-section-title">The new apartment is:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="apartment number"
                    immediate
                  >
                    <v-radio-group
                      :error-messages="errors"
                      v-model="formData.apartmentNum"
                    >
                      <v-radio
                        v-for="(apartment, index) in formData.apartmentNums"
                        :key="index"
                        :label="apartment.name"
                        :value="apartment.id"
                      ></v-radio>
                    </v-radio-group>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Date of moving in:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="moving date"
                    rules="required"
                  >
                    <v-menu
                      ref="movingDate"
                      v-model="movingDate"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="movingDateFormatted"
                          outlined
                          :error-messages="errors"
                          v-bind="attrs"
                          @blur="moved = parseDate(movingDateFormatted)"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="moved"
                        no-title
                        @input="movingDate = false"
                      ></v-date-picker>
                    </v-menu>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title-wrap">
                    <div class="opf-section-title">Street name and number:</div>
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="the address"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.address"
                      :error-messages="errors"
                      outlined
                      required
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title-wrap">
                    <div class="opf-section-title">Post code and city:</div>
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="post code"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.postCode"
                      :error-messages="errors"
                      outlined
                      required
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title-wrap">
                    <div class="opf-section-title">City:</div>
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="city"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.city"
                      :error-messages="errors"
                      outlined
                      required
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Floor number:</div>
                  <div class="opf-section-desc">
                    Remember in Europe that ground floor is 0.
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="floor"
                    rules="required"
                  >
                    <v-text-field
                      v-model="formData.floor"
                      :error-messages="errors"
                      outlined
                      type="number"
                      data-vv-name="floor"
                      step="any"
                      required
                      min="0"
                      ref="input"
                      :rules="[formData.floorRule]"
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content mt-5">
                  <div class="opf-section-title">
                    When you approach the apartment, the door is:
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="door side"
                    immediate
                  >
                    <v-radio-group
                      :error-messages="errors"
                      v-model="formData.doorSide"
                    >
                      <v-radio
                        v-for="(door, index) in formData.doorSides"
                        :key="index"
                        :label="door.name"
                        :value="door.id"
                      ></v-radio>
                    </v-radio-group>
                  </validation-provider>
                </div>
              </div>
              <div class="apartment-form _last">
                <div class="opf-content mt-5">
                  <div class="opf-section-title">
                    How did you move to this address:
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="this field"
                    immediate
                  >
                    <v-radio-group
                      :error-messages="errors"
                      v-model="formData.moveToGermany"
                    >
                      <v-radio
                        v-for="(moved, index) in formData.moveToGermanyOptions"
                        :key="index"
                        :label="moved.name"
                        :value="moved.id"
                      ></v-radio>
                    </v-radio-group>
                  </validation-provider>
                </div>
                <div v-if="formData.moveToGermany == 2" class="opf-content">
                  <div class="opf-section-title">
                    Will you be keeping your previous apartment:
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="this field"
                    immediate
                  >
                    <v-radio-group
                      :error-messages="errors"
                      v-model="formData.previousApart"
                    >
                      <v-radio
                        v-for="(
                          apartment, index
                        ) in formData.previousApartOptions"
                        :key="index"
                        :label="apartment.name"
                        :value="apartment.id"
                      ></v-radio>
                    </v-radio-group>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">
                    Do any of the people on the form have other apartments in
                    Germany?
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    rules="required"
                    name="this field"
                    immediate
                  >
                    <v-radio-group
                      :error-messages="errors"
                      v-model="formData.havApart"
                    >
                      <v-radio
                        v-for="(apartment, index) in formData.havApartOptions"
                        :key="index"
                        :label="apartment.name"
                        :value="apartment.id"
                      ></v-radio>
                    </v-radio-group>
                  </validation-provider>
                </div>
                <div class="disclaimer">
                  Disclaimer: The Anmeldung in English generator is provided as
                  a free service by
                  <a href="http://www.sorted.berlin/"> sorted.berlin </a>, and
                  while we've done our best to get it right, we can't take any
                  responsibility for any errors or omissions
                </div>
              </div>

              <v-btn
                rounded
                block
                large
                color="#3894d3"
                elevation="0"
                :dark="!invalid"
                class="my-8"
                type="submit"
                :disabled="invalid"
              >
                Finish and save
              </v-btn>
            </form>
          </validation-observer>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  name: "FormView",
  data: (vm) => ({
    formData: {
      firstName: "",
      lastName: "",
      maidenName: "",
      gender: null,
      genders: ["Male", "Female", "Other"],
      stageName: "",
      religion: null,
      religions: [
        "Please choose",
        "Roman Catholic",
        "Old Catholic",
        "Evangelical",
        "Evangelical-Lutheran",
        "Protestant Reformed",
        "Israelite religious communities (in Bavaria)",
        "None/other",
      ],
      birthDate: "",
      birthPlace: "",
      birthCountry: null,
      countries: [
        "Please select",
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Botswana",
        "Brazil",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cape Verde",
        "Central African Republic",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Comoros",
        "Costa Rica",
        "Côte d’Ivoire",
        "Croatia",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Democratic Republic of the Congo",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "East Timor",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Ethiopia",
        "Fiji",
        "Finland",
        "France",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Greece",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Kuwait",
        "Kyrgyzstan",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Micronesia",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "North Korea",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Qatar",
        "Republic of the Congo",
        "Republic of Macedonia",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Korea",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Togo",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States of America",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Yemen",
        "Zambia",
        "Zimbabwe",
      ],
      nationality: null,
      nationalities: [
        "Afghanistan",
        "Albanien",
        "Algerien",
        "Andorra",
        "Angola",
        "Antigua und Barbuda",
        "Argentinien",
        "Armenien",
        "Australien",
        "Österreich",
        "Aserbaidschan",
        "Bahamas",
        "Bahrain",
        "Bangladesch",
        "Barbados",
        "Weißrussland",
        "Belgien",
        "Belize",
        "Benin",
        "Bhutan",
        "Bolivien",
        "Bosnien und Herzegowina",
        "Botswana",
        "Brasilien",
        "Brunei",
        "Bulgarien",
        "Burkina Faso",
        "Burundi",
        "Kambodscha",
        "Kamerun",
        "Kanada",
        "Kap Verde",
        "Zentralafrikanische Republik",
        "Tschad",
        "Chile",
        "China",
        "Kolumbien",
        "Komoren",
        "Costa Rica",
        "Elfenbeinküste",
        "Kroatien",
        "Kuba",
        "Zypern",
        "Tschechien",
        "Demokratische Republik Kongo",
        "Dänemark",
        "Dschibuti",
        "Dominica",
        "Dominikanische Republik",
        "Osttimor",
        "Ecuador",
        "Ägypten",
        "El Salvador",
        "Äquatorialguinea",
        "Eritrea",
        "Estland",
        "Äthiopien",
        "Fidschi",
        "Finnland",
        "Frankreich",
        "Gabun",
        "Gambia",
        "Georgia",
        "Deutschland",
        "Ghana",
        "Griechenland",
        "Grenada",
        "Guatemala",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Ungarn",
        "Island",
        "Indien",
        "Indonesien",
        "Iran",
        "Irak",
        "Irland",
        "Israel",
        "Italien",
        "Jamaika",
        "Japan",
        "Jordan",
        "Kasachstan",
        "Kenia",
        "Kiribati",
        "Kuwait",
        "Kirgisistan",
        "Laos",
        "Lettland",
        "Libanon",
        "Lesotho",
        "Liberia",
        "Libyen",
        "Liechtenstein",
        "Litauen",
        "Luxemburg",
        "Madagaskar",
        "Malawi",
        "Malaysia",
        "Malediven",
        "Mali",
        "Malta",
        "Marshallinseln",
        "Mauretanien",
        "Mauritius",
        "Mexiko",
        "Mikronesien",
        "Moldawien",
        "Monaco",
        "Mongolei",
        "Montenegro",
        "Marokko",
        "Mosambik",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Niederlande",
        "Neuseeland",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Nordkorea",
        "Norwegen",
        "Oman",
        "Pakistan",
        "Palau",
        "Palästina",
        "Panama",
        "Papua-Neuguinea",
        "Paraguay",
        "Peru",
        "Philippinen",
        "Polen",
        "Portugal",
        "Katar",
        "Republik Kongo",
        "Mazedonien",
        "Rumänien",
        "Russland",
        "Ruanda",
        "St. Kitts und Nevis",
        "St. Lucia",
        "St. Vincent und die Grenadinen",
        "Samoa",
        "San Marino",
        "São Tomé und Príncipe",
        "Saudi-Arabien",
        "Senegal",
        "Serbien",
        "Seychellen",
        "Sierra Leone",
        "Singapur",
        "Slowakei",
        "Slowenien",
        "Salomonen",
        "Somalia",
        "Südafrika",
        "Südkorea",
        "Südsudan",
        "Spanien",
        "Sri Lanka",
        "Sudan",
        "Suriname",
        "Swasiland",
        "Schweden",
        "Schweiz",
        "Syrien",
        "Taiwan",
        "Tadschikistan",
        "Tansania",
        "Thailand",
        "Togo",
        "Tonga",
        "Trinidad und Tobago",
        "Tunesien",
        "Türkei",
        "Turkmenistan",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "Vereinigte Arabische Emirate",
        "Vereinigtes Königreich",
        "Vereinigte Staaten",
        "Uruguay",
        "Usbekistan",
        "Vanuatu",
        "Venezuela",
        "Vietnam",
        "Jemen",
        "Sambia",
        "Simbabwe",
      ],
      document: null,
      documents: ["Passport", "ID document", "Child’s passport"],
      validFrom: "",
      validTo: "",
      secondNationality: null,
      authorityName: "",
      placeName: "",
      serialNum: "",
      marital: null,
      maritalStatus: [
        "Please choose",
        "Married",
        "Single",
        "Civil partnership",
        "Widowed",
        "Civil partner deceased",
        "Divorced",
        "Civil partnership dissolved",
      ],
      marriedFrom: "",
      marriagePlace: "",
      marriageCountry: "",
      people: [],
      apartmentNum: 1,
      apartmentNums: [
        {
          id: 1,
          name: "Your only apartment",
        },
        {
          id: 2,
          name: "A second apartment, but will be my main one",
        },
        {
          id: 3,
          name: "A second apartment, but will be a secondary one",
        },
      ],
      address: "",
      postCode: "",
      moved: "",
      city: "",
      floor: 0,
      floorRule: (val) => {
        if (val < 0) return "Please enter a positive number";
        return true;
      },
      doorSide: 1,
      doorSides: [
        {
          id: 1,
          name: "On the left",
        },
        {
          id: 2,
          name: "In the middle",
        },
        {
          id: 3,
          name: "On the right",
        },
      ],
      moveToGermany: 1,
      moveToGermanyOptions: [
        {
          id: 1,
          name: "From abroad",
        },
        {
          id: 2,
          name: "From within Germany",
        },
      ],
      previousApart: 1,
      previousApartOptions: [
        {
          id: 1,
          name: "No, this is my only apartment",
        },
        {
          id: 2,
          name: "Yes, and my previous apartment will be my main one",
        },
        {
          id: 3,
          name: "Yes, and my previous apartment will be my secondary one",
        },
      ],
      havApart: 1,
      havApartOptions: [
        {
          id: 1,
          name: "Yes",
        },
        {
          id: 2,
          name: "No",
        },
      ],
    },
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    birthDate: false,

    validFrom: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    validFromFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    validFromDate: false,

    validTo: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    validToFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    validToDate: false,

    marriedFrom: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    marriedFromFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    marriedFromDate: false,

    moved: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    movingDateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    movingDate: false,
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    computedValidFromFormatted() {
      return this.formatDate(this.validFrom);
    },
    computedValidToFormatted() {
      return this.formatDate(this.validTo);
    },
    computedMarriedFromFormatted() {
      return this.formatDate(this.marriedFrom);
    },
    computedMovedFormatted() {
      return this.formatDate(this.moved);
    },
  },

  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      this.formData.birthDate = this.dateFormatted;
    },
    validFrom() {
      this.validFromFormatted = this.formatDate(this.validFrom);
      this.formData.validFrom = this.validFromFormatted;
    },
    validTo() {
      this.validToFormatted = this.formatDate(this.validTo);
      this.formData.validTo = this.validToFormatted;
    },
    marriedFrom() {
      this.marriedFromFormatted = this.formatDate(this.marriedFrom);
      this.formData.marriedFrom = this.marriedFromFormatted;
    },
    moved() {
      this.movingDateFormatted = this.formatDate(this.moved);
      this.formData.moved = this.movingDateFormatted;
    },
  },

  methods: {
    addPerson() {
      this.formData.people.push({
        FirstName: "",
        LastName: "",
        MaidenName: "",
        Gender: null,
        Religion: null,
      });
    },
    removePerson(index) {
      this.formData.people.splice(index, 1);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    async submitForm() {
      try {
        const response = await axios.post(
          "https://anmeldung.netlify.app/generate-pdf",
          {
            formData: this.formData,
          },
          {
            responseType: "arraybuffer",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const file = new Blob([response.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap");

body {
  margin: 0;
  font-family: "Merriweather Sans", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
  #app {
    font-family: "Merriweather Sans", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    min-height: 100vh;
    background: #e9ecef;
  }
  .form {
    background-color: #f2f2f2;
    .top-bar {
      background-color: #3894d3;
      height: 50px;
      padding: 0.5rem;
      text-align: center;
      .logo {
        position: absolute;
        margin-left: -40px;
      }
    }
    .container {
      max-width: 700px;
      padding: 3rem 0;
      .about-section {
        .form-header {
          margin-bottom: 0.5rem;
          font-family: "Merriweather Sans", sans-serif;
          font-size: 48px;
          font-weight: 700;
          text-align: center;
          color: #333;
        }
        .about-description {
          max-width: 523px;
          margin: 40px auto;
          font-size: 1rem;
          font-family: "Merriweather", serif;
        }
      }
      .form-card {
        border-radius: 12px;
        padding: 70px 100px;
        .one-person-form,
        .apartment-form {
          border-top: 2px solid;
          border-bottom: 2px solid;
          &._second {
            border-top: 0px;
          }
          &._last {
            border-bottom: 0px;
          }
          .opf-title {
            font-family: "Merriweather Sans", sans-serif;
            font-size: 16px;
            font-weight: 800;
            line-height: 28px;
            margin: 8px 0 32px;
            letter-spacing: 0em;
            text-align: left;
            color: #333;
            text-transform: uppercase;
          }
          .opf-desc {
            font-family: "Merriweather", serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 28px;
            letter-spacing: 0em;
            text-align: left;
            color: #333;
          }
          .opf-section-title-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .tooltip {
              text-align: -webkit-right;
              position: relative;
              i {
                z-index: 2;
              }
              .tp {
                position: absolute;
                background-color: white;
                color: #333;
                font-family: "Merriweather", serif;
                font-size: 12px;
                font-weight: 400;
                line-height: 21px;
                letter-spacing: 0em;
                text-align: left;
                border: 1px solid #3894d3;
                border-radius: 6px 14px 6px 6px;
                width: 300px;
                right: 0;
                padding: 10px 30px 10px 10px;
                top: 0px;
                z-index: 1;
                transition-duration: 0.3s;
                transition-timing-function: ease-in;
                &.show-tooltip {
                  opacity: 1;
                }
                &.hide-tooltip {
                  opacity: 0;
                }
              }
            }
          }
          .opf-section-title {
            font-family: "Merriweather Sans", sans-serif;
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
            letter-spacing: 0em;
            text-align: left;
            margin-bottom: 8px;
            color: #333;
            text-transform: capitalize;
            span {
              font-family: "Merriweather", serif;
              font-size: 16px;
              font-weight: 400;
              line-height: 28px;
              letter-spacing: 0em;
              text-align: left;
              color: #b3b3b3;
            }
          }
          .disclaimer {
            font-family: "Merriweather", serif;
            font-size: 12px;
            font-weight: 400;
            line-height: 21px;
            letter-spacing: 0em;
            text-align: left;
            color: #333;
          }
        }
      }
    }
  }
  .v-tooltip__content {
  }
}
</style>
