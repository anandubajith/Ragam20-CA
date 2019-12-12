<template>
  <section class="events section">
    <h1 class="is-size-1">Leaderboard</h1>
    <hr />

        <b-tabs v-model="activeTab" type="is-boxed" size="is-medium" >
            <b-tab-item label="By points">
                <b-table :data="leaderboard"
                         :columns="columns"
                         :striped="true"
                         :hoverable="true">
                </b-table>
            </b-tab-item>

            <b-tab-item label="By referrals">
              <div class="block">
                <b-checkbox v-model="countWorkshop">Workshop</b-checkbox>
                <b-checkbox v-model="countEvent">Events</b-checkbox>
              </div>
                <b-table :data="referralList"
                         :columns="refColumns"
                         :striped="true"
                         :hoverable="true">
                </b-table>
            </b-tab-item>
        </b-tabs>
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
      ambassadors: [],
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
      refColumns: [
        {
          field: 'name',
          label: 'Name',
        },
        {
          field: 'referrals',
          label: 'Referrals',
          width: '40',
          numeric: true,
        },
      ],
      activeTab: 0,
      showBooks: false,
      countEvent: false,
      countWorkshop: true,
    };
  },
  firebase() {
    return {
      leaderboard: db.ref('leaderboard'),
      ambassadors: db.ref('ambassadors'),
    };
  },
  computed: {
    referralList() {
      const list = [];
      this.ambassadors.forEach((person) => {
        if (person.referral) {
          let referrals = 0;
          Object.values(person.referral).forEach((item) => {
            if (item.type === 'Workshop'
               && item.status === 'Accepted'
               && this.countWorkshop) {
              referrals += 1;
            } else if (item.type === 'Event'
                && item.status === 'Accepted'
                && this.countEvent) {
              referrals += 1;
            }
          });
          list.push(
            { name: person.name, referrals },
          );
        }
      });
      return list.sort((a, b) => {
        if (a.referrals > b.referrals) return -1;
        if (a.referrals < b.referrals) return 1;
        return 0;
      });
    },
  },
  methods: {},
};
</script>
