<template>
  <div class="login">
    <h1>Register as Campus Ambassador</h1>
    <p>Register here and become a Ragam'20 ambassador to promote events</p>
    <button class="button login-btn" @click="socialLogin">
      <img src="../assets/icon-google.png" />
      <span>Sign in with Google</span>
    </button>
    <h3>Responsibilities</h3>
    <ul>
      <li>
        Sharing of all posters and links in your social networking groups and channels
      </li>
      <li>
        Putting up the posters we send you on your notice boards
      </li>
      <li>
        Encouraging other students of your college to participate in Tathva'19
      </li>
    </ul>
    <h3>Eligibility</h3>
    <p>
      Any student currently pursuing education in an established institute who
      wishes to participate in Ragam '19 may apply. Applicants having good interpersonal
      and communication skills with previous experience will be given preference.
    </p>

    </div>
</template>
<style>
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
