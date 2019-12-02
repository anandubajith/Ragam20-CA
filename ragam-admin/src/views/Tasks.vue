<template>
    <section class="tasks section">
        <h1 class="is-size-1">Tasks</h1>
        <hr>
        <div class="columns">
          <div class="column">
            <div class="card">
              <header class="card-header is-unselectable">
                <p class="card-header-title">
                  Join WhatsApp Group
                </p>
              </header>
              <div class="card-content is-unselectable">
                <div class="content" v-html="tasks.whatsapp && tasks.whatsapp.description">
                </div>
              </div>
              <footer class="card-footer">
                  <a class="card-footer-item" @click="updateGroupURL()">Update Group URL</a>
                  <a class="card-footer-item" @click="editEvent('whatsapp', tasks.whatsapp)">
                    Edit Text
                    </a>
                </footer>
            </div>
          </div>
            <div class="column">
                <div class="card">
                <header class="card-header is-unselectable">
                  <p class="card-header-title">
                    Posters
                  </p>
                </header>
                <div class="card-content is-unselectable">
                  <div class="content" v-html="tasks.posters && tasks.posters.description">
                  </div>
                </div>
                <footer class="card-footer">
                  <router-link to="/posters" class="card-footer-item">Manage Posters</router-link>
                  <a class="card-footer-item"  @click="editEvent('posters', tasks.posters)">
                    Edit Text</a>
                </footer>
              </div>
            </div>
            </div>
        <div class="columns">
             <div class="column">
                <div class="card">
                <header class="card-header is-unselectable">
                  <p class="card-header-title">
                    Referrals
                  </p>
                </header>
                <div class="card-content is-unselectable">
                  <div class="content" v-html="tasks.referrals && tasks.referrals.description">
                  </div>
                </div>
                <footer class="card-footer">
                  <a class="card-footer-item"  @click="editEvent('referrals', tasks.referrals)">
                    Edit Text</a>
                </footer>
              </div>
            </div>
            <div class="column">
                 <div class="card">
                <header class="card-header is-unselectable">
                  <p class="card-header-title">
                    Feedback
                  </p>
                </header>
                <div class="card-content is-unselectable">
                  <div class="content" v-html="tasks.feedback && tasks.feedback.description">
                  </div>
                </div>
                <footer class="card-footer">
                  <router-link to="/feedback" class="card-footer-item">View Feedback</router-link>
                  <a class="card-footer-item"  @click="editEvent('feedback', tasks.feedback)">
                    Edit Text
                  </a>
                </footer>
              </div>
            </div>
        </div>
        <b-modal :active.sync="editModalActive" has-modal-card :can-cancel="false">
      <edit-event v-bind:event="editFormData" v-bind:updateEvent="updateEvent"></edit-event>
    </b-modal>
    </section>
</template>
<script>
import { db } from '../firebase';
import EditEvent from '../components/EditEvent.vue';

export default {
  name: 'Tasks',
  data() {
    return {
      tasks: {},
      editModalActive: false,
      editFormData: null,
    };
  },
  firebase: {
    tasks: db.ref('tasks'),
  },
  components: {
    EditEvent,
  },
  methods: {
    editEvent(key, event) {
      this.editFormData = event;
      this.editFormData.key = key;
      this.editModalActive = true;
    },
    updateEvent(key, event) {
      return db.ref('tasks').child(key).update(event);
    },
    doUpdateGroupURL(groupURL) {
      db.ref('tasks/whatsapp').update({
        groupURL,
      })
        .then(this.$buefy.toast.open('Updated'));
    },
    updateGroupURL() {
      this.$buefy.dialog.prompt({
        title: ' Update Whatsapp Group URL',
        message: 'Whatsapp Group URL',
        inputAttrs: {
          placeholder: 'Enter new URL here',
        },
        trapFocus: true,
        onConfirm: value => this.doUpdateGroupURL(value),
      });
    },
  },
};
</script>
