<template>
  <form v-on:submit.prevent="performSave()">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Details</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input v-model="name" :disabled="isUploading" placeholder="Enter Name">
          </b-input>
        </b-field>
        <b-field label="Contact">
          <b-input v-model="contact" :disabled="isUploading" placeholder="Enter Phone number">
          </b-input>
        </b-field>
         <b-field label="Position">
          <b-input v-model="position" :disabled="isUploading" placeholder="Enter Position">

          </b-input>
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

      </section>
      <footer class="modal-card-foot">
        <b-button @click="$parent.close()">Cancel</b-button>
        <b-button type="is-primary" @click="performSave()" :loading="inProgress">Save</b-button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'EditModal',
  data() {
    return {
      isUploading: false,
      name: this.person.name,
      profile: this.person.profile,
      contact: this.person.contact,
      year: this.person.year,
      position: this.person.position,
      inProgress: false,
    };
  },
  props: {
    person: Object,
    updatePerson: Function,
  },
  methods: {
    performSave() {
      this.inProgress = true;
      this.updatePerson(this.person.key, {
        name: this.name || '',
        profile: this.profile || '',
        contact: this.contact || '',
        position: this.position || '',
      }, this.person.year)
        .then(() => {
          this.inProgress = false;
          this.$parent.close();
          this.$toast.open('Details updated successfully');
        });
      // .catch((e) => {
      //   console.log(e);
      // });
    },
  },
};
</script>

<style>
.modal .animation-content {
  width: 100%;
  max-width: 600px !important;
}
</style>
