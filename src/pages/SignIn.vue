<template>
  <div class="auth">
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <q-input square filled color="teal" label="Username" v-model="form.username"/>
      <q-input square filled color="teal" label="Password" type="password" v-model="form.password"/>
      <div class="row">
        <q-btn type="submit" label="Sign In" class="authButton">
          <template v-slot:loading>
            <q-spinner-facebook/>
          </template>
        </q-btn>
      </div>
    </form>
  </div>
</template>
<script>

//import { Notify } from 'quasar'

export default {
  name: 'SignIn',
  data () {
    return {
      form: {
        username: '',
        password: '',
        error: ''
      }
    }
  },
  methods: {
    async signIn () {
      //let that = this;
      const { username, password } = this.form
      console.log(`logging in with username = ${username}, password = ${password}`);
      try {
        await this.$Auth.signIn(username, password)
        console.log("After await signing");
        this.$AmplifyEventBus.$emit('authState', 'signedIn')
        parent.signedIn = true;
        this.$router.push({ name: 'profile' })
      } catch( err ) {
        console.error("Got Error! ", err);
        if (err.message) {
          //this.$q.notify(err.message);
          this.error = err.message;
          this.$q.notify({
            message: err.message,
            color: 'red'
          });
        }
        else {
          this.$q.notify({
            message: 'An Error has Occured',
            color: 'red'
          });
        }
      }
    }
  }
};
</script>
<style>
.authButton {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #2196f3;
  border: none;
  color: white;
  outline: none;
}
.auth {
  margin: 0 auto;
  width: 460px;
}
</style>