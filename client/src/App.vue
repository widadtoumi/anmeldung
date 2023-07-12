<template>
  <v-app>
    <v-main class="form">
      <div class="top-bar">
        <img src="@/assets/logo.svg" alt="" class="logo" srcset="" />
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
                  <div class="opf-section-title">Name:</div>
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
                  <div class="opf-section-title">Gender:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="gender"
                    rules="required"
                  >
                    <v-select
                      v-model="formData.gender"
                      :items="formData.genders"
                      item-text="text"
                      item-value="abbr"
                      :error-messages="errors"
                      label="- Please choose -"
                      outlined
                      data-vv-name="gender"
                      required
                    ></v-select>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Religion:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="religion"
                    rules="required"
                  >
                    <v-select
                      v-model="formData.religion"
                      :items="formData.religions"
                      item-text="text"
                      item-value="abbr"
                      content-class="religion-menu"
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
                  <DatePicker
                    :sentDate="formData.date"
                    @date-updated="formData.date = $event"
                    :invalid="invalid"
                    :name="`Birth date`"
                    :reference="`date`"
                  />
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
                          This must match the place of birth in your passport
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
                  <div class="opf-section-title">Country of birth:</div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Country of birth"
                    rules="required"
                  >
                    <v-select
                      v-model="formData.birthCountry"
                      :items="formData.countries"
                      item-text="text"
                      item-value="value"
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
                      :items="formData.countries"
                      item-text="text"
                      item-value="value"
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
                      :items="formData.countries"
                      item-text="text"
                      item-value="value"
                      :error-messages="errors"
                      label="- Please choose -"
                      outlined
                      data-vv-name="secondNationality"
                    ></v-select>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Document type:</div>
                  <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="document type"
                  >
                    <v-select
                      v-model="formData.document"
                      :items="formData.documents"
                      item-text="text"
                      item-value="abbr"
                      :error-messages="errors"
                      placeholder="- Please choose -"
                      required
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
                  <DatePicker
                    :sentDate="formData.validFrom"
                    @date-updated="formData.validFrom = $event"
                    :invalid="invalid"
                    :name="`Valid from`"
                    :reference="`validFrom`"
                  />
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">To:</div>
                  <DatePicker
                    :sentDate="formData.validTo"
                    @date-updated="formData.validTo = $event"
                    :invalid="invalid"
                    :name="`Valid to`"
                    :reference="`validTo`"
                  />
                </div>
                <div class="opf-content">
                  <div class="opf-section-title">Marital status:</div>
                  <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="marital"
                  >
                    <v-select
                      v-model="formData.marital"
                      :items="formData.maritalStatus"
                      item-text="text"
                      item-value="abbr"
                      :error-messages="errors"
                      placeholder="- Please choose -"
                      outlined
                      required
                      data-vv-name="marital"
                    ></v-select>
                  </validation-provider>
                </div>
                <div
                  v-if="formData.marital == 'VH'"
                  class="opf-content__marital-cac"
                >
                  <div class="opf-content">
                    <div class="opf-section-title">
                      Date of marriage/partnership:
                    </div>
                    <DatePicker
                      :sentDate="formData.marriedFrom"
                      @date-updated="formData.marriedFrom = $event"
                      :invalid="invalid"
                      :name="`Married from`"
                      :reference="`marriedFrom`"
                    />
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
                        item-text="text"
                        item-value="value"
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
                    This person must be related to {{ formData.firstName }}. If
                    they’re not, you should use a new form.
                  </div>
                </div>
                <div class="opf-content">
                  <div class="opf-content">
                    <div class="opf-section-title">Name:</div>
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
                    <div class="opf-section-title">Gender:</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="gender"
                      rules="required"
                    >
                      <v-select
                        v-model="person.Gender"
                        :items="formData.genders"
                        item-text="text"
                        item-value="abbr"
                        :error-messages="errors"
                        label="- Please choose -"
                        outlined
                        data-vv-name="gender"
                        required
                      ></v-select>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">Religion:</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="religion"
                      rules="required"
                    >
                      <v-select
                        v-model="person.Religion"
                        :items="formData.religions"
                        item-text="text"
                        item-value="abbr"
                        content-class="religion-menu"
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
                            If this person used a previous surname, write it
                            here
                          </div>
                        </div>
                      </v-hover>
                    </div>
                    <validation-provider v-slot="{ errors }" name="stage name">
                      <v-text-field
                        v-model="person.stageName"
                        :error-messages="errors"
                        outlined
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">Date of birth:</div>
                    <DatePicker
                      :sentDate="person.birthDate"
                      @date-updated="person.birthDate = $event"
                      :invalid="invalid"
                      :name="`Birth Date`"
                      :reference="`birthDate`"
                    />
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title-wrap">
                      <div class="opf-section-title">
                        Place of birth:
                        <span>
                          (town or city and state, where appropriate)
                        </span>
                      </div>
                      <v-hover v-slot="{ hover }" open-delay="200">
                        <div class="tooltip">
                          <v-icon color="#3894D3"> mdi-information </v-icon>
                          <div
                            class="tp"
                            :class="hover ? 'show-tooltip' : 'hide-tooltip'"
                          >
                            This must match the place of birth in their passport
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
                        v-model="person.birthPlace"
                        :error-messages="errors"
                        outlined
                        required
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">Country of birth:</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="country of birth"
                      rules="required"
                    >
                      <v-select
                        v-model="person.birthCountry"
                        :items="formData.countries"
                        item-text="text"
                        item-value="value"
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
                        v-model="person.nationality"
                        :items="formData.countries"
                        item-text="text"
                        item-value="value"
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
                        v-model="person.secondNationality"
                        :items="formData.countries"
                        item-text="text"
                        item-value="value"
                        :error-messages="errors"
                        label="- Please choose -"
                        outlined
                        data-vv-name="secondNationality"
                      ></v-select>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">Document type:</div>
                    <validation-provider
                      rules="required"
                      v-slot="{ errors }"
                      name="document type"
                    >
                      <v-select
                        v-model="person.document"
                        :items="formData.documents"
                        item-text="text"
                        item-value="abbr"
                        :error-messages="errors"
                        placeholder="- Please choose -"
                        required
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
                        v-model="person.authorityName"
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
                        v-model="person.placeName"
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
                        v-model="person.serialNum"
                        :error-messages="errors"
                        outlined
                        required
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">Valid from:</div>
                    <DatePicker
                      :sentDate="person.validFrom"
                      @date-updated="person.validFrom = $event"
                      :invalid="invalid"
                      :name="`Valid from`"
                      :reference="`validFrom`"
                    />
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">To:</div>
                    <DatePicker
                      :sentDate="person.validTo"
                      @date-updated="person.validTo = $event"
                      :invalid="invalid"
                      :name="`Valid to`"
                      :reference="`validTo`"
                    />
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
                  <DatePicker
                    :sentDate="formData.moved"
                    @date-updated="formData.moved = $event"
                    :invalid="invalid"
                    :name="`Moving date`"
                    :reference="`movingDate`"
                  />
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
                    <div class="opf-section-title">
                      c/o or any additional address information:
                    </div>
                  </div>
                  <validation-provider
                    v-slot="{ errors }"
                    name="c/o or any additional address information"
                  >
                    <v-text-field
                      v-model="formData.co"
                      :error-messages="errors"
                      outlined
                    ></v-text-field>
                  </validation-provider>
                </div>
                <div class="opf-content">
                  <div class="opf-section-title-wrap">
                    <div class="opf-section-title">Postal code:</div>
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
                <div v-if="formData.moveToGermany === 2">
                  <div class="opf-content">
                    <div class="opf-section-title">
                      Was the previous apartment:
                    </div>
                    <validation-provider
                      v-slot="{ errors }"
                      rules="required"
                      name="this field"
                      immediate
                    >
                      <v-radio-group
                        :error-messages="errors"
                        v-model="formData.keepingPrvAprt"
                        ref="keepingPrvAprt"
                      >
                        <v-radio
                          v-for="(
                            apartment, index
                          ) in formData.keepingPrvAprtOp"
                          :key="index"
                          :label="apartment.name"
                          :value="apartment.id"
                        ></v-radio>
                      </v-radio-group>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title-wrap">
                      <div class="opf-section-title">
                        Street name and number:
                      </div>
                    </div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="the address"
                      rules="required"
                    >
                      <v-text-field
                        v-model="formData.prevAddress"
                        :error-messages="errors"
                        outlined
                        ref="prevAddress"
                        required
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title-wrap">
                      <div class="opf-section-title">Post code:</div>
                    </div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="post code"
                      rules="required"
                    >
                      <v-text-field
                        v-model="formData.prevPostCode"
                        :error-messages="errors"
                        outlined
                        required
                        ref="prevPostCode"
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title-wrap">
                      <div class="opf-section-title">City:</div>
                    </div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="post code"
                      rules="required"
                    >
                      <v-text-field
                        v-model="formData.prevCity"
                        :error-messages="errors"
                        outlined
                        required
                        ref="prevCity"
                      ></v-text-field>
                    </validation-provider>
                  </div>
                 
                  <div class="opf-content">
                    <div class="opf-section-title">When did you move out:</div>
                    <DatePicker
                      :sentDate="formData.movedOut"
                      @date-updated="formData.movedOut = $event"
                      :invalid="invalid"
                      :name="`Moving out date`"
                      :reference="`movingOutDate`"
                    />
                  </div>
                </div>
                <div v-else>
                  <div class="opf-content">
                    <div class="opf-section-title-wrap">
                      <div class="opf-section-title">
                        From which city and country did you move?
                      </div>
                    </div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="city"
                      rules="required"
                    >
                      <v-text-field
                        v-model="formData.abroadCity"
                        :error-messages="errors"
                        outlined
                        ref="abroadCity"
                        required
                      ></v-text-field>
                    </validation-provider>
                  </div>
                  <div class="opf-content">
                    <div class="opf-section-title">Country:</div>
                    <validation-provider
                      v-slot="{ errors }"
                      name="country"
                      rules="required"
                    >
                      <v-select
                        v-model="formData.abroadCountry"
                        :items="formData.countries"
                        item-text="text"
                        item-value="value"
                        :error-messages="errors"
                        label="- Please choose -"
                        ref="abroadCountry"
                        outlined
                        data-vv-name="country"
                        required
                      ></v-select>
                    </validation-provider>
                  </div>
                </div>
                <div class="opf-content">
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
              <div class="d-flex align-center">
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
                  <v-progress-circular
                    class="mx-auto"
                    v-if="load"
                    :indeterminate="load == true"
                    color="white"
                    style="min-width: 50px"
                  ></v-progress-circular>
                  <div class="finish-btn" v-if="load == false">
                    Finish and Download
                  </div>
                </v-btn>
              </div>
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
import DatePicker from "@/components/DatePicker.vue";
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
    DatePicker,
  },
  name: "FormView",
  data() {
    return {
      load: false,
      formData: {
        firstName: "",
        lastName: "",
        maidenName: "",
        gender: null,
        genders: [
          { text: "Male", abbr: "M" },
          { text: "Female", abbr: "W" },
          { text: "Other", abbr: "X" },
        ],
        stageName: "",
        religion: null,
        religions: [
          { text: "Roman Catholic", abbr: "rk" },
          { text: "Old Catholic", abbr: "ak" },
          { text: "Evangelical", abbr: "ev" },
          { text: "Evangelical-Lutheran", abbr: "It" },
          { text: "Protestant Reformed", abbr: "rf" },
          {
            text: "Israelite religious communities (in Bavaria)",
            abbr: "isby",
          },
          { text: "None/other", abbr: "oa" },
        ],
        date: "",
        birthPlace: "",
        abroadCountry: "",
        birthCountry: null,
        countries: [
          { value: "Afghanistan", text: "Afghanistan" },
          { value: "Albanien", text: "Albania" },
          { value: "Algerien", text: "Algeria" },
          { value: "Andorra", text: "Andorra" },
          { value: "Angola", text: "Angola" },
          { value: "Antigua und Barbuda", text: "Antigua and Barbuda" },
          { value: "Argentinien", text: "Argentina" },
          { value: "Armenien", text: "Armenia" },
          { value: "Australien", text: "Australia" },
          { value: "Österreich", text: "Austria" },
          { value: "Aserbaidschan", text: "Azerbaijan" },
          { value: "Bahamas", text: "Bahamas" },
          { value: "Bahrain", text: "Bahrain" },
          { value: "Bangladesch", text: "Bangladesh" },
          { value: "Barbados", text: "Barbados" },
          { value: "Weißrussland", text: "Belarus" },
          { value: "Belgien", text: "Belgium" },
          { value: "Belize", text: "Belize" },
          { value: "Benin", text: "Benin" },
          { value: "Bhutan", text: "Bhutan" },
          { value: "Bolivien", text: "Bolivia" },
          { value: "Bosnien und Herzegowina", text: "Bosnia and Herzegovina" },
          { value: "Botswana", text: "Botswana" },
          { value: "Brasilien", text: "Brazil" },
          { value: "Brunei", text: "Brunei" },
          { value: "Bulgarien", text: "Bulgaria" },
          { value: "Burkina Faso", text: "Burkina Faso" },
          { value: "Burundi", text: "Burundi" },
          { value: "Kambodscha", text: "Cambodia" },
          { value: "Kamerun", text: "Cameroon" },
          { value: "Kanada", text: "Canada" },
          { value: "Kap Verde", text: "Cape Verde" },
          {
            value: "Zentralafrikanische Republik",
            text: "Central African Republic",
          },
          { value: "Tschad", text: "Chad" },
          { value: "Chile", text: "Chile" },
          { value: "China", text: "China" },
          { value: "Kolumbien", text: "Colombia" },
          { value: "Komoren", text: "Comoros" },
          { value: "Costa Rica", text: "Costa Rica" },
          { value: "Elfenbeinküste", text: "Côte d’Ivoire" },
          { value: "Kroatien", text: "Croatia" },
          { value: "Kuba", text: "Cuba" },
          { value: "Zypern", text: "Cyprus" },
          { value: "Tschechien", text: "Czech Republic" },
          {
            value: "Demokratische Republik Kongo",
            text: "Democratic Republic of the Congo",
          },
          { value: "Dänemark", text: "Denmark" },
          { value: "Dschibuti", text: "Djibouti" },
          { value: "Dominica", text: "Dominica" },
          { value: "Dominikanische Republik", text: "Dominican Republic" },
          { value: "Osttimor", text: "East Timor" },
          { value: "Ecuador", text: "Ecuador" },
          { value: "Ägypten", text: "Egypt" },
          { value: "El Salvador", text: "El Salvador" },
          { value: "Äquatorialguinea", text: "Equatorial Guinea" },
          { value: "Eritrea", text: "Eritrea" },
          { value: "Estland", text: "Estonia" },
          { value: "Äthiopien", text: "Ethiopia" },
          { value: "Fidschi", text: "Fiji" },
          { value: "Finnland", text: "Finland" },
          { value: "Frankreich", text: "France" },
          { value: "Gabun", text: "Gabon" },
          { value: "Gambia", text: "Gambia" },
          { value: "Georgia", text: "Georgia" },
          { value: "Deutschland", text: "Germany" },
          { value: "Ghana", text: "Ghana" },
          { value: "Griechenland", text: "Greece" },
          { value: "Grenada", text: "Grenada" },
          { value: "Guatemala", text: "Guatemala" },
          { value: "Guinea", text: "Guinea" },
          { value: "Guinea-Bissau", text: "Guinea-Bissau" },
          { value: "Guyana", text: "Guyana" },
          { value: "Haiti", text: "Haiti" },
          { value: "Honduras", text: "Honduras" },
          { value: "Ungarn", text: "Hungary" },
          { value: "Island", text: "Iceland" },
          { value: "Indien", text: "India" },
          { value: "Indonesien", text: "Indonesia" },
          { value: "Iran", text: "Iran" },
          { value: "Irak", text: "Iraq" },
          { value: "Irland", text: "Ireland" },
          { value: "Israel", text: "Israel" },
          { value: "Italien", text: "Italy" },
          { value: "Jamaika", text: "Jamaica" },
          { value: "Japan", text: "Japan" },
          { value: "Jordan", text: "Jordan" },
          { value: "Kasachstan", text: "Kazakhstan" },
          { value: "Kenia", text: "Kenya" },
          { value: "Kiribati", text: "Kiribati" },
          { value: "Kuwait", text: "Kuwait" },
          { value: "Kirgisistan", text: "Kyrgyzstan" },
          { value: "Laos", text: "Laos" },
          { value: "Lettland", text: "Latvia" },
          { value: "Libanon", text: "Lebanon" },
          { value: "Lesotho", text: "Lesotho" },
          { value: "Liberia", text: "Liberia" },
          { value: "Libyen", text: "Libya" },
          { value: "Liechtenstein", text: "Liechtenstein" },
          { value: "Litauen", text: "Lithuania" },
          { value: "Luxemburg", text: "Luxembourg" },
          { value: "Madagaskar", text: "Madagascar" },
          { value: "Malawi", text: "Malawi" },
          { value: "Malaysia", text: "Malaysia" },
          { value: "Malediven", text: "Maldives" },
          { value: "Mali", text: "Mali" },
          { value: "Malta", text: "Malta" },
          { value: "Marshallinseln", text: "Marshall Islands" },
          { value: "Mauretanien", text: "Mauritania" },
          { value: "Mauritius", text: "Mauritius" },
          { value: "Mexiko", text: "Mexico" },
          { value: "Mikronesien", text: "Micronesia" },
          { value: "Moldawien", text: "Moldova" },
          { value: "Monaco", text: "Monaco" },
          { value: "Mongolei", text: "Mongolia" },
          { value: "Montenegro", text: "Montenegro" },
          { value: "Marokko", text: "Morocco" },
          { value: "Mosambik", text: "Mozambique" },
          { value: "Myanmar", text: "Myanmar" },
          { value: "Namibia", text: "Namibia" },
          { value: "Nauru", text: "Nauru" },
          { value: "Nepal", text: "Nepal" },
          { value: "Niederlande", text: "Netherlands" },
          { value: "Neuseeland", text: "New Zealand" },
          { value: "Nicaragua", text: "Nicaragua" },
          { value: "Niger", text: "Niger" },
          { value: "Nigeria", text: "Nigeria" },
          { value: "Nordkorea", text: "North Korea" },
          { value: "Norwegen", text: "Norway" },
          { value: "Oman", text: "Oman" },
          { value: "Pakistan", text: "Pakistan" },
          { value: "Palau", text: "Palau" },
          { value: "Palästina", text: "Palestine" },
          { value: "Panama", text: "Panama" },
          { value: "Papua-Neuguinea", text: "Papua New Guinea" },
          { value: "Paraguay", text: "Paraguay" },
          { value: "Peru", text: "Peru" },
          { value: "Philippinen", text: "Philippines" },
          { value: "Polen", text: "Poland" },
          { value: "Portugal", text: "Portugal" },
          { value: "Katar", text: "Qatar" },
          { value: "Republik Kongo", text: "Republic of the Congo" },
          { value: "Mazedonien", text: "Republic of Macedonia" },
          { value: "Rumänien", text: "Romania" },
          { value: "Russland", text: "Russia" },
          { value: "Ruanda", text: "Rwanda" },
          { value: "St. Kitts und Nevis", text: "Saint Kitts and Nevis" },
          { value: "St. Lucia", text: "Saint Lucia" },
          {
            value: "St. Vincent und die Grenadinen",
            text: "Saint Vincent and the Grenadines",
          },
          { value: "Samoa", text: "Samoa" },
          { value: "San Marino", text: "San Marino" },
          { value: "São Tomé und Príncipe", text: "Sao Tome and Principe" },
          { value: "Saudi-Arabien", text: "Saudi Arabia" },
          { value: "Senegal", text: "Senegal" },
          { value: "Serbien", text: "Serbia" },
          { value: "Seychellen", text: "Seychelles" },
          { value: "Sierra Leone", text: "Sierra Leone" },
          { value: "Singapur", text: "Singapore" },
          { value: "Slowakei", text: "Slovakia" },
          { value: "Slowenien", text: "Slovenia" },
          { value: "Salomonen", text: "Solomon Islands" },
          { value: "Somalia", text: "Somalia" },
          { value: "Südafrika", text: "South Africa" },
          { value: "Südkorea", text: "South Korea" },
          { value: "Südsudan", text: "South Sudan" },
          { value: "Spanien", text: "Spain" },
          { value: "Sri Lanka", text: "Sri Lanka" },
          { value: "Sudan", text: "Sudan" },
          { value: "Suriname", text: "Suriname" },
          { value: "Swasiland", text: "Swaziland" },
          { value: "Schweden", text: "Sweden" },
          { value: "Schweiz", text: "Switzerland" },
          { value: "Syrien", text: "Syria" },
          { value: "Taiwan", text: "Taiwan" },
          { value: "Tadschikistan", text: "Tajikistan" },
          { value: "Tansania", text: "Tanzania" },
          { value: "Thailand", text: "Thailand" },
          { value: "Togo", text: "Togo" },
          { value: "Tonga", text: "Tonga" },
          { value: "Trinidad und Tobago", text: "Trinidad and Tobago" },
          { value: "Tunesien", text: "Tunisia" },
          { value: "Türkei", text: "Turkey" },
          { value: "Turkmenistan", text: "Turkmenistan" },
          { value: "Tuvalu", text: "Tuvalu" },
          { value: "Uganda", text: "Uganda" },
          { value: "Ukraine", text: "Ukraine" },
          {
            value: "Vereinigte Arabische Emirate",
            text: "United Arab Emirates",
          },
          { value: "Vereinigtes Königreich", text: "United Kingdom" },
          { value: "Vereinigte Staaten", text: "United States of America" },
          { value: "Uruguay", text: "Uruguay" },
          { value: "Usbekistan", text: "Uzbekistan" },
          { value: "Vanuatu", text: "Vanuatu" },
          { value: "Venezuela", text: "Venezuela" },
          { value: "Vietnam", text: "Vietnam" },
          { value: "Jemen", text: "Yemen" },
          { value: "Sambia", text: "Zambia" },
          { value: "Simbabwe", text: "Zimbabwe" },
        ],
        nationality: null,
        nationalities: [],
        abroadCity: "",
        document: null,
        documents: [
          { text: "Passport", abbr: "RP" },
          { text: "ID document", abbr: "PA" },
          { text: "Child’s passport", abbr: "KP" },
        ],
        validFrom: "",
        validTo: "",
        co: "",
        secondNationality: null,
        authorityName: "",
        placeName: "",
        serialNum: "",
        marital: null,
        maritalStatus: [
          { abbr: "VH", text: "Married" },
          { abbr: "LD", text: "Single" },
          { abbr: "LP", text: "Civil partnership" },
          { abbr: "VW", text: "Widowed" },
          { abbr: "LV", text: "Civil partner deceased" },
          { abbr: "GS", text: "Divorced" },
          { abbr: "LA", text: "Civil partnership dissolved" },
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
        prevAddress: "",
        postCode: "",
        prevPostCode: "",
        prevCity: "",
        moved: "",
        movedOut: "",
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
            abr: "Li",
          },
          {
            id: 2,
            name: "In the middle",
            abr: "Mi",
          },
          {
            id: 3,
            name: "On the right",
            abr: "Re",
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
        keepingPrvAprt: 1,
        keepingPrvAprtOp: [
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
        havApart: 2,
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
    };
  },

  computed: {
    moveToGermany() {
      return this.formData.moveToGermany;
    },
  },

  watch: {
    moveToGermany() {
      if (this.formData.moveToGermany === 2) {
        this.$refs.abroadCity.reset();
        this.$refs.abroadCountry.reset();
      } else {
        this.$refs.keepingPrvAprt = 1;
        this.$refs.prevAddress.reset();
        this.$refs.prevPostCode.reset();
        this.$refs.prevCity.reset();
        this.$refs.movingOutDate.reset();
      }
    },
  },

  methods: {
    validateDate() {
      this.$refs.observer.validate();
    },
    addPerson() {
      this.formData.people.push({
        FirstName: "",
        LastName: "",
        MaidenName: "",
        Gender: null,
        Religion: null,
        stageName: "",
        birthDate: "",
        birthPlace: "",
        birthCountry: "",
        nationality: "",
        secondNationality: "",
        document: "",
        authorityName: "",
        placeName: "",
        serialNum: "",
        validFrom: "",
        validTo: "",
      });
    },
    removePerson(index) {
      this.formData.people.splice(index, 1);
    },
    async submitForm() {
      this.load = true;
      const response = await axios.post(
        "https://anmeldung-9wys.onrender.com/generate-pdf",
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
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = this.formData.lastName + " Anmeldung application.pdf";
      link.click();
      if (response.data) {
        this.load = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
