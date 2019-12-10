<template>
  <div class="task">
    <router-link to="/home" class="button grey">◀ back</router-link>
    <div>
      <h2 class="header is-unselectable">{{ task.title }}</h2>
      <div class="writeup is-unselectable" v-html="task.description"></div>
      <br>
      <div v-if="$route.params.id === 'whatsapp'" >
        <a :href="task.groupURL" class="button whatsapp">
          <img src="../assets/icon-whatsapp.svg">
          Tap to join group
        </a>
      </div>
      <div v-if="$route.params.id === 'posters'">
        <p class="large">URL: {{userData.posterURL || '' }}</p>
        <form @submit.prevent="updatePosterURL()">
          <input class="text-input" placeholder="Enter Google Drive URL here"
                  v-model="posterURL" required>
          <input type="submit" class="button" value="Submit" >
        </form>
        <h2>Posters</h2>
        <br>
        <div class="grid">
          <div class="poster" v-for="(poster, key) in task.posters" :key="key">
            <div class="img" :style="`background-image:url(${poster.image}`" />
            <p>
              <b>{{ poster.title }}</b>
            </p>
            <a :href="poster.image" target="_blank">Download Poster</a>
            <br />
            <a
              :href="'#'+key"
              v-clipboard:copy="poster.writeup"
              v-clipboard:success="onCopy"
            >Copy writeup</a>
            <div
              v-if="userData.posters && userData.posters[key] === '✔️' "
            >Status: ✔️ Accepted</div>
            <div
              v-if="
                  userData.posters
                   && userData.posters[key]
                   && userData.posters[key] != '✔️'"
            >
            Status: &#10060; Rejected - {{ userData.posters[key] }}
            </div>
            <div v-if="userData.posters && !(key in userData.posters)">Status: &#8986; Pending</div>
          </div>
        </div>
      </div>
      <div v-if="$route.params.id === 'referrals'">
         <div class="referral" v-clipboard:copy="userData.ref_id" v-clipboard:success="onCopyR">
          <h2 style="text-align:center">
            <span style="font-weight:normal">Referral Code :</span>
            {{ userData.ref_id }}
          </h2>
        </div>
        <br>
        <h2>Your referrals</h2>
        <ul v-if="userData['referral']">
          <li v-for="(participant,key) in userData['referral']" :key="key">
            <b>{{participant.value}}</b> -
            <i class="capital" v-if="participant.type">{{participant.type}}</i>
            <div v-if="participant.status === 'Accepted'">Status: ✔️ Accepted</div>
            <div v-else-if="participant.status == null">Status: &#8986; Pending</div>
            <div v-else>Status: &#10060; Rejected - {{ participant.status }}</div>
          </li>
        </ul>
        <p v-else>
          <br>
          ⌛ Referrals will be updated
        </p>
      </div>
      <div v-if="$route.params.id === 'feedback'">
        <textarea v-model="feedback" placeholder="Enter your feedback here"></textarea>
        <input type="submit" class="button" value="Submit feedback" @click="submitFeedback()">
      </div>
    </div>
  </div>
</template>
<style >
form {
  margin: 1em 0;
  text-align: center;
}
textarea {
  width:100%;
  border-radius: 4px;
  padding:1em;
  min-height: 5em;
  outline:0;
  resize:none;
  font-family: 'Lato', sans-serif;
}
.whatsapp.button {
  background: #273443;
  width:fit-content;
  margin:auto;
  padding: 0.5em 1.5em;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
}

h2.header {
  margin: 0.5em 0;
  padding: 0.5em 0;
  border-bottom: 2px solid #fff;
  font-size:1.5em;
}
.grey {
  background: #333;
  font-size: 0.8em;
  margin-bottom:0;
}
.grid {
  display:grid;
  grid-template-columns: 1fr 1fr;
}
.img {
  max-width:100%;
  width:200px;
  height:300px;
  background-size: cover;
  background-position: 50% 50%;
}
.poster {
  overflow:hidden;
  padding: 0.5em;
  text-align:center;
}
</style>
<script>
/* eslint-disable no-alert */
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

export default {
  name: 'Task',
  data() {
    return {
      userData: '',
      task: '',
      posterURL: '',
      points: [],
      feedback: '',
    };
  },
  firebase() {
    const userId = firebase.auth().currentUser.uid;
    return {
      userData: firebase.database().ref(`ambassadors/${userId}`),
      task: firebase.database().ref(`tasks/${this.$route.params.id}`),
    };
  },
  methods: {
    onCopy() {
      alert('Writeup copied');
    },
    onCopyR() {
      alert('Referral code copied');
    },
    submitFeedback() {
      firebase.database()
        .ref(`ambassadors/${firebase.auth().currentUser.uid}`)
        .update({ feedback: this.feedback })
        .then(this.feedback = '');
    },
    updatePosterURL() {
      firebase.database()
        .ref(`ambassadors/${firebase.auth().currentUser.uid}`)
        .update({ posterURL: this.posterURL })
        .then(this.posterURL = '')
        .then(alert('Poster URL updated'));
    },
  },
};
</script>
