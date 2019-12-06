<template>
  <div class="home">
    <div class="stats">
        <img class="profile" :src="photo" alt />
        <div class="">
           <h2>{{ userData.name }}</h2>
          <span class="college">{{ userData.college}}</span>
          <Badge :points="totalPoints" :position="position"/>
          <!-- <router-link to="/leaderboard" class="button">Leaderboard</router-link>
          <a class="logout button" href="#" @click="logout()">Logout</a> -->
        </div>
    </div>
    <div class="referral" v-if="tasks.referrals && tasks.referrals.active">
      <div class="button"
           v-clipboard:copy="userData.ref_id"
           v-clipboard:success="onCopy">
        <span style="font-weight:normal">Referral Code :</span>
          {{ userData.ref_id }}
      </div>
    </div>
    <div class="notification" v-if="notification.message">
      {{ notification.message }}
    </div>
    <div class="tasks">
      <router-link class="button" to="/task/whatsapp"
                    v-if="tasks.whatsapp && tasks.whatsapp.active">
        <div class="subtitle">task 1</div>
        <div class="title">Join WhatsApp Group</div>
      </router-link>
      <router-link class="button" to="/task/posters"
                  v-if="tasks.posters && tasks.posters.active">
         <div class="subtitle">task 2</div>
        <div class="title">Share posters</div>
      </router-link>
      <router-link class="button" to="/task/referrals"
                  v-if="tasks.referrals && tasks.referrals.active">
         <div class="subtitle">task 3</div>
        <div class="title">Refer people</div>
      </router-link>
      <router-link class="button" to="/task/feedback"
                v-if="tasks.feedback && tasks.feedback.active">
         <div class="subtitle">task 4</div>
        <div class="title">Feedback</div>
      </router-link>
    </div>
  </div>
</template>
<style>
.stats {
  margin: 1em 0;
  display:flex;
  justify-content:center;
  align-items: center;
}
.profile {
  border-radius: 100%;
  max-width: 7.5em;
  padding-right: 1em;
}
.college {
  color: #777;
}
.referral {
  text-align: center;
  padding:1em 0;
}
.tasks .button {
  display:block;
  font-weight: normal;
  border: 0;
  background: #333;
}
.subtitle {
  color: #888;
  font-size: 0.8em;
}
.title {
  font-weight: bold;
}
.notification {
  margin-bottom:1em;
  background: #ff2d55;
  border-radius: 4px;
  padding:1em;
}
</style>
<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import Badge from '../components/Badge.vue';

export default {
  name: 'DashboardCA',
  data() {
    return {
      points: {},
      photo: firebase.auth().currentUser.photoURL,
      uid: firebase.auth().currentUser.uid,
      success: false,
      position: 0,
      userData: {},
      notification: {},
      leaderboard: [],
      tasks: {},
      selectedTask: '',
    };
  },
  components: {
    Badge,
  },
  firebase() {
    const userId = firebase.auth().currentUser.uid;
    return {
      userData: firebase.database().ref(`ambassadors/${userId}`),
      points: firebase.database().ref(`points/${userId}`),
      leaderboard: firebase.database().ref('leaderboard'),
      notification: firebase.database().ref('notification'),
      tasks: firebase.database().ref('tasks'),
    };
  },
  beforeUpdate() {
    if (Object.entries(this.userData).length < 4) {
      // This user is unregistered, prompt them to register
      this.$router.push('/register');
    }
  },
  computed: {
    totalPoints() {
      return Object.values(this.points).reduce(
        (total, current) => total + parseInt(current.value, 10), 0,
      );
    },
  },
  watch: {
    leaderboard(current) {
      if (current.length) {
        for (let i = 0; i < current.length; i += 1) {
          if (current[i].id === this.uid) {
            this.position = i + 1;
            return;
          }
        }
      }
      this.position = 0;
    },
  },
  methods: {
    onCopy() {
      // eslint-disable-next-line
      alert('Referral Code copied');
    },
  },
};
</script>
