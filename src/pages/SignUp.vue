<template>
  <div class="auth q-pa-md">
    <h2>{{ formState === 'signUp' ? 'Sign Up' : 'Confirm Sign Up' }}</h2>
    <form>
      <div v-if="formState === 'signUp'">
        <q-input label="Username" name="username" ref="username" v-model="form.username" 
        :rules="[val => !!val || 'Field is required', val => val.length > 3 || 'Please use at least 3 characters']"
        />
        <q-input
          ref="password"
          name="password"
          label="Password"
          :type="passwordType"
          v-model="form.password"
          :rules="[ val => val.length > 6 || 'Please use at least 6 characters']"
         >

          <template v-slot:append>
            <q-icon :name="showPasswordIcon" @click="toggleShowPassword" />
          </template>
        </q-input>
        <q-input
          name="confirmPassword"
          ref="confirmPassword"
          label="Confirm Password"
          :type="passwordType"
          v-model="form.confirmPassword"
          :rules="[ val => val.length > 6 || 'Please use at least 6 characters', val => val === form.password || 'Passwords Must Match']"
         >
          <template v-slot:append>
            <q-icon :name="showPasswordIcon" @click="toggleShowPassword" />
          </template>
        </q-input>
        <q-input  label="E-mail" name="email" ref="email" v-model="form.email" 
        :rules="[val => !!val || 'Field is required']"
        />
        <div class="row">
          <q-btn type="submit" @click.prevent="ignUp" label="Sign Up" class="authButton">
            <template v-slot:loading>
              <q-spinner-facebook/>
            </template>
          </q-btn>
          <q-btn @click="formState = 'confirmSignUp'" class="authButton" label="Confirm Signup"></q-btn>
        </div>
      </div>
      <div v-if="formState === 'confirmSignUp'">
        <q-input label="Username" name="username" ref="username" v-model="form.username" 
        :rules="[val => !!val || 'Field is required', val => val.length > 3 || 'Please use at least 3 characters']"
        />
        <q-input  v-model="form.authCode"
         :rules="[val => !!val || 'Field is required']"

        />
        <div class="row">
          <q-btn type="submit" @click.prevent="confirmSignUp" label="Verification code" class="authButton">
            <template v-slot:loading>
              <q-spinner-facebook/>
            </template>
          </q-btn>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'SignUp',
  props: ['toggle'],
  data () {
    return {
      formState: 'signUp',
      showPassword: false,
      errorMessage: '',
      successMessage: '',
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        formError: false
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
      console.log("In toggleShowPassword. this.showPassword = ", this.showPassword);
      this.showPassword = !this.showPassword;
      console.log("End Toggle. this.showPassword = ", this.showPassword);
    },
    checkSignUpFields() {
      this.$refs.username.validate()
      this.$refs.password.validate()
      this.$refs.confirmPassword.validate()
      this.$refs.email.validate()

      if (this.$refs.username.hasError || this.$refs.password.hasError ||
          this.$refs.confirmPassword.hasError || this.$refs.email.hasError ) {
        return false;
      } else {
        return true
      }
    },
    async signUp () {
      if (this.checkSignUpFields()) {
        const { username, password, email } = this.form
        this.$Auth.signUp({
          username, password, attributes: { email }
        }).then(data => {
          console.log("Success! data = ", data);
          this.successMessage = "Signed up!";
          this.formState = 'confirmSignUp'
          this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: 'Submitted'
          });
        }).catch((e) => {
          console.log("GOT ERROR: ", e);
          this.showeError(e.message || e);
        });
      }
    },
    async confirmSignUp () {
      const { username, authCode } = this.form
      this.$Auth.confirmSignUp(username, authCode).then(data => {
        this.toggle();
      }).catch( (err) => {
        this.showeError(err.message || err);
      })
    },
    showeError(msg) {
      this.$q.notify({
        message: msg,
        color: 'red'
      })
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


