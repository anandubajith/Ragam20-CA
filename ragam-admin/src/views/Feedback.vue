<template>
   <section class="section">
        <h1 class="is-size-2">Feedback</h1>
        <hr>
        <div class="table-container">
            <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
                <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Feedback</th>
                </tr>
            </thead>
                <tr v-for="(ambassador, key ) in ambassadors" :key="key" >
                  <th v-if="ambassador.feedback">{{ambassador.name}}</th>
                  <td v-if="ambassador.feedback">{{ ambassador.phone }} </td>
                  <td v-if="ambassador.feedback">{{ ambassador.feedback }}</td>
                </tr>
            </table>
        </div>
   </section>
</template>
<script>
import { db } from '../firebase';

export default {
  name: 'Feedback',
  data() {
    return {
      ambassadors: [],
    };
  },
  firebase() {
    return {
      ambassadors: db.ref('ambassadors'),
    };
  },
};
</script>
