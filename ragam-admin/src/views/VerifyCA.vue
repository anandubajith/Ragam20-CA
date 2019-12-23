<template>
  <section class="section verifyca">
    <div class="columns is-mobile is-multiline">
      <div class="column is-quarter-desktop is-full-mobile">
        <span class="header-icon user-profile-image">
          <img alt :src="ambassadors.photo" />
        </span>
      </div>
      <div class="column is-full-tablet is-half-desktop name">
        <p>
          <span class="title is-size-2 is-bold">{{ ambassadors.name }}</span>
          <span class="is-size-3 is-block">{{ ambassadors.phone }}</span>
        </p>
        <p class="tagline break">
          {{ambassadors.email}}
          <br />
          <b>{{ ambassadors.college }}</b>
          {{ ambassadors.branch }}
          {{ambassadors.year + " year"}}
        </p>
      </div>
      <div class="column is-quarter-tablet is-full-mobile is-quarter-desktop has-text-centered">
        <p class="stat-val">{{ totalPoints }}</p>
        <p class="stat-key">Points</p>
      </div>
    </div>

    <hr />
    <div class="columns is-centered">
      <div class="column is-one-third">
        <br />
        <b-button
          tag="a"
          :href="ambassadors.posterURL ? sanitizeURL(ambassadors.posterURL): '#'"
          target="_blank"
          v-if="ambassadors.posterURL"
          type="is-primary"
          size="is-large"
        >Posters Link</b-button>
        <b-button v-else
          type="is-danger"
          size="is-large">
          Poster Link not submitted
        </b-button>
      </div>
      <div class="column is-one-third">
        <h2 class="is-size-4">Referral Code:</h2>
        <h2 class="is-size-1">{{ ambassadors.ref_id}}</h2>
      </div>
      <div class="column is-one-third">
        <h2 class="is-size-4">Total Referrals</h2>
        <h2 class="is-size-1">
          {{ ambassadors.referral && Object.keys(ambassadors.referral).length || 0 }}
        </h2>
      </div>
    </div>
    <hr />
    <div class="columns is-centered">
        <div class="column is-one-quarter is-one-third-tablet is-full-mobile">
           <h3 class="is-size-3">Add Referral</h3>
        <hr />
       <form class="form box"   @submit="addReferral" >
           <b-field label="Name">
            <b-input placeholder="Enter name" v-model="refName"
             :disabled="loading" required></b-input>
        </b-field>
        <b-field label="Type">
            <b-select v-model="refType" placeholder="Select Referral Type"
            :disabled="loading" required expanded>
                <option value="Registration">Registration</option>
                <option value="Lecture">Lecture</option>
                <option value="Workshop">Workshop</option>
                <option value="Event">Event</option>
                <option value="RoboticsEvent">Robotics Event</option>
            </b-select>
        </b-field>
            <b-button type="is-primary" tag="input" native-type="submit"
            :disabled="loading">Add</b-button>

       </form>
     </div>

      <div class="column is-three-quarters-desktop is-two-third-tablet is-full-mobile">
        <h3 class="is-size-3">Referrals</h3>

        <hr />
        <div class="table__wrapper">
        <table class="table is-fullwidth is-striped is-bordered">
          <thead>
            <tr>
              <th >Name</th>
              <th>Type</th>
              <th >Status</th>
              <th class="has-text-centered">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(person, key ) in ambassadors.referral" :key="key">
              <th>{{person.value}}</th>
              <th>{{ person.type }}</th>
              <th>{{person.status}}</th>
              <th class="has-text-centered">
                <b-button type="is-danger" @click="rejectReferral(key, person.value, person.type)"
                v-if="person.status === 'Accepted'">Reject</b-button>
                <b-button type="is-success" @click="acceptReferral(key, person.value, person.type)"
                v-else>Accept</b-button>
              </th>
            </tr>
          </tbody>
        </table>
       </div>
      </div>

    </div>
    <h3 class="is-size-3">Posters</h3>
    <hr>
    <div class="columns is-multiline">
      <div class="column is-one-fifth-desktop is-half-tablet is-full-mobile"
            v-for="(poster, key ) in posters" :key="key">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="poster.image" :alt="poster.title">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-5">
                    {{poster.title}} - {{ambassadors.posters ? ambassadors.posters[key] : '❓'}}
                  </p>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a class="card-footer-item is-success" @click="acceptPoster(key)">Accept</a>
              <a class="card-footer-item is-danger" @click="rejectPoster(key)" >Reject</a>
            </footer>
          </div>
        </div>
      </div>
       <h3 class="is-size-3">Points Log</h3>
    <hr />
     <b-collapse :open="false" aria-id="pointUpdateLogToggle">
            <button
                class="button is-primary"
                slot="trigger"
                aria-controls="pointUpdateLogToggle">View Point update log</button>
             <div class="table-container">
      <table class="table is-fullwidth is-striped is-hoverable">
  <thead>
    <tr>
      <th>Reason</th>
      <th>Points</th>
    </tr>
  </thead>
   <tr v-for="(point, key ) in points" :key="key">
      <td>{{point.reason}}</td>
      <td>{{point.value}}</td>
    </tr>
      </table>
    </div>
        </b-collapse>
  </section>

</template>

