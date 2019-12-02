<template>
  <section class="events section">
    <h1 class="is-size-1">Leaderboard</h1>
    <hr />
    <b-table :data="leaderboard" :columns="columns" :striped="true"  :hoverable="true"></b-table>
  </section>
</template>

<script>
import { db } from '../firebase';

export default {
  name: 'People',
  components: {},
  data() {
    return {
      leaderboard: [],
      columns: [
        {
          field: 'name',
          label: 'Name',
        },
        {
          field: 'point',
          label: 'Points',
          width: '40',
          numeric: true,
        },
      ],
    };
  },

  firebase() {
    return {
      leaderboard: db.ref('leaderboard'),
    };
  },
  methods: {},
};
</script>
