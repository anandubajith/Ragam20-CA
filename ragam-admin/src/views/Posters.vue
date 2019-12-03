<template>
  <section class="section links">
    <div class="columns is-centered is-mobile" style="margin-bottom:2em;">
      <div class="column is-full-tablet is-half-desktop box">
        <b-field label="Add Poster">
          <b-input v-model="title" :disabled="inProgress" placeholder="Enter Title"></b-input>
        </b-field>
        <b-field label="Writeup">
          <b-input type="textarea" :disabled="inProgress" v-model="writeup"></b-input>
        </b-field>

        <b-field grouped position="is-centered" group-multiline>
          <b-field class="file" expanded>
            <b-upload :disabled="isUploading" accept="image/*" v-model="selectedFile">
              <a class="button is-primary">
                <b-icon icon="upload"></b-icon>
                <span>Select Image</span>
              </a>
            </b-upload>
            <span class="file-name" v-if="selectedFile">{{ selectedFile.name }}</span>
          </b-field>
          <b-field>
            <b-button
              @click="addLink()"
              type="is-primary"
              :disabled="isUploading || this.selectedFile.length === 0"
              :loading="isUploading"
            >Submit</b-button>
          </b-field>
        </b-field>
      </div>
    </div>

    <div class="columns is-centered is-mobile">
      <div class="column is-full-tablet is-half-desktop box">
        <div class="media" v-for="(poster, key) in posters" :key="key">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="poster.image" />
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <h3 class="is-size-5">{{ poster.title }}</h3>
              <p v-html="poster.writeup"  v-linkified>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.content p {
 white-space: pre-wrap;
    word-break: break-word;
}
</style>
<script>
import { db, storage } from '../firebase';

export default {
  name: 'Links',
  data() {
    return {
      posters: '',
      title: '',
      image: '',
      selectedFile: [],
      writeup: '',
      inProgress: false,
      isUploading: false,
    };
  },
  firebase: {
    posters: db.ref('tasks/posters/posters'),
  },
  methods: {
    addLink() {
      this.inProgress = true;
      const filename = `${Date.now()}-${this.selectedFile.name}`;
      storage
        .ref('posters')
        .child(filename)
        .put(this.selectedFile)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(image => db.ref('tasks/posters/posters').push({
          title: this.title,
          image,
          writeup: this.writeup,
        }))
        .then(() => {
          this.image = '';
          this.title = '';
          this.writeup = '';
          this.selectedFile = [];
          this.$toast.open('Link added successfully');
          this.inProgress = false;
        });
      // .catch(e => console.log(e));
    },
    confirmRemoveLink(key, title) {
      this.$dialog.confirm({
        title: 'Delete Event',
        message: `Are you sure you want to remove <b>${title}</b> ?`,
        confirmText: 'Delete Link',
        type: 'is-danger',
        onConfirm: () => this.removeLink(key),
      });
    },
    removeLink(key) {
      db.ref('links')
        .child(key)
        .remove()
        .then(() => {
          this.$toast.open({
            message: 'Link removed',
            type: 'is-danger',
          });
        });
    },
  },
};
</script>
