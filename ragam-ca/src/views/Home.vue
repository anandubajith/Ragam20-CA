<template>
  <div class="home">
     <div class="dashboard">
    <div class="summary">
      <div class="text">
        <h2>{{ userData.name }}</h2>
        {{ totalPoints }}
        <div>College: {{ userData.college}}</div>
        <router-link to="/leaderboard" class="button">Leaderboard</router-link>
        <a class="logout button" href="#" @click="logout()">Logout</a>

      </div>
      <img class="profile" :src="photo" alt />
    </div>
    <hr />
    <div class="notification" v-if="notification.message">
      {{ notification.message }}
    </div>
    <hr v-if="notification.message">
    <div class="referral_code" v-if="tasks.referrals.active">
      <br>
      <div class="referral" >
        <h2 style="text-align:center">
          <span style="font-weight:normal">Referral Code :</span>
          {{ userData.ref_id }}
        </h2>
      </div>
      <hr />
    </div>
    <div class="tasks">
      <h2>Tasks</h2>
      <router-link class="poster-btn" to="/task/whatsapp" v-if="tasks.whatsapp.active">
        Task #1: <b>Join WhatsApp group</b>
      </router-link>
      <router-link class="poster-btn" to="/task/posters" v-if="tasks.posters.active">
        Task #2: <b>Posters</b>
      </router-link>
      <router-link class="poster-btn" to="/task/referrals" v-if="tasks.referrals.active">
        Task #3: <b>Referrals</b>
      </router-link>
      <router-link class="poster-btn" to="/task/feedback" v-if="tasks.feedback.active">
        Task #4: <b>Feedback</b>
      </router-link>
    </div>
  </div>
  </div>
</template>
<style scoped>
button {
  display: block;
  margin: 0 auto;
  background: tomato;
  color: #fff;
  border-radius: 10px;
  padding: 1em;
  outline: 0;
  border: 0;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
}
.poster-btn {
  display: block;
  background: #eee;
  padding: 1em;
  margin-bottom:1em;
  border-radius: 4px;
  text-decoration: none;
  color: #000;
}
.tasks a {
  display: block;
}
.summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.profile {
  border-radius: 100%;
  max-width: 100px;
  max-height: 100px;
}
.text {
  /* text-align: center; */
  flex: 1;
}
.button {
  display: inline-block;
  margin-top: 1em;
  margin-right: 1em;
  background: cornflowerblue;
  color: #fff;
  text-decoration: none;
  padding: 0.2em;
  border-radius: 3px;
}
.logout {
  background: tomato;
}
.referral {
  text-align: center;
  cursor:pointer;
}
.referral h2 {
  background: linear-gradient(45deg, #e2336e 0%, #7537e7 100%);
  display: inline;
  color: #fff;
  border-radius: 5px;
  padding: 0.5em;
  margin: auto;
}
.text h2 {
  margin: 0;
}
.tasks button {
  display: block;
  padding: 1em;
  margin: 1em auto;
}
hr {
  background-color: #f5f5f5;
  border: none;
  display: block;
  height: 2px;
  margin: 1.5rem 0;
}
/* .task {
  padding: 1em;
} */
.task p {
  margin-top: 0;
}
/* .task .message {
  flex: 1;
} */
.status {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .v--modal-box.v--modal {
    max-width: 100vh !important;
  }
}
</style>
<script>
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login');
        });
    },
    onCopy() {
      alert('Referral Code copied');
    },
  },
};
</script>
