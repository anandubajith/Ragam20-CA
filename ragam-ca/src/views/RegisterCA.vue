<template>
  <div>
    <div class="register" v-if="!success">
      <h2 class="is-size-3">Please fill in your details</h2>
      <img :src="photo" />
      <form v-on:submit.prevent="addCA" autocomplete="off">
        <label for="Name">Name</label>
        <input
          placeholder="Enter your name"
          name="Name"
          type="text"
          autocomplete="off"
          v-model="name"
          required
        />
        <label for="College">College</label>
        <input
          placeholder="Enter your college name"
          type="text"
          name="College"
          autocomplete="off"
          v-model="college"
          required
        />
        <label for="Branch">Branch</label>
        <input
          placeholder="Enter your Branch"
          type="text"
          name="Branch"
          autocomplete="off"
          v-model="branch"
          required
        />
        <label for="Year">Year</label>
        <select v-model="year">
          <option value selected disabled>Select your year</option>
          <option value="first">First</option>
          <option value="second">Second</option>
          <option value="third">Third</option>
          <option value="fourth">Fourth</option>
        </select>
        <label for="Experience">Have you been a Campus ambassador before?</label>
        <div class="row">
          <div class="column">
            <input type="radio" name="experience" v-model="experience" value="yes" /> Yes
          </div>
          <div class="column">
            <input type="radio" name="experience" v-model="experience" value="no" checked /> No
          </div>
        </div>
        <label for="Email">Email</label>
        <div class="input">{{ this.email }}</div>
        <label for="Phone">Phone</label>
        <input
          placeholder="Enter your phone number."
          name="Phone"
          type="tel"
          autocomplete="off"
          v-model="phone"
          required
        />
        <input type="submit" value="Register" />
      </form>
    </div>
    <div class="success" v-if="success">
      <h1>You have registered successfully</h1>
    </div>
  </div>
</template>
<style >

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
      success: false,
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
