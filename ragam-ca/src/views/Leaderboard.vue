<template>
  <div>
     <router-link to="/home" class="btn">◀ Back</router-link>
      <h1>Leaderboard</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th class="center">Points</th>
          <th class="center">Position</th>
        </tr>
      </thead>
      <tr v-for="(person, key) in leaderboard" :key="key" :class="badge(key+1)">
        <td class="bold">{{ person.name}}</td>
        <td class="center">{{ person.point}}</td>
        <td class="center">{{ key+1}}</td>
      </tr>

    </table>
  </div>
</template>
<style scoped>

</style>
<script>
import firebase from 'firebase/app';
import 'firebase/database';

export default {
  name: 'Leaderboard',
  data() {
    return {
      leaderboard: [],
    };
  },
  firebase() {
    return {
      leaderboard: firebase.database().ref('leaderboard'),
    };
  },
  methods: {
    badge(point) {
      if (point >= 1 && point <= 5) {
        return 'platinum';
      } if (point >= 6 && point <= 10) {
        return 'gold';
      } if (point >= 11 && point <= 15) {
        return 'silver';
      } if (point >= 16 && point <= 20) {
        return 'bronze';
      }
      return '';
    },
  },
};
</script>
