<template>
 <form v-on:submit.prevent="performSave()">
    <div class="modal-card">
      <header class="modal-card-head">
          <p class="modal-card-title">Edit Event</p>

      </header>
      <section class="modal-card-body">
        <b-field label="Title">
            <b-input v-model="title">
            </b-input>
        </b-field>

        <b-field label="Description">
          <b-input type="textarea" v-model="description">
          </b-input>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <b-button @click="$parent.close()">
          Cancel
        </b-button>
        <b-button type="is-primary"
            @click="performSave()" :loading="inProgress">
          Save
        </b-button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: 'EditModal',
  data() {
    return {
      title: this.event.title,
      description: this.event.description,
      upcoming: this.event.upcoming,
      inProgress: false,
    };
  },
  props: {
    event: Object,
    updateEvent: Function,
  },
  methods: {
    performSave() {
      this.inProgress = true;
      this.updateEvent(
        this.event.key,
        {
          title: this.title || '',
          description: this.description || '',
        },
      )
        .then(() => {
          this.inProgress = false;
          this.$parent.close();
          this.$buefy.toast.open('Event updated successfully');
        });
    },
  },
};
</script>

<style>
.modal .animation-content {
    width:100%;
    max-width: 600px !important;
}
</style>
