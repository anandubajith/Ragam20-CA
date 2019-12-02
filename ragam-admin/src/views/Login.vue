<template>
<div class="hero-body">
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-5-tablet is-5-desktop is-4-widescreen">
        <div class="box">
          <!-- <img src="../assets/nss-nitc.jpg" alt=""> -->
          <b-field label="Email">
            <b-input placeholder="eg. anandu_b180288cs@nitc.ac.in"
            type="email"
            v-model="email"
            icon="envelope">
            </b-input>
          </b-field>
         <b-field label="Password"  v-if="!reset">
            <b-input v-on:keyup.enter="login()" v-model="password" placeholder="********"
                    type="password" icon="lock" password-reveal>
            </b-input>
        </b-field>
        <b-field>
          <b-button @click="login()" :loading="inProgress" v-if="!reset" type="is-primary">
          Login
          </b-button>
          <b-button @click="performReset()" :loading="inProgress"
          v-if="reset" type="is-primary">
          Send password reset link
          </b-button>
        </b-field>
        <b-field >
          <b-button v-if="reset" icon-left="chevron-left" @click="reset = false">
          Back
          </b-button>
        </b-field>
          <div class="reset-pass has-text-centered" v-if="!reset">
            <hr>
            <b-button type="is-text" @click="reset = true;" v-if="!reset">
            Forgot password
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      reset: false,
      inProgress: false,
    };
  },
  methods: {
    login() {
      this.inProgress = true;
      auth.signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace('home');
        })
        .catch((err) => {
          this.$toast.open({
            message: `Oops. ${err.message}`,
            type: 'is-danger',
          });
          this.inProgress = false;
        });
    },
    performReset() {
      this.inProgress = true;
      auth.sendPasswordResetEmail(this.email)
        .then(() => {
          this.$toast.open(`Password reset sent to <b>${this.email}</b>`);
          this.inProgress = false;
          this.reset = false;
        })
        .catch((err) => {
          this.$toast.open({
            message: `Oops. ${err.message}`,
            type: 'is-danger',
          });
          this.inProgress = false;
        });
    },
  },
};
</script>

<style scoped>
hr {
  margin-bottom: 0.5rem
}
img {
  max-width: 300px;
  display: block;
  margin:auto;
}
</style>
