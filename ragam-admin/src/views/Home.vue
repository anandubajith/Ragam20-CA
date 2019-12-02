<template>

  <section class="section">
    <div class="columns">
      <div class="column">
        <b-button size="is-large"
              type="is-primary"
              tag="router-link"
              to="/list"
                icon-left="account-search">
          Search CA
        </b-button>
      </div>
      <div class="column">
        <b-button size="is-large"
              type="is-primary"
              tag="router-link"
              to="/leaderboard"
                icon-left="list">
          Leaderboard
        </b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-button tag="router-link" to="/posters" size="is-large">Manage Posters</b-button>
      </div>
      <div class="column">
        <b-button tag="router-link" to="/tasks" size="is-large">Manage Tasks</b-button>
      </div>
      <div class="column">
        <b-button tag="router-link" to="/feedback" size="is-large">View Feedback</b-button>
      </div>
      <div class="column">
        <b-button tag="router-link" to="/config" size="is-large">Global Config</b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-button type="is-danger" @click="logout">Logout</b-button>
      </div>
    </div>
  </section>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'home',
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$router.replace('login');
      });
    },
  },
};
</script>

<style>
</style>
