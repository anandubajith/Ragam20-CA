<template>
  <div class="login">
    <h2>Register as Campus Ambassador</h2>
    <p>Register here and become a Ragam'20 ambassador to promote events</p>
    <h3>Login with</h3>
    <button @click="socialLogin">
      <img src="../assets/icon-google.png" />
    </button>
    <br />
    <br />

    </div>
</template>

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

<style scoped>

</style>
