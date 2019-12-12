<template>
  <div>
    <div class="register" v-if="!success">
      <h2 class="header">Please fill in your details</h2>
      <img :src="photo" class="profile">
      <form v-on:submit.prevent="addCA" autocomplete="off">
        <div class="field">
        <label for="Name">Name</label>
        <input
          placeholder="Enter your name"
          name="Name"
          type="text"
          class="text-input"
          autocomplete="off"
          v-model="name"
          required
        />
        </div>
        <div class="field">
        <label for="College">College</label>
        <input
          placeholder="Enter your college name"
          type="text"
          class="text-input"
          name="College"
          autocomplete="off"
          v-model="college"
          required
        />
        </div>
        <div class="field">
          <label for="Branch">Branch</label>
          <input
            placeholder="Enter your Branch"
            type="text"
            class="text-input"
            name="Branch"
            autocomplete="off"
            v-model="branch"
            required
          />
        </div>
        <div class="field">
          <label for="Year">Year</label>
          <select v-model="year">
            <option value selected disabled>Select your year</option>
            <option value="first">First</option>
            <option value="second">Second</option>
            <option value="third">Third</option>
            <option value="fourth">Fourth</option>
          </select>
        </div>
        <div class="field">
        <label for="Experience">Have you been a Campus ambassador before?</label>
        <div class="row">
          <div class="column">
            <input type="radio" name="experience" v-model="experience" value="yes" /> Yes
          </div>
          <div class="column">
            <input type="radio" name="experience" v-model="experience" value="no" checked /> No
          </div>
        </div>
        </div>
        <div class="field">
        <label for="Email">Email</label>
        <div class="text-input">{{ this.email }}</div>
        </div>
        <div class="field">
        <label for="Phone">WhatsApp number</label>
        <input
          placeholder="Enter your WhatsApp number."
          name="Phone"
          type="tel"
          class="text-input"
          autocomplete="off"
          v-model="phone"
          required
        />
        </div>
        <input type="submit" class="button" value="Register" />
      </form>
    </div>
    <div class="success" v-if="success">
      <!-- <h1>You have registered successfully</h1> -->
      <h1>Registration is now closed</h1>
      <br>
      <p style="text-align:center">
        Contact <b>Umer Muqthar P</b><br>
      <a class="button" href="tel:9048198221">+91 9048198221</a>
      </p>
    </div>
  </div>
</template>
<style scoped>
.profile {
  display: block;
  margin: auto;
  padding:0;
}
form {
  text-align: left;
}
.row {
  display:flex;
}
.field {
  margin: 0.5em 0;
}
label {
  display:block;
  margin-bottom: 0.25em;
}
select {
  padding: 0.5em;
  width:100%;
  border:0;
  border-radius: 4px;
  background:#fff;
}
div.text-input {
  background:#eee;
  color: #999;
  user-select:none;
}
.column {
  margin-right: 1em;
}
</style>
<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  name: 'RegisterCA',
  data() {
    return {
      name: firebase.auth().currentUser.displayName,
      college: '',
      phone: '',
      year: '',
      branch: '',
      experience: '',
      photo: firebase.auth().currentUser.photoURL,
      email: firebase.auth().currentUser.email,
      success: true,
    };
  },
  methods: {
    addCA() {
      firebase
        .database()
        .ref(`ambassadors/${firebase.auth().currentUser.uid}`)
        .update({
          name: this.name,
          college: this.college,
          phone: this.phone,
          email: this.email,
          year: this.year,
          branch: this.branch,
          experience: this.experience,
          photo: this.photo,
        })
        .then(() => {
          this.success = true;
          this.$router.push('home');
        });
    },
  },
  beforeCreate() {
    const user = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`/ambassadors/${user.uid}`)
      .once('value')
      .then(snapshot => snapshot.val())
      .then((data) => {
        this.name = data && data.name ? data.name : user.displayName;
        this.college = data && data.college ? data.college : '';
        this.phone = data && data.phone ? data.phone : user.phoneNumber;
        this.year = data && data.year ? data.year : '';
        this.branch = data && data.branch ? data.branch : '';
        this.experience = data && data.experience ? data.experience : '';
      });
  },
};
</script>
