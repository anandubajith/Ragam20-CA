<template>
  <div class="box">
    <b-field label="Name">
      <b-input v-model="name" :disabled="isUploading" placeholder="Enter Name"></b-input>
    </b-field>
    <b-field label="Contact">
      <b-input v-model="contact" :disabled="isUploading" placeholder="Enter Phone number"></b-input>
    </b-field>
    <b-field label="Choose Position">
      <b-autocomplete
        v-model="position"
        placeholder="e.g. Junior Executive"
        :open-on-focus="true"
        :data="filteredPositions"
        @select="option => selected = option"
      ></b-autocomplete>
    </b-field>

    <b-field label="Choose Year">
      <b-autocomplete
        v-model="year"
        placeholder="e.g. 2019"
        :open-on-focus="true"
        :data="filteredYears"
        @select="option => selected = option"
      ></b-autocomplete>
    </b-field>

    <b-field label="Profile">
      <b-input
        maxlength="400"
        type="textarea"
        placeholder="Enter a brief profile."
        :disabled="isUploading"
        v-model="profile"
      ></b-input>
    </b-field>

    <b-field grouped position="is-centered" group-multiline>
      <b-field class="file" expanded>
        <b-upload :disabled="isUploading" accept="image/*" v-model="selectedFile">
          <a class="button is-primary">
            <b-icon icon="upload"></b-icon>
            <span>Select Photo</span>
          </a>
        </b-upload>
        <span class="file-name" v-if="selectedFile">{{ selectedFile.name }}</span>
      </b-field>
      <b-field>
        <b-button
          @click="addEvent()"
          type="is-primary"
          :disabled="isUploading || this.selectedFile.length === 0"
          :loading="isUploading"
        >Submit</b-button>
      </b-field>
    </b-field>
  </div>
</template>

<script>
import { db, storage } from '../firebase';

export default {
  data() {
    return {
      people: '',
      name: '',
      profile: '',
      position: '',
      year: '',
      contact: '',
      selectedFile: [],
      isUploading: false,
      positions: [
        'Senior Executive',
        'Junior Executive',
        'Faculty',
        'Treasurer',
        'Student Coordinator',
      ],
    };
  },
  props: {
    years: Array,
  },
  methods: {
    addEvent() {
      this.isUploading = true;
      const filename = `${Date.now()}-${this.selectedFile.name}`;
      storage
        .ref('people')
        .child(filename)
        .put(this.selectedFile)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => db.ref(`people/${this.year}`).push({
          name: this.name,
          contact: this.contact,
          url,
          position: this.position,
          profile: this.profile,
        }))
        .then(() => {
          this.$toast.open(`Person <b>${this.title}</b> added successfully`);
          this.name = '';
          this.selectedFile = [];
          this.profile = '';
          this.year = '';
          this.position = '';
          this.contact = '';
          this.isUploading = false;
        })
        .catch((e) => {
          this.$toast.open({
            type: 'is-danger',
            message: e.message,
          });
          this.isUploading = false;
        });
    },
  },

  computed: {
    filteredYears() {
      return this.years.filter(option => (
        option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      ));
    },
    filteredPositions() {
      return this.positions.filter(option => (
        option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      ));
    },
  },
};
</script>
