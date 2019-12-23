<template>
  <div class="position">
  <router-link target="_blank" to="/leaderboard">
    <div :class="level">
      <span class="capitalize">{{ level }} - </span>
        <b>{{ points || 0 }} </b> points
    </div>
  </router-link>
  </div>
</template>
<style>
.platinum,
.gold,
.bronze,
.silver {
  padding: 0.5em;
  margin-top: 10px;
  border-radius: 3px;
}
.position div {
  display: inline-block;
}
.capitalize {
  text-transform: capitalize;
}
.platinum {
  background: #4CD964;
  color: #fff;
  font-weight: bold;
}
.gold {
  background-color: #FFCC00;
}
.silver {
  background-color: #C7C7CC;
}
.bronze {
  background-color: #FF9500;
  color: #fff;
}

</style>
<script>
export default {
  name: 'Badge',
  props: ['position', 'points'],
  computed: {
    level() {
      if (this.position >= 1 && this.position <= 5) { return 'platinum'; }
      if (this.position >= 6 && this.position <= 10) return 'gold';
      if (this.position >= 11 && this.position <= 15) return 'silver';
      if (this.position >= 16 && this.position <= 20) return 'bronze';
      return '';
    },
  },
};
</script>
