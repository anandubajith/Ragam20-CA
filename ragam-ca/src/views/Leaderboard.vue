<template>
  <div>
      <h2 class="header">Leaderboard</h2>
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
<style>
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}

table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}

table tr {
  /* background-color: #f8f8f8; */
  border: 1px solid #ddd;
  padding: .35em;
}

table th,
table td {
  padding: .625em;
  text-align: center;
}

table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
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
      }
      if (point >= 6 && point <= 10) {
        return 'gold';
      }
      if (point >= 11 && point <= 15) {
        return 'silver';
      }
      if (point >= 16 && point <= 20) {
        return 'bronze';
      }
      return '';
    },
  },
};
</script>
