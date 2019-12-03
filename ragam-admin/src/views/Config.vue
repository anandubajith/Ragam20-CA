<template>
    <section class="section">
      <h1 class="is-size-3">Statistics</h1>
      <hr>
        <section class="info-tiles">
        <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">{{ambassadors.length}}</p>
                    <p class="subtitle">Total CAs</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">{{ totalReferrals }}</p>
                    <p class="subtitle">Referrals</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">
                      {{ tasks.posters && Object.keys(tasks.posters.posters).length }}
                    </p>
                    <p class="subtitle">Posters</p>
                </article>
            </div>
        </div>
    </section>
    <section class="section">
  <div class="columns">
    <div class="column">
      <h4 class="is-size-4">Send global notification</h4>
      <hr>
        <b-field>
            <b-input type="textarea"
            v-model="notification.message"
            maxlength="500"
                placeholder="Enter notification text, It'll be visible in the CA portal">
            </b-input>
        </b-field>
        <b-field grouped class="buttons">
            <b-button type="is-primary" @click="updateNotification">Send notification</b-button>
            <b-button type="is-danger" @click="clear">Clear</b-button>
        </b-field>

    </div>
    <div class="column" v-if="tasks">
      <h4 class="is-size-4">Active Tasks</h4>
      <hr>
         <div class="field">
            <b-switch size="is-large"
             v-on:input="toggle('whatsapp', tasks.whatsapp.active || false)"
             v-model="tasks.whatsapp.active">
              Join WhatsApp Group</b-switch>
        </div>
           <div class="field">
            <b-switch size="is-large"
            v-on:input="toggle('posters', tasks.posters.active || false)"
             v-model="tasks.posters.active">
              Posters</b-switch>
        </div>
           <div class="field">
            <b-switch size="is-large"
            v-on:input="toggle('referrals', tasks.referrals.active || false)"
             v-model="tasks.referrals.active">
              Referrals</b-switch>
        </div>
           <div class="field">
            <b-switch size="is-large"
            v-on:input="toggle('feedback', tasks.feedback.active || false )"
            v-model="tasks.feedback.active">
              Feedback</b-switch>
        </div>
    </div>
  </div>
  </section>
    </section>
</template>

<script>
import { db, functions } from '../firebase';

const generateRefIDs = functions.httpsCallable('generateRefIDs');

export default {
  name: 'Config',
  data() {
    return {
      ambassadors: [],
      tasks: {
        whatsapp: {},
        referrals: {},
        posters: {},
        feedback: {},
      },
      notification: {},
    };
  },
  firebase() {
    return {
      ambassadors: db.ref('ambassadors').orderByChild('name'),
      tasks: db.ref('tasks'),
      notification: db.ref('notification'),
    };
  },
  computed: {
    totalReferrals() {
      let res = 0;
      if (this.ambassadors) {
        for (let i = 0; i < this.ambassadors.length; i += 1) {
          if (this.ambassadors[i].referral) res += Object.keys(this.ambassadors[i].referral).length;
        }
      }

      return res;
    },
  },
  methods: {
    toggle(ref, val) {
      db.ref(`tasks/${ref}`).update({ active: val });
      if (ref === 'referrals' && val) {
        generateRefIDs()
          .then(this.$buefy.toast.open('Referral codes generated'));
      }
    },
    updateNotification() {
      db.ref('notification')
        .update({ message: this.notification.message })
        .then(this.$buefy.toast.open('Updated'));
    },
    clear() {
      this.notification.message = '';
      this.updateNotification();
    },
  },
};
</script>
