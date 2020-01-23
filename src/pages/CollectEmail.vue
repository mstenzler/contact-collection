<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-auto">
        <q-card class="intro-card text-white" 
         style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
         >
         <q-card-section>
          <div class="text-h4">
            Crafted Crowds - New Site coming soon.
          </div>
        </q-card-section>

        <q-card-section>
          Sign up to be informed about the new Crafted Crowds site!
          Coming soon. Sign up.
        </q-card-section>
      </q-card>


        <amplify-connect :mutation="createAddUserContactMutation"
            @done="onCreateFinished">
          <template slot-scope="{ loading, mutate, errors }">
            <form class="q-pa-sm">
              <div class="q-pa-sm" style="max-width: 1000px">
                <q-input type="text" ref="name" outline label="Name" clearable lazy-rules 
                   :rules="[ val => val && val.length > 0 || 'Missing Name']"
                   v-model="name" />
              
                <q-input type="text" ref="email" outline color="teal" label="Email" clearable lazy-rules  
                  :rules="[ val => val && val.length > 0 || 'Missing Email', val => testEmail(val) || 'Bad email format' ]"
                  v-model="email" />
              
                <q-input type="text" ref="phone" outline color="teal" label="Phone" clearable lazy-rules v-model="phone"
                  mask="(###) ### - ####"
                  hint="Mask: (###) ### - ####" />
              
                <p>&nbsp;</p>
                <label>What are you looking for?</label>
                <q-option-group v-model="interests" :options="lookingOptions" label="Interests" type="checkbox" inline />
  
                <label>What types of events do you like?</label>
                <q-option-group v-model="interests" :options="interestOptions" label="Interests" type="checkbox" inline />
                <p>&nbsp;</p>
                <q-btn :disabled="loading" @click.stop.prevent="mutate" color="primary" label="Enter Info"></q-btn>

                <div v-show="errors && errors.length > 0" class="error"><span v-for="(errorMsg, index) in errors" class="errorMessage"> - {{ errorMsg }}</span></div>
              </div>
            </form>

          </template>
        </amplify-connect>
       
        <div v-show="status">{{ status }}</div>
        <div v-show="error"> {{ error }}</div>
      </div>
    </div>
  </q-page>

</template>

<script>
  import { components } from 'aws-amplify-vue';
  import  { API, graphqlOperation } from "aws-amplify";
  import * as mutations from '../graphql/mutations';

//  const CreateUserInfoContactMutation = mutations.createUserInfoContact


export default {
  name: 'home',
  components: {
    ...components
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      description: '',
      interests: [],
      status: '',
      error: '',
      errorTest: ["First Error!", "second Error!"],
      lookingOptions: [ {
        label: 'Dating', 
        value: 'Dating'
      },
      {
        label: 'New Friends',
        value: 'New Friends'
      },
      {
        label: 'Bussiness Networking',
        value: 'Bussiness Networking'
      },
      {
        label: 'Advertising My Bussiness',
        value: 'Advertising My Bussiness'
      }
      ],
      interestOptions: [ 
      {
        label: 'Happy Hours',
        value: 'Happy Hours'
      },
      {
        label: 'Dinning',
        value: 'Dinning'
      },
      {
        label: 'Game Nights',
        value: 'Game Nights'
      },
      {
        label: 'Biking',
        value: 'Biking'
      }
      ]
    }
  },
  computed: {
    formData() {
      let data = {
        name: this.name || null,
        email: this.email || null,
        phone: this.phone || null,
        description: this.description || null,
        interests: this.interests
      };
      console.log("FormData = ", data);
      return data;
    },
    createAddUserContactMutation() {
      let data = this.formData;
      console.log("In createUserContactMutation. data = ", data);
      return graphqlOperation(mutations.createUserContact, {input: data });
    }
  },
  methods: {
    clearForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.description = '';
      this.interests = [];
      this.error = '';
      this.$refs.name.resetValidation();
      this.$refs.email.resetValidation();
    },
    async onSubmit() {
      let data = this.formData;
      console.log("In onSubmit. formData = ", data);
      let response = await API.graphql(graphqlOperation(mutations.createUserContact, {input: data}));
      console.log("Got graphQL response: ", response);
      this.status = response;

    },
    testEmail(value) {
      let pattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return pattern.test(value);
    },
     onCreateFinished() {
      console.log('Contact created!');
      this.clearForm();
      this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: 'Submssion Sucessful!'
          });
    }
  },
  beforeCreate() {
    console.log("mutation = ", mutations.createUserContact )
  }
};
</script>