<template>
<div class="box">
  <b-field>
  <section>
    <b-field>
      <b-upload accept="image/*" :disabled="isUploading"
           v-model="dropFiles" multiple drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon
                  icon="upload"
                  size="is-large">
              </b-icon>
            </p>
            <p class="is-unselectable">Drop your files here and click upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div class="tags">
      <span v-for="(file, index) in dropFiles"
          :key="index" class="tag is-primary" >
        {{file.name}}
        <button v-if="!isUploading" class="delete is-small"
            type="button"
            @click="deleteDropFile(index)">
        </button>
      </span>
    </div>
  </section>
  </b-field>
  <b-field>
    <b-button icon-left="upload" type="is-primary" :loading="isUploading"
          :disabled="isUploading || !(this.dropFiles.length > 0)"
          @click="submit">
        Upload
    </b-button>
  </b-field>
</div>
</template>

<style>
.upload .upload-draggable {
  width: 100%;
}
</style>

<script>
import { storage, db } from '@/firebase';

export default {
  name: 'UploadImages',
  data() {
    return {
      dropFiles: [],
      isUploading: false,
    };
  },
  methods: {
    uploadImage(image) {
      const filename = `${Date.now()}-${image.name}`;
      return storage.ref('gallery').child(filename)
        .put(image)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => db.ref('gallery').push(url))
        .then(() => {
          const pos = this.dropFiles.indexOf(image);
          if (pos > -1) this.dropFiles.splice(pos, 1);
        });
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    submit() {
      this.isUploading = true;
      const filePromises = this.dropFiles.map(image => this.uploadImage(image));
      Promise.all(filePromises)
        .then(() => {
          this.$toast.open('Images Uploaded');
          this.isUploading = false;
        })
        .catch((e) => {
          this.$toast.open({
            message: e.message,
            type: 'is-danger',
          });
          this.isUploading = false;
        });
    },
  },
};
</script>
