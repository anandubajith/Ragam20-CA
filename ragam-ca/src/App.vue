<template>
  <div id="app">
    <header>
      <router-link to="/home">
        <h1>Ragam'20</h1>
      </router-link>
    </header>
    <div class="container">
      <transition name="slide">
      <router-view />
      </transition>
    </div>
    <footer>
      <router-link to="/about"> About</router-link>
      &middot;
      <a href="https://publicrelations.tathva.org/contact.html" target="_blank" rel="noopener noreferrer">Contact</a>
    </footer>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
html {
  min-height: 100%;
}
body {
  padding:1em;
  /* background: linear-gradient(135deg, #3023ae 0%, #c86dd7 100%); */
  background: #000;
  min-height: 100%;
  margin: 0;
  background-repeat: no-repeat;
  background-attachment: fixed;
  font-family: "Open sans", sans-serif;
}
header {
  height: 100%;
  padding: 1em;
  color: #fff;
  text-align: center;
  font-size: 1.5em;
}
header h1 {
  margin: 0;
  font-weight: normal;
}
header a {
  text-decoration: none;
  color:#fff;
}
.container {
  background: #fff;
  padding: 3em 6em;
  width: 100%;
  margin: auto;
  max-width: 750px;
  border-radius: 10px;
}
@media screen and (max-width: 600px) {
  .container {
    padding: 2em;
  }
}


footer {
  text-align:center;
  padding:1em 0;
  color:#fff;
}
footer a {
  text-decoration: none;
  color: #fff;
  transition: 0.1s ease-in all;
}
footer a:hover {
  border-bottom:1px solid #fff;
}
</style>
