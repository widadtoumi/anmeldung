const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
const port = 3000;

const allowedOrigins = [
  "https://anmeldung.netlify.app/",
  "https://anmeldung.netlify.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/generate-pdf", async (req, res) => {
  const { formData } = req.body;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlTemplate = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      padding: 17px;
    }

    .registration-form {
      margin: 50px;
      position: relative;
    }

    /* header style  */
    .registration-form .header_wrap {
      border: 1px solid black;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: fit-content;
      height: 40px;
      position: relative;
    }

    .registration-form .header_wrap .header_fst_section {
      border-right: 1px solid black;
      width: 20%;
      height: calc(100% - 8px);
      font-size: 9px;
      font-weight: 400;
      padding: 4px;
    }

    .registration-form .header_wrap .header_snd_section {
      border-right: 1px solid black;
      width: 20%;
      height: calc(100% - 8px);
      font-size: 9px;
      font-weight: 400;
      padding: 4px;
    }

    .registration-form .header_wrap .header_thr_section {
      border-right: 1px solid black;
      width: 20%;
      height: calc(100% - 8px);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      line-height: 1;
      padding: 4px;
    }

    .registration-form .header_wrap .header_frt_section {
      width: 40%;
      height: calc(100% - 8px);
      padding: 4px;
    }

    /* body style  */
    .body_wrap {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 5px;
    }

    /* ========= first section ========= */
    .body_wrap .body__fst__section {}

    /* Neue Wohnung / Bisherige Wohnung  */
    .body_wrap .body__fst__section .bfs__header {
      display: flex;
      align-items: center;
      justify-content: stretch;
      width: 100%;
    }

    .body_wrap .body__fst__section .bfs__header .bfsh__col {
      flex: 1;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.6;
    }

    .body_wrap .body__fst__section .bfs__header .bfsh__col.neue {
      border-right: 1px solid;
    }

    /* Gemeindekennzahl */
    .body_wrap .body__fst__section .bfs__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .body_wrap .body__fst__section .bfs__title .bfst__col {
      flex: 1;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.6;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
    }

    .body_wrap .body__fst__section .bfs__title .bfst__col:nth-child(1) {
      border-right: 1px solid black;
      border-left: 2px solid black;
    }

    .body_wrap .body__fst__section .bfs__title .bfst__col:nth-child(2) {
      border-right: 2px solid black;
      border-left: 1px solid black;
    }

    /* Die neue Wohnung ist  */
    .body_wrap .body__fst__section .bfs__body {}

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
    }

    /* first section left/right cols  */
    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols .bfsc__col {
      flex: 1;
      border-right: 1px solid;
      border-left: 1px solid;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols .bfsc__col .bfsc__col__checkboxes {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: space-between;
      padding: 6px;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols .bfsc__col .bfsc__col__checkboxes .bfsc__title {
      font-size: 8px;
      font-weight: 600;
      white-space: nowrap;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols .bfsc__col .bfsc__col__checkboxes .bfsc__checkbox {
      display: flex;
      align-items: flex-start;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols .bfsc__col .bfsc__col__checkboxes .bfsc__checkbox input {}

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols .bfsc__col .bfsc__col__checkboxes .bfsc__checkbox label {
      font-weight: 600;
      font-size: 8px;
      max-width: min-content;
    }

    .body_wrap table {
      border-spacing: 0;
      width: 100%;
      table-layout: fixed;
    }

    .checkboxes__wrap {
      display: flex;
    }

    .divider {
      width: 0px;
      border-right: 1px solid;
    }

    .body_wrap table thead {}

    .body_wrap table tr {
      font-size: 9px;
    }

    .body_wrap table thead th {
      border: 1px solid;
      font-weight: 400;
      text-align: left;
      font-size: 9px;
    }

    .body_wrap table tbody td {
      height: 14px;
      border: 1px solid;
      word-wrap: break-word;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols .bfsc__col .tag__des__auszugs {
      display: flex;
    }

    .bfsc__col__checkboxes {
      display: flex;
      flex: 1;
    }

    .bfsc__Hausnummer__wrap {
      display: flex;
    }

    .bfsc__row__note {
      font-weight: 600;
      font-size: 8px;
      max-width: min-content;
      white-space: nowrap;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols .bfsc__col .date__zip__table {}

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__cols .bfsc__col .adress__table {}

    /* first section state abroad table */
    .body_wrap .body__fst__section .bfs__body .state_abroad__table {}

    .body_wrap .body__fst__section .bfs__body .state_abroad__table .sat_fst_header {
      width: 70%;
    }

    .body_wrap .body__fst__section .bfs__body .state_abroad__table table {
      border-spacing: 0;
      width: 100%;
    }

    .body_wrap .body__fst__section .bfs__body .state_abroad__table table thead {}

    .body_wrap .body__fst__section .bfs__body .state_abroad__table table tr {
      min-height: 30px;
      height: 30px;
    }

    .body_wrap .body__fst__section .bfs__body .state_abroad__table table thead th.sat_fst_header {
      border: 1px solid;
    }

    .body_wrap .body__fst__section .bfs__body .state_abroad__table table tbody td {
      border: 1px solid;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__rows {}

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__rows .bfsc__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 7px;
      font-weight: 600;
      border: 1px solid;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__rows .bfsc__row .bfsc__row__title {
      font-size: 8px;
      font-weight: 600;
      max-width: 30%;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__rows .bfsc__row .bfsc__row__checkbox {
      display: flex;
      align-items: center;
      white-space: nowrap;
    }

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__rows .bfsc__row .bfsc__row__checkbox input {}

    .body_wrap .body__fst__section .bfs__body .bfs__checkbox__rows .bfsc__row .bfsc__row__checkbox label {
      font-weight: 600;
      font-size: 8px;
      max-width: min-content;
    }

    /* ========= second section ========= */
    .body_wrap .body__snd__section {}

    .body_wrap .body__snd__section .bs__fst_table {}

    .body_wrap .body__snd__section table {
      margin-bottom: 5px;
    }

    .body_wrap .body__snd__section table th {
      border-top: 3px solid;
    }

    .body_wrap .body__snd__section .bs__fst_table th {
      width: 90%;
    }

    .body_wrap .body__snd__section th.bsft__fam-header-num {
      width: 3%;
      text-align: center;
      font-weight: 600;
      font-size: 14px;
    }

    .body_wrap .body__snd__section .bs__snd_table th {
      padding: 0;
    }

    .body_wrap .body__snd__section th.bsft__fam-header-title {
      font-size: 10px;
      line-height: 1.5;
      width: 20%;
      padding: 3px;
    }

    .body_wrap .body__snd__section .bs__snd_table {}



    .body_wrap .body__snd__section .bs__snd_table .bsft__fht_famist__wrap {
      vertical-align: text-top;
      font-size: 16px;
      width: 90%;
    }

    .body_wrap .body__snd__section .bs__snd_table .bsft__fht_famist__wrap .bsft__fht_famist {
      border-bottom: 1px solid;
      font-size: 8px;
      font-weight: 400;
      height: 20%;
    }

    .body_wrap .body__snd__section .bs__snd_table .bsft__fht_famist__wrap .bsft__fht {
      height: 80%;
      font-size: 9px;
    }


    .body_wrap .body__snd__section .bs__third_table {}



    /* ========= third section ========= */
    .body_wrap .body__thr__section {
      border-top: 2px solid;
    }

    /* Table: Dokumente  */
    .body_wrap .body__thr__section .bt__fst_table {}

    .body_wrap .body__thr__section .bt__fst_table .document__title {
      font-weight: 600;
      font-size: 10px;
    }

    .body_wrap .body__thr__section .bt__fst_table .document__subtitle {}

    .body_wrap .body__thr__section .bt__fst_table .document__fullname {
      font-weight: 600;
      font-size: 10px;
    }

    .body_wrap .body__thr__section .table-divider {
      height: 5px;
      border-left: 1px solid;
      border-right: 1px solid;
    }

    .body_wrap .body__thr__section .bt__snd_table {}

    .body_wrap .body__thr__section .bt__snd_table .document__fullname {
      font-weight: 600;
      font-size: 10px;
    }



    /* signature section  */
    .body_wrap .body__signature_section {
      border: 1px solid;
      border-top: 3px solid;
      display: flex;
      flex-direction: column;
      width: 56%;
      max-width: 56%;
      margin-left: auto;
    }

    .body_wrap .body__signature_section .bss__header {
      border-bottom: 1px solid;
      padding: 3px;
      font-weight: 600;
      font-size: 9px;
    }

    .body_wrap .body__signature_section .bss__body {
      min-height: 50px;
    }
  </style>
</head>

<body>
  <div class="registration-form">
    <div class="header_wrap">
      <div class="header_fst_section">Tagesstempel</div>
      <div class="header_snd_section">Amtl. Vermerke</div>
      <div class="header_thr_section">Anmeldung</div>
      <div class="header_frt_section"></div>
    </div>
    <div class="body_wrap">
      <div class="body__fst__section">
        <div class="bfs__header">
          <div class="bfsh__col neue">Neue Wohnung</div>
          <div class="bfsh__col">Bisherige Wohnung</div>
        </div>
        <div class="bfs__title">
          <div class="bfst__col">Gemeindekennzahl</div>
          <div class="bfst__col">Gemeindekennzahl</div>
        </div>
        <div class="bfs__body">
          <div class="bfs__checkbox__cols">
            <div class="bfsc__col">
              <div class="checkboxes__wrap">
                <div class="bfsc__col__checkboxes">
                  <div class="bfsc__title">Die neue Wohnung ist</div>
                  <div class="bfsc__checkbox">
                    <input type="checkbox" style="accent-color: black;" id="sole" name="sole"
                      value="${formData.apartmentNum}" ${
    formData.apartmentNum === 1 ? "checked" : ""
  }>
                    <label for="sole">alleinige Wohnung</label>
                  </div>
                  <div class="bfsc__checkbox">
                    <input type="checkbox" style="accent-color: black;" id="main" name="main"
                      value="${formData.apartmentNum}" ${
    formData.apartmentNum === 2 ? "checked" : ""
  }>
                    <label for="main">Haupt-wohnung</label>
                  </div>
                  <div class="bfsc__checkbox">
                    <input type="checkbox" style="accent-color: black;" id="secondary" name="secondary"
                      value="${formData.apartmentNum}" ${
    formData.apartmentNum === 3 ? "checked" : ""
  }>
                    <label for="secondary">Neben-wohnung</label>
                  </div>
                </div>
                <div class="divider"></div>
                <div class="bfsc__col__checkboxes">
                  <div class="bfsc__title">Die (letzte) bisherige Wohnung <br> (im Inland) war</div>
                  <div class="bfsc__checkbox">
                    <input type="checkbox" style="accent-color: black;" id="sole" name="sole" value="sole">
                    <label for="sole">alleinige Wohnung</label>
                  </div>
                  <div class="bfsc__checkbox">
                    <input type="checkbox" style="accent-color: black;" id="main" name="main" value="main">
                    <label for="main">Haupt-wohnung</label>
                  </div>
                  <div class="bfsc__checkbox">
                    <input type="checkbox" style="accent-color: black;" id="secondary" name="secondary"
                      value="secondary">
                    <label for="secondary">Neben-wohnung</label>
                  </div>
                </div>
              </div>
              <!-- Table: Tag des Einzugs / Postleitzahl, Gemeinde, Ortsteil -->
              <div class="tag__des__auszugs">
                <table>
                  <thead class="date__zip__table">
                    <tr>
                      <th style="border-right: 0px; border-left: 0px">Tag des Einzugs</th>
                      <th style="border-right: 0px;">Postleitzahl, Gemeinde, Ortsteil</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="border: 0px;">${formData.moved}</td>
                      <td style="border: 0px; border-left: 1px solid;">${
                        formData.postCode
                      }</td>
                    </tr>
                  </tbody>
                </table>
                <div class="divider"></div>
                <!-- Table: Tag des Auszugs / Postleitzahl, Gemeinde/Kreis/Land -->

                <table>
                  <thead class="date__zip__table">
                    <tr>
                      <th style="border-right: 0px; border-left: 0px">Tag des Einzugs</th>
                      <th style="border-right: 0px;">Postleitzahl, Gemeinde, Ortsteil</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="border: 0px;"></td>
                      <td style="border: 0px; border-left: 1px solid;"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Table: Straße, Hausnummer, Zusätze -->
              <div class="bfsc__Hausnummer__wrap">
                <table class="adress__table">
                  <thead>
                    <tr>
                      <th style="border-right: 0px; border-left: 0px;">Straße, Hausnummer, Zusätze</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="border: 0px;">
                        ${formData.postCode}, ${formData.floor},
                        ${formData.city}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="divider"></div>
                <!-- Table: Straße, Hausnummer, Zusätze -->
                <table class="adress__table">
                  <thead>
                    <tr>
                      <th style="border-left: 0px; border-right: 0px;">Straße, Hausnummer, Zusätze</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="border: 0px;"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

          </div>
          <!-- Table: Bei Zuzug aus dem Ausland Staat -->
          <table class="state_abroad__table">
            <thead>
              <tr>
                <th class="sat_fst_header"></th>
                <th style="border-left: 0;">Bei Zuzug aus dem Ausland Staat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border-top: 0;
                  border-bottom: 0;"></td>
                <td style="border-top: 0;
                border-bottom: 0; border-left: 0;"></td>
              </tr>
            </tbody>
          </table>
          <div class="bfs__checkbox__rows">
            <div class="bfsc__row">
              <div class="bfsc__row__title">Wird die bisherige Wohnung beibehalten?</div>
              <div class="bfsc__row__checkbox">
                <input type="checkbox" style="accent-color: black;" id="no" name="no" value="${
                  formData.previousApart
                }"
                  ${formData.previousApart === 1 ? "checked" : ""}>
                <label for="no">Nein</label>
              </div>
              <div class="bfsc__row__checkbox">
                <input type="checkbox" style="accent-color: black;" id="yes" name="yes" value="yes">
                <label for="yes">Ja, und zwar als</label>
              </div>
              <div class="bfsc__row__checkbox">
                <input type="checkbox" style="accent-color: black;" id="main" name="main"
                  value="${formData.previousApart}" ${
    formData.previousApart === 2 ? "checked" : ""
  }>
                <label for="main">Haupt-wohnung</label>
              </div>
              <div class="bfsc__row__checkbox">
                <input type="checkbox" style="accent-color: black;" id="secondary" name="secondary"
                  value="${formData.previousApart}" ${
    formData.previousApart === 3 ? "checked" : ""
  }>
                <label for="secondary">Neben-wohnung</label>
              </div>
            </div>
            <div class="bfsc__row" style="border-top: 0;">
              <div class="bfsc__row__title">Haben die unten aufgeführten Personen noch weitere Wohnungen in Deutschland?
              </div>
              <div class="bfsc__row__checkbox">
                <input type="checkbox" style="accent-color: black;" id="no" name="no" value="no">
                <label for="no">Nein</label>
              </div>
              <div class="bfsc__row__checkbox">
                <input type="checkbox" style="accent-color: black;" id="yes" name="yes" value="${
                  formData.havApart
                }"
                  ${formData.havApart === 1 ? "checked" : ""}>
                <label for="yes">Ja, und zwar als</label>
              </div>
              <div class="bfsc__row__checkbox">
                <input type="checkbox" style="accent-color: black;" id="yes" name="yes" value="${
                  formData.havApart
                }"
                  ${formData.havApart === 2 ? "checked" : ""}>
                <label for="main">Haupt-wohnung</label>
              </div>
              <div class="bfsc__row__note">
                Wenn ja, siehe Beiblatt!
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="body__snd__section">
        <div class="bs__fst_table">
          <!-- Table: 1 Familienname, ggf. Doktorgrad Passname -->
          <table>
            <thead>
              <tr>
                <th class="bsft__fam-header-num" style="border-bottom: 0; border-right: 0;" >1</th>
                <th class="bsft__fam-header-title" style="border-bottom: 0; border-right: 0;" >Familienname, ggf. Doktorgrad Passname</th>
                <th style="border-bottom: 0;" >${formData.lastName}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Vornamen
                  (Rufnamen unterstreichen)
                </td>
                <td style="border-bottom: 0;">${formData.firstName}</td>
              </tr>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Geburtsname
                </td>
                <td style="border-bottom: 0;">${formData.maidenName}</td>
              </tr>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Geschlecht
                </td>
                <td style="border-bottom: 0;">${formData.gender}</td>
              </tr>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Tag, Ort, Land der Geburt
                </td>
                <td style="border-bottom: 0;">${formData.birthDate} , ${
    formData.birthPlace
  }, ${formData.nationality}
                </td>
              </tr>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Religionsgesellschaft
                </td>
                <td style="border-bottom: 0;">${formData.religion}</td>
              </tr>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Staatsangehörigkeiten
                </td>
                <td style="border-bottom: 0;">${formData.nationality} ${
    formData.secondNationality ? "," : ""
  }
                  ${formData.secondNationality} </td>
              </tr>
              <tr>
                <td style="border-right: 0;" colspan="2">
                  Ordens- Künstlername
                </td>
                <td>${formData.stageName}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bs__snd_table">
          <!-- Table: 2 Familienname, ggf. Doktorgrad Passname -->
          <table>
            <thead>
              <tr>
                <th class="bsft__fam-header-num" style="border-bottom: 0; border-right: 0;"  rowspan="2">2</th>
                <th class="bsft__fam-header-title" style="border-bottom: 0; border-right: 0;"  rowspan="2">Familienname, ggf. Doktorgrad Passname</th>
                <th class="bsft__fht_famist__wrap" style="border-bottom: 0;"  rowspan="1.5">
                  <div class="bsft__fht_famist">Familienmitglied ist:</div>
                  <div class="bsft__fht">${
                    formData.people.length > 0
                      ? formData.people[0].LastName
                      : ""
                  }</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Vornamen
                  (Rufnamen unterstreichen)
                </td>
                <td style="border-bottom: 0;">${
                  formData.people.length > 0 ? formData.people[0].FirstName : ""
                }</td>
              </tr>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Geburtsname
                </td>
                <td style="border-bottom: 0;">${
                  formData.people.length > 0
                    ? formData.people[0].MaidenName
                    : ""
                }</td>
              </tr>
              <tr>
                <td style="border-bottom: 0;  border-right: 0;" colspan="2">
                  Geschlecht
                </td>
                <td style="border-bottom: 0;">${
                  formData.people.length > 0 ? formData.people[0].Gender : ""
                }</td>
              </tr>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Tag, Ort, Land der Geburt
                </td>
                <td style="border-bottom: 0;">${formData.marriedFrom}, ${
    formData.marriagePlace
  },
                  ${formData.marriageCountry}, </td>
              </tr>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Religionsgesellschaft
                </td>
                <td style="border-bottom: 0;">${formData.Religion}</td>
              </tr>
              <tr>
                <td style="border-bottom: 0; border-right: 0;" colspan="2">
                  Staatsangehörigkeiten
                </td>
                <td style="border-bottom: 0;"></td>
              </tr>
              <tr>
                <td style="border-right: 0;" colspan="2">
                  Ordens- Künstlername
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bs__third_table">
          <!-- Table: Familienstand (1oder 1 und 2) -->
          <table>
            <thead>
              <tr>
                <th style="border-right: 0; border-bottom: 0;">Familienstand (1oder 1 und 2)</th>
                <th style="border-bottom: 0;" colspan="2">Angaben zur Eheschließung / Lebenspartnerschaft (Datum, Ort,
                  Land AZ)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border-right: 0;">${formData.marital}</td>
                <td style="width: 55%; border-right: 0;">${
                  formData.marriedFrom
                }, ${formData.marriagePlace},
                  ${formData.marriageCountry},
                </td>
                <td style="width: 20%;"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="body__thr__section">
        <!-- Table: Dokumente -->
        <table class="bt__fst_table">
          <thead>
            <tr>
              <th style="border-bottom: 0;" colspan="5">
                <div class="document__title">Dokumente:</div>
                <div class="document__subtitle">Dokumentenarten: PA = Personalausweise, RP = Reisepässe, KP =
                  Kinderreisepass</div>
              </th>
            </tr>
            <tr>
              <th style="border-bottom: 0;" colspan="5">
                <div class="document__fullname">Name, Vorname: ${
                  formData.firstName
                }</div>
              </th>
            </tr>
            <tr>
              <th style="border-bottom: 0;border-right: 0;">Art</th>
              <th style="border-bottom: 0;border-right: 0;">Ausstellungsbehörde</th>
              <th style="border-bottom: 0;border-right: 0;">Seriennummer</th>
              <th style="border-bottom: 0;border-right: 0;">Datum</th>
              <th style="border-bottom: 0;">gültig bis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border-right: 0;">${formData.document}</td>
              <td style="border-right: 0;">${formData.authorityName}</td>
              <td style="border-right: 0;">${formData.serialNum}</td>
              <td style="border-right: 0;">${formData.validFrom}</td>
              <td>${formData.validTo}</td>
            </tr>
          </tbody>
        </table>
        <div class="table-divider"></div>
        <table class="bt__snd_table">
          <thead>
            <tr>
              <th colspan="5">
                <div class="document__fullname">Name, Vorname:</div>
              </th>
            </tr>
            <tr>
              <th style="border-bottom: 0;border-right: 0;">Art</th>
              <th style="border-bottom: 0;border-right: 0;">Ausstellungsbehörde</th>
              <th style="border-bottom: 0;border-right: 0;">Seriennummer</th>
              <th style="border-bottom: 0;border-right: 0;">Datum</th>
              <th style="border-bottom: 0;">gültig bis</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border-right: 0;"></td>
              <td style="border-right: 0;"></td>
              <td style="border-right: 0;"></td>
              <td style="border-right: 0;"></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="body__signature_section">
        <div class="bss__header">Datum, Unterschrift eines/einer der Meldepflichtigen oder einer Person mit
          Betreuungsvollmacht</div>
        <div class="bss__body"></div>
      </div>
    </div>
  </div>
</body>

</html>
`;
await page.setContent(htmlTemplate);
const pdf = await page.pdf({ format: "Letter" });

await browser.close();

res.setHeader("Access-Control-Allow-Origin", "*"); // Add this line to set the appropriate CORS header
res.setHeader("Access-Control-Allow-Methods", "POST"); // Add this line to allow POST requests
res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Add this line to allow the Content-Type header
res.contentType("application/pdf");
res.send(pdf);
});

app.listen(port, () => {
console.log(`Server running on http://localhost:${port}`);
});
