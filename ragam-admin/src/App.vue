<template>
<div id="app">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/home" >
        <h4 class="is-size-3">Ragam CA Admin</h4>
      </router-link>
    </div>
  </nav>


  <div class="container">
    <router-view/>
  </div>

</div>
</template>
