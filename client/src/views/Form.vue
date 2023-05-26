<template>
  <div>
    <h1>Form</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required>
      </div>
      <div>
        <label for="message">Message:</label>
        <textarea id="message" v-model="formData.message" required></textarea>
      </div>
      <div>
        <button type="submit">Generate PDF</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FormView',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('https://6470d010d560940008313a65--dreamy-marigold-bc8877.netlify.app/generate-pdf', {
          formData: JSON.stringify(this.formData),
        }, {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
