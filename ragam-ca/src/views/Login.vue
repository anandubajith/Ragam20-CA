<template>
  <div class="login">
    <h2>Register as Campus Ambassador</h2>
    <!-- <img src="../assets/logo.png" class="header-img" /> -->
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
.login {
  text-align: center;
}
.left {
  text-align: left;
}
img {
  max-width: 150px;
  max-height: 150px;
  display:block;
  margin:auto;
}

.header-img {
  max-width: 240px;
  max-height: 200px;
}
h2 {
  margin-top: 0;
  font-weight: normal;
  font-size: 2em;
}
p {
  font-size: 1.2em;
}
button {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  background: #fff;
  border: 0;
  box-shadow: 0 1px 5px 0px rgba(0, 0, 0, 0.2);
  padding: 1em 3em;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s ease-in all;
}
button:hover,
button:focus {
  outline: 0;
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
.normal {
  font-size:1em;
}
</style>
