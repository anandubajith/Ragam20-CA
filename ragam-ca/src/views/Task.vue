<template>
  <div class="task">
    <router-link to="/home" class="btn">◀ Back</router-link>
    <div>
      <h2>{{ task.title }}</h2>
      <hr />
      <div class="writeup" v-html="task.description"></div>
      <br>
      <div v-if="$route.params.id === 'whatsapp'" >
        <a :href="task.groupURL" class="whatsapp">
          <img src="../assets/icon-whatsapp.svg">
          Click to join WhatsApp Group
        </a>
      </div>
      <div v-if="$route.params.id === 'posters'">
        <p class="large">URL: {{userData.posterURL || '' }}</p>
        <form @submit.prevent="updatePosterURL()">
          <input type="text" placeholder="Enter Google Drive URL here" v-model="posterURL" required>
          <input type="submit" :value="button" >
        </form>
        <h3>Posters</h3>
        <div class="grid">
          <div class="poster" v-for="(poster, key) in task.posters" :key="key">
            <div class="img" :style="`background-image:url(${poster.image}`" />
            <p>
              <b>{{ poster.title }}</b>
            </p>
            <a :href="poster.image" target="_blank">Download Poster</a>
            <br />
            <a :href="poster.image2" v-if="poster.image2" target="_blank">Download Poster 2</a>
            <br v-if="poster.image2" />
            <a
              :href="'#'+key"
              v-clipboard:copy="poster.writeup"
              v-clipboard:success="onCopy"
            >Copy writeup to clipboard</a>
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
        <h3>Your referrals</h3>
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
        <input type="submit" value="Submit feedback" @click="submitFeedback()">
      </div>
    </div>
  </div>
</template>
<style >
ul {
  padding-inline-start: 20px;
}
.btn {
  text-decoration: none;
  color: #000;
  border: 1px solid #eee;
  padding: 10px;
}
.btn:hover {
  background: #eee;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
}
textarea {
  width:100%;
  padding:1em;
  font-family:sans-serif;
  outline:0;
  resize: none;
  max-width:100%;
  min-height: 6em;
  border:2px solid #666;
  border-radius: 4px;
}
textarea:focus {
  border: 2px solid #000;
}
.whatsapp {
  display:flex;
  flex-direction:column;
  width:fit-content;
  margin:auto;
  align-items:center;
  border-radius: 4px;
  color: #fff;
  text-decoration: none;
  background:#455a64;
  padding:1em;
}
@media screen and (max-width: 540px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
.poster {
  padding: 1em;
}
.poster p {
  margin-bottom: 0;
}
.capital {
  text-transform: capitalize;
  color: #888;
}
.grid .img {
  width: 200px;
  margin: auto;
  height: 300px;
  background-size: cover;
  background-position: 50% 50%;
}
.large {
  word-break: break-all;
  margin-top: 1em;
  font-size: 1.3em;
  color: #3023ae;
}
input{
  width: 100%;
  outline: 0;
  border: 1px solid #999;
  margin: 0.5em 0;
  padding: 1em;
  border-radius: 6px;
}
input[type="submit"] {
  width: auto;
  display: block;
  margin: 1em auto;
  background: #3023ae;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  padding: 1em 2em;
  outline: 0;
  border: 0;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
  transition: 0.2s ease-in all;
}

input[type="submit"]:hover {
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
</style>
<script>
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
        .then(this.posterURL = '');
    },
  },
};
</script>
