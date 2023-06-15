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
                  <validation-provider
                    rules="required"
                    v-slot="{ errors }"
                    name="document type"
                  >
                    <v-select
                      v-model="formData.document"
                      :items="formData.documents"
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
                      :error-messages="errors"
                      placeholder="- Please choose -"
                      outlined
                      required
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
                        v-model="person.secondNationality"
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
                    <validation-provider
                      rules="required"
                      v-slot="{ errors }"
                      name="document type"
                    >
                      <v-select
                        v-model="person.document"
                        :items="formData.documents"
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
                    <div class="opf-section-title">Floor number:</div>
                    <div class="opf-section-desc">
                      Remember in Europe that ground floor is 0.
                    </div>
                    <validation-provider v-slot="{ errors }" name="floor">
                      <v-text-field
                        v-model="formData.prevFloor"
                        :error-messages="errors"
                        outlined
                        type="number"
                        data-vv-name="floor"
                        step="any"
                        min="0"
                        ref="prevFloor"
                        :rules="[formData.floorRule]"
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
        genders: ["Male", "Female", "Other"],
        stageName: "",
        religion: null,
        religions: [
          "Roman Catholic",
          "Old Catholic",
          "Evangelical",
          "Evangelical-Lutheran",
          "Protestant Reformed",
          "Israelite religious communities (in Bavaria)",
          "None/other",
        ],
        date: "",
        birthPlace: "",
        abroadCountry: "",
        birthCountry: null,
        countries: [
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
          "Cabo Verde",
          "Cambodia",
          "Cameroon",
          "Canada",
          "Central African Republic",
          "Chad",
          "Chile",
          "China",
          "Colombia",
          "Comoros",
          "Congo, Democratic Republic of the",
          "Congo, Republic of the",
          "Costa Rica",
          "Croatia",
          "Cuba",
          "Cyprus",
          "Czech Republic",
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
          "Eswatini",
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
          "Korea, North",
          "Korea, South",
          "Kosovo",
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
          "North Macedonia",
          "Norway",
          "Oman",
          "Pakistan",
          "Palau",
          "Panama",
          "Papua New Guinea",
          "Paraguay",
          "Peru",
          "Philippines",
          "Poland",
          "Portugal",
          "Qatar",
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
          "Spain",
          "Sri Lanka",
          "Sudan",
          "Sudan, South",
          "Suriname",
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
          "United States",
          "Uruguay",
          "Uzbekistan",
          "Vanuatu",
          "Vatican City",
          "Venezuela",
          "Vietnam",
          "Yemen",
          "Zambia",
          "Zimbabwe",
        ],
        nationality: null,
        nationalities: [],
        nationalitiesGr: [
          "Afghane",
          "Albaner",
          "Algerier",
          "Amerikaner",
          "Andorraner",
          "Angolaner",
          "Antiguaner",
          "Argentinier",
          "Armenier",
          "Australier",
          "Österreicher",
          "Aserbaidschaner",
          "Bahamaer",
          "Bahrainer",
          "Bangladescher",
          "Barbadianer",
          "Weißrusse",
          "Belgier",
          "Belizeaner",
          "Beniner",
          "Bhutaner",
          "Bolivianer",
          "Bosnier",
          "Brasilianer",
          "Brite",
          "Bruneier",
          "Bulgare",
          "Burkinabe",
          "Burundier",
          "Kambodschaner",
          "Kameruner",
          "Kanadier",
          "Kap-Verdianer",
          "Zentralafrikaner",
          "Tschader",
          "Chilene",
          "Chinese",
          "Kolumbianer",
          "Komorer",
          "Kongolese",
          "Costa Ricaner",
          "Kroate",
          "Kubaner",
          "Zyprer",
          "Tscheche",
          "Däne",
          "Dschibutier",
          "Dominikaner",
          "Niederländer",
          "Osttimorese",
          "Ecuadorianer",
          "Ägypter",
          "Emirati",
          "Äquatorialguineer",
          "Eritreer",
          "Este",
          "Äthiopier",
          "Fidschianer",
          "Filipino",
          "Finne",
          "Franzose",
          "Gabuner",
          "Gambier",
          "Georgier",
          "Deutscher",
          "Ghanaer",
          "Grieche",
          "Grenadier",
          "Guatemalteke",
          "Guineer",
          "Guyaner",
          "Haitianer",
          "Honduraner",
          "Ungar",
          "Isländer",
          "Inder",
          "Indonesier",
          "Iraner",
          "Iraker",
          "Ire",
          "Israeli",
          "Italiener",
          "Ivorer",
          "Jamaikaner",
          "Japaner",
          "Jordanier",
          "Kasache",
          "Kenianer",
          "Kittianer und Nevisianer",
          "Kuwaiti",
          "Kirgise",
          "Laote",
          "Lette",
          "Libanese",
          "Liberianer",
          "Libyer",
          "Liechtensteiner",
          "Litauer",
          "Luxemburger",
          "Mazedonier",
          "Madagasse",
          "Malawier",
          "Malayer",
          "Maldivier",
          "Malier",
          "Maltese",
          "Marshallesischer",
          "Mauretanier",
          "Mauritianer",
          "Mexikaner",
          "Mikronesier",
          "Moldawier",
          "Monegasse",
          "Mongole",
          "Montenegriner",
          "Marokkaner",
          "Mosotho",
          "Motswana",
          "Mosambikaner",
          "Namibier",
          "Nauruer",
          "Nepalese",
          "Neuseeländer",
          "Nicaraguaner",
          "Nigerianer",
          "Nigerier",
          "Nordkoreaner",
          "Norweger",
          "Omaner",
          "Pakistani",
          "Palauer",
          "Panamani",
          "Papua-Neuguineer",
          "Paraguayer",
          "Peruaner",
          "Pole",
          "Portugiese",
          "Katarer",
          "Rumäne",
          "Russe",
          "Ruander",
          "Saint Lucianer",
          "Salvadorianer",
          "Samoaner",
          "San Marinese",
          "Sao Tomeaner",
          "Saudi",
          "Schotte",
          "Senegalese",
          "Serbe",
          "Seycheller",
          "Sierra Leoner",
          "Singapurer",
          "Slowake",
          "Slowene",
          "Salomonen-Insulaner",
          "Somalier",
          "Südafrikaner",
          "Südkoreaner",
          "Spanier",
          "Sri Lanker",
          "Sudanese",
          "Surinamer",
          "Swasi",
          "Schwede",
          "Schweizer",
          "Syrer",
          "Taiwanese",
          "Tadschike",
          "Tansanier",
          "Thailänder",
          "Togoer",
          "Tonganer",
          "Trinidadianer oder Tobagoner",
          "Tunesier",
          "Türke",
          "Turkmenen",
          "Tuvaluer",
          "Ugander",
          "Ukrainer",
          "Uruguayer",
          "Usbeke",
          "Venezolaner",
          "Vietnamese",
          "Waliser",
          "Jemenit",
          "Sambier",
          "Simbabwer",
        ],
        abroadCity: "",
        document: null,
        documents: ["Passport", "ID document", "Child’s passport"],
        validFrom: "",
        validTo: "",
        co: "",
        secondNationality: null,
        authorityName: "",
        placeName: "",
        serialNum: "",
        marital: null,
        maritalStatus: [
          "Married",
          "Single",
          "Civil partnership",
          "Widowed",
          "Civil partner deceased",
          "Divorced",
          "Civil partnership dissolved",
        ],
        maritalStatusGr: [
          "Verheiratet",
          "Einzel",
          "Lebenspartnerschaft",
          "Verwitwet",
          "Lebenspartner verstorben",
          "Geschieden",
          "Lebenspartnerschaft aufgelöst",
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
        prevFloor: 0,
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
        this.$refs.prevFloor.reset();
        this.$refs.movedOut.reset();
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
      link.download = "Anmeldung.pdf";
      link.click();
      if (response.data) {
        this.load = false;
      }
    },
  },
  mounted() {
    this.formData.countries.sort();
    this.formData.nationalities = this.formData.countries.sort();
  },
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>
