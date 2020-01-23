<template>
  <div class="auth">
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <q-input label="Username" v-model="form.username"/>
      <q-input  label="Password" :type="passwordType" v-model="form.password">
        <template v-slot:append>
          <q-icon :name="showPasswordIcon" @click="toggleShowPassword" />
        </template>
      </q-input>
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
      showPassword: false,
      form: {
        username: '',
        password: '',
        error: ''
      }
    }
  },
  computed: {
     passwordType() {
      let type = (this.showPassword ? 'text' : 'password');
      console.log("pasword type = ", type);
      return type;
    },
    showPasswordIcon() {
      return (this.showPassword ? 'visibility_off' : 'visibility');
    }
  },
  methods: {
    toggleShowPassword() {
    //  console.log("In toggleShowPassword. this.showPassword = ", this.showPassword);
      this.showPassword = !this.showPassword;
      //console.log("End Toggle. this.showPassword = ", this.showPassword);
    },
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