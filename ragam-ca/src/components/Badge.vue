<template>
  <div class="position">
    <div v-if="position >= 1 && position <= 5 " class="platinum">
      Platinum -
      <b>{{ points }}</b> points
    </div>
    <div v-else-if="position >= 6 && position <= 10" class="gold">
      Gold -
      <b>{{ points }}</b> points
    </div>
    <div v-else-if="position >= 11 && position <= 15 " class="silver">
      Silver -
      <b>{{ points }}</b> points
    </div>
    <div v-else-if="position >= 16 && position <= 20 " class="bronze">
      Bronze -
      <b>{{ points || 0 }}</b> points
    </div>
    <div v-else>Points: {{ points }}</div>
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
.platinum {
  background: #777;
  color: #fff;
  font-weight: bold;
  animation: glow 3s ease-in-out infinite alternate;
}
.gold {
  background-color: #c9b037;
}
.silver {
  background-color: #d7d7d7;
}
.bronze {
  background-color: #ad8a56;
  color: #fff;
}
@keyframes glow {
  from {
    box-shadow: 0 0 10px #eee;
  }
  to {
    box-shadow: 0 0 10px #999;
  }
}
</style>
<script>
export default {
  name: 'Badge',
  props: ['position', 'points'],
};
</script>
