<template>
  <section class="section links">
    <div class="columns is-centered is-mobile" style="margin-bottom:2em;">
      <div class="column is-full-tablet is-half-desktop box">
        <b-field label="Search for CA" style="text-align:center"></b-field>
        <b-tabs position="is-centered">
          <b-tab-item label="By Name">
            <b-field label="Enter Name">
              <b-input v-model="name" placeholder="Enter CA Name  "></b-input>
            </b-field>
          </b-tab-item>
          <b-tab-item label="By Referral Code">
            {{ selected }}
            <b-field label="Enter Referral Code">
              <b-autocomplete
                rounded
                v-model="refid"
                :data="filteredRefIDArray"
                placeholder="e.g. jQuery"
                field="ref_id"
                @select="option => { $router.push(`/verify/${option['.key']}`); }"
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
            </b-field>
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
    <div class="columns is-centered is-mobile">
      <div class="column is-full-tablet is-half-desktop box">
        <!-- {{ CAs}} -->
        <ul>
          <li v-for="(person, key) in filteredDataArray.slice(0).sort()" :key="key">
            <router-link :to=" 'verify/'+person['.key']">{{person.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
// import orderBy from 'lodash.orderby';
import { db } from '../firebase';

export default {
  name: 'CAList',
  data() {
    return {
      selected: '',
      links: '',
      title: '',
      url: '',
      name: '',
      CAs: [],
      refid: 'T19-',
      inProgress: false,
    };
  },
  firebase: {
    CAs: db.ref('ambassadors').orderByChild('name'),
  },
  computed: {
    filteredDataArray() {
      return this.CAs.filter((option) => {
        if (option.name) {
          return (
            option.name
              .toString()
              .toLowerCase()
              .indexOf(this.name.toLowerCase()) >= 0
          );
        }
        return [];
      });
    },
    filteredRefIDArray() {
      return this.CAs.filter((option) => {
        if (option.ref_id) {
          return (
            option.ref_id
              .toString()
              .toLowerCase()
              .indexOf(this.refid.toLowerCase()) >= 0
          );
        }
        return [];
      });
    },
  },
};
</script>
