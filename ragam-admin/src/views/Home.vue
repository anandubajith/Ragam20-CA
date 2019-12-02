<template>

  <section class="section">
    <div class="columns">
      <div class="column is-one-quarter">
        <router-link to="/list">
        <div class="box has-text-centered">
            <p class="title">
             <b-icon
                icon="account-search"
                size="is-large"
                type="is-primary">
            </b-icon>
            </p>
            <p class="subtitle">Search CA</p>
        </div>
        </router-link>
      </div>
      <div class="column is-one-quarter">
        <router-link to="/leaderboard">
        <div class="box has-text-centered">
            <p class="title">
             <b-icon
                icon="format-list-bulleted"
                size="is-large"
                type="is-primary">
            </b-icon>
            </p>
            <p class="subtitle">Leaderboard</p>
        </div>
        </router-link>
      </div>
    </div>
    <div class="columns">
      <div class="column is-one-quarter">
        <router-link to="/posters">
        <div class="box has-text-centered">
            <p class="title">
             <b-icon
                icon="file-image"
                size="is-large"
                type="is-primary">
            </b-icon>
            </p>
            <p class="subtitle">Manage Posters</p>
        </div>
        </router-link>
      </div>
      <div class="column is-one-quarter">
        <router-link to="/tasks">
        <div class="box has-text-centered">
            <p class="title">
             <b-icon
                icon="playlist-edit"
                size="is-large"
                type="is-primary">
            </b-icon>
            </p>
            <p class="subtitle">Manage Tasks</p>
        </div>
        </router-link>
      </div>
      <div class="column is-one-quarter">
        <router-link to="/feedback">
        <div class="box has-text-centered">
            <p class="title">
             <b-icon
                icon="clipboard-text"
                size="is-large"
                type="is-primary">
            </b-icon>
            </p>
            <p class="subtitle">View Feedback</p>
        </div>
        </router-link>
      </div>
      <div class="column is-one-quarter">
        <router-link to="/config">
        <div class="box has-text-centered">
            <p class="title">
             <b-icon
                icon="settings-outline"
                size="is-large"
                type="is-danger">
            </b-icon>
            </p>
            <p class="subtitle">Config</p>
        </div>
        </router-link>
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
