<template>
  <div id="app">
    <header>
      <router-link to="/home">
        <img src="./assets/logo.png" class="logo" alt="Ragam'20">
      </router-link>
    </header>
    <div class="container">
      <transition name="slide">
      <router-view />
      </transition>
    </div>
    <footer>
      <router-link to="/about">about</router-link>
      &middot;
      <router-link to="/contact">contact</router-link>
      <br>
      <a href="#" @click="logout()" v-if="$route.path === '/home'">
        logout
      </a>
    </footer>
  </div>
</template>

<style>
@import url(../node_modules/minireset.css/minireset.min.css);
body {
  background: #000;
  color:#fff;
  font-family: 'Lato', sans-serif;
  max-width: 30em;
  padding:1em;
  font-size:18px;
  margin: auto;
}
a {
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid #fff;
}
.logo {
  width: 4em;
}
header {
  display: flex;
  justify-content: center;
}
header a {
  border: 0;
}
h1, h2, h3 {
  font-weight: bold;
  font-size:2em;
  text-align:center;
}
h3 {
  font-size: 1.5em;
  margin-top: 0.5em;
}
.button {
  background: #007aff;
  color:#fff;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5em;
  display:inline-block;
  margin:0.5em 0;
  border-radius: 4px;
  box-shadow: 0 0 5px #333;
  border:0;
  user-select: none;
}
footer {
  margin: 1em 0;
  text-align: center;
}
.is-unselectable {
  user-select: none;
}
.text-input {
  border:0;
  border-radius: 4px;
  outline: 0;
  width:100%;
  padding:0.5em;
}
</style>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'App',
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login');
        });
    },
  },
};
</script>
