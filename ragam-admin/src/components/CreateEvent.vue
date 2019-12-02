<template>
  <div class="box">
    <b-field label="Add Task">
      <b-input v-model="title" :disabled="isUploading" placeholder="Enter event title"></b-input>
    </b-field>
    <b-field label="Type">
      <b-select placeholder="Select Task type" v-model="type">
        <option v-for="option in ['info', 'referral','poster']" :value="option" :key="option">{{ option }}</option>
      </b-select>
    </b-field>

    <b-field label="Description">
      <b-input maxlength="1000" type="textarea" :disabled="isUploading" v-model="description"></b-input>
    </b-field>

    <b-field>
      <b-button
        @click="addEvent()"
        type="is-primary"
        :disabled="isUploading"
        :loading="isUploading"
      >Submit</b-button>
    </b-field>
  </div>
</template>

<style>
.file-name {
  max-width: 100%;
}

@media screen and (max-width: 600px) {
  .field.is-grouped .field:not(:last-child) {
    margin-right: 0;
  }
  .control.is-expanded {
    width: 100%;
  }
}
</style>

<script>
import { db, storage } from '../firebase';

export default {
  data() {
    return {
      title: '',
      description: '',
      type: null,
      selectedFile: [],
      upcoming: false,
      isUploading: false,
    };
  },
  methods: {
    slugify(string) {
      const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
      const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------';
      const p = new RegExp(a.split('').join('|'), 'g');

      return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
    },
    addEvent() {
      this.isUploading = true;
      // const filename = `${Date.now()}-${this.selectedFile.name}`;
      db.ref('tasks')
        .push({
          title: this.title,
          type: this.type,
          description: this.description,
        })
        .then(() => {
          this.$toast.open(`Task <b>${this.title}</b> added successfully`);
          this.title = '';
          this.description = '';
          this.type = null;
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
};
</script>