<style>
.stat-val {
  font-size: 3em;
  /* padding-top: 20px; */
  font-weight: bold;
}
.stat-key {
  font-size: 1.4em;
  font-weight: 200;
}
.user-profile-image img {
  max-width: 100%;
  width: 200px;
  height: 200px;
  border-radius: 100%;
}

.break {
  word-break: break-word;
}
.is-vertical-center {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.card-footer-item.is-danger{
  color:tomato;
}
.card-footer-item.is-success{
  color:#23d160;
}
.table-poster {
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 300px;
  margin-right: 10px;
}
@media screen and ( min-width: 400px) {
   .user-profile-image img {
     display: block;
     margin:auto;
   }
}
.table__wrapper {
  overflow-x: auto;
}
</style>

<script>
import { db } from '../firebase';

export default {
  name: 'VerifyCA',
  data() {
    return {
      ambassadors: '',
      posters: '',
      refName: null,
      refType: null,
      newPoint: null,
      selectedKey: null,
      points: 0,
      loading: false,
      refPoints: {
        Registration: 1000,
        Lecture: 1500,
        Workshop: 2000,
        Event: 1250,
        RoboticsEvent: 1750,
      },
    };
  },
  firebase() {
    return {
      posters: db.ref('tasks/posters/posters'),
      points: db.ref(`points/${this.$route.params.id}`),
      ambassadors: db.ref(`ambassadors/${this.$route.params.id}`),
    };
  },
  computed: {
    totalPoints() {
      return Object.values(this.points).reduce(
        (total, current) => total + parseInt(current.value, 10), 0,
      );
    },
  },
  methods: {
    acceptReferral(key, name, type) {
      db.ref(`ambassadors/${this.$route.params.id}/referral/${key}`)
        .update({ status: 'Accepted' })
        .then(
          db.ref(`points/${this.$route.params.id}/${key}`)
            .update({ value: this.refPoints[type], reason: `Accepted ${type} referral : ${name}` }),
        );
    },
    rejectReferral(key, name, type) {
      this.$buefy.dialog.prompt({
        message: 'Reason for rejecting?',
        inputAttrs: {
          placeholder: 'Enter the reason',
        },
        onConfirm: value => this.doRejectReferral(key, name, type, value),
      });
    },
    doRejectReferral(key, name, type, reason) {
      db.ref(`ambassadors/${this.$route.params.id}/referral/${key}`)
        .update({ status: reason })
        .then(
          db.ref(`points/${this.$route.params.id}/${key}`)
            .update({ value: 0, reason: `Rejected ${type} referral - ${name} : ${reason}` }),
        );
    },
    doReject(ref, id, type, reason) {
      db.ref(`ambassadors/${this.$route.params.id}/${ref}/${id}`)
        .update({
          status: reason,
        })
        .then(() => {
          const delta = this.refPoints[type];
          const updated = parseInt(this.points[0], 10) - delta;
          return db.ref(`points/${this.$route.params.id}`).set([updated]);
        })
        .then(this.$toast.open('Rejected'));
    },
    acceptPoster(key) {
      this.$buefy.dialog.prompt({
        title: 'Accept poster',
        message: `Enter the total Points to be awarded for <b>${this.posters[key].title}</b>`,
        inputAttrs: {
          type: 'number',
          placeholder: 'Enter points',
        },
        trapFocus: true,
        onConfirm: value => this.doAcceptPoster(key, value),
      });
    },
    doAcceptPoster(key, value) {
      db.ref(`ambassadors/${this.$route.params.id}/posters/`)
        .update({ [key]: '✔️' })
        .then(
          db.ref(`points/${this.$route.params.id}/${key}`)
            .update({ value, reason: `Accepted poster: ${this.posters[key].title}` }),
        );
    },
    rejectPoster(id) {
      this.$buefy.dialog.prompt({
        title: 'Reject poster',
        message: 'Reason for rejecting poster?',
        inputAttrs: {
          placeholder: 'Enter the reason',
        },
        onConfirm: rejectReason => this.doRejectPoster(id, rejectReason),
      });
    },
    doRejectPoster(key, rejectReason) {
      db.ref(`ambassadors/${this.$route.params.id}/posters/`)
        .update({ [key]: rejectReason })
        .then(
          db.ref(`points/${this.$route.params.id}/${key}`)
            .update({ value: 0, reason: `Rejected poster: ${this.posters[key].title} - ${rejectReason}` }),
        );
    },
    updatePoints(value, reason) {
      db.ref(`points/${this.$route.params.id}`).push({
        reason,
        value,
      });
    },
    sanitizeURL(url) {
      if (!/^(?:f|ht)tps?:\/\//.test(url)) {
        return `http://${url}`;
      }
      return url;
    },
    addReferral(e) {
      e.preventDefault();
      if (this.refName == null || this.refType == null) return;
      this.loading = true;
      const { key } = db.ref(`ambassadors/${this.$route.params.id}/referral`).push();
      db.ref(`ambassadors/${this.$route.params.id}/referral/${key}`)
        .update({
          value: this.refName,
          type: this.refType,
          status: 'Accepted',
        })
        .then(
          db.ref(`points/${this.$route.params.id}/${key}`)
            .update({
              reason: `Accepted ${this.refType} referral : ${this.refName}`,
              value: this.refPoints[this.refType],
            }),
        )
        .then(() => {
          this.loading = false;
          this.refName = null;
          this.refType = null;
        });
    },
  },
};
</script>
