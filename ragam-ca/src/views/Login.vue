<template>
  <div class="login">
    <h1>Register as Campus Ambassador</h1>
    <p>Register here and become a Ragam'20 ambassador to promote events</p>
    <button class="button login-btn" @click="socialLogin">
      <img src="../assets/icon-google.png" alt=""/>
      <span>Sign in with Google</span>
    </button>
    <h3>Why become a CA</h3>
    <ul>
      <li>An opportunity to improve on your communication skills,
         and enhance the manager in you.</li>
      <li>Hands on experience in various scenarios where you'll
         have to use your analytical skills and improve your decision making.</li>
      <li>Stay upto date with all the updates in the world of science and technology.</li>
    </ul>
    <h3>Benefits</h3>
    <ul>
      <li><b>First Place</b> - Prices worth 5K</li>
      <li><b>Second Place</b> - Prices worth 4K</li>
      <li><b>Third Place</b> - Prices worth 3K</li>
      <li><b>Fourth Place</b> - Prices worth 1K</li>
      <li><b>Fifth Place</b> - Prices worth 1K</li>
      <li><b>Positions 6 to 9</b> - Prices worth 500 and goodies</li>
      <li><b>Positions 10 to 20</b> - Attractive Goodies</li>
      <li>Certificates for top 20 people</li>
      <li>Certificate for those who have completed a certain tier (% of work)</li>
      <li>
        Extra Benefits worth 14k for excellence in work
         (which will be awarded by <b>RAGAM PRC</b>)
      </li>
    </ul>
    <h3>Responsibilities</h3>
    <ul>
      <li>
        Sharing of all posters and links in your social networking groups and channels
      </li>
      <li>
        Putting up the posters we send you on your notice boards
      </li>
      <li>
        Encouraging other students of your college to participate in Ragam'20
      </li>
      <li>
        Gather participants for Ragam events ( Kolkali, Mime, Streetplay etc)
      </li>
    </ul>
    <h3>Eligibility</h3>
    <ul>
      <li>Any student currently pursuing education in an established institute who
      wishes to participate in Ragam'20 may apply. </li>
     <li> Applicants having good interpersonal
      and communication skills with previous experience will be given preference.</li>
    </ul>

    </div>
</template>
<style scoped>
.login-btn {
  color: #555;
  margin:1em auto;
  background: #fff;
  display:flex;
  align-items: center;
  padding: 0.5em 1.5em;
  justify-content: center;
}
.login-btn img {
  margin-right: 1em;
}
h1,h2,h3{
  margin-bottom:0.5em;
  padding-bottom:0.5em;
  border-bottom: 2px solid #fff;
}
</style>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace('home');
        })
        .catch((err) => {
          // eslint-disable-next-line
          alert(`Oops. ${err.message}`);
        });
    },
  },
};
</script>
