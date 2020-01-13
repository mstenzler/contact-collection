<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-auto">
        <q-banner class="bg-primary text-white text-center">
         Item List:
        </q-banner>

        <div v-if=loading>Loading...</div>
        <div v-else-if="error" class="q-pt-md q-pb-md q-gutter-sm">Got error! {{ error }}</div>
        <div v-else-if="listItems">
          <EntryList :items="listItems"></EntryList>
        </div>

        <!-- <amplify-connect :query="createListEntriesQuery"
            @done="onCreateFinished">
          <template slot-scope="{ loading, data, errors }">
            <div v-if=loading>Loading...</div>
            <div v-else-if="errors.length < 0" class="q-pt-md q-pb-md q-gutter-sm">Got errors! {{ errors }}</div>
            <div v-else-if="data">
              Data = {{ data }}
              <EntryList :items="data"></EntryList>
            </div>
          </template>
        </amplify-connect> -->
       
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
  import * as queries from '../graphql/queries';
  import EntryList from '@/components/EntryList.vue';

//  const CreateUserInfoEntryMutation = mutations.createUserInfoEntry


export default {
  name: 'Admin',
  components: {
    EntryList,
    ...components
  },
  data() {
    return {
      name: '',
      email: '',
      description: '',
      status: '',
      error: '',
      listItems: null,
      loading: true
    }
  },
  computed: {
    formData() {
      let data = {
        name: this.name || null,
        email: this.email || null,
        description: this.description || null
      };
      console.log("FormData = ", data);
      return data;
    },
    createAddUserInfoEntryMutation() {
      let data = this.formData;
      console.log("In createUserContactMutation. data = ", data);
      return graphqlOperation(mutations.createUserContact, {input: data });
    },
    createListEntriesQuery() {
      console.log("In createListEntries.");
      //let ret = graphqlOperation(queries.listUserContacts, {filter: null, limit: 1000, nextToken: null});
      return this.$Amplify.API.graphql({ query: queries.listUserContacts, variables: {filter: null, limit: 1000, nextToken: null }, authMode: 'AMAZON_COGNITO_USER_POOLS' } );
      //console.log("createListEntriesQuery = ", ret);
      //return ret;
    },
  },
  methods: {
    async getListEntriesQuery() {
      console.log("In createListEntries.");
      this.loading = true;
      try {
        //let ret = graphqlOperation(queries.listUserContacts, {filter: null, limit: 1000, nextToken: null});
        let result = await this.$Amplify.API.graphql({ query: queries.listUserContacts, variables: {filter: null, limit: 1000, nextToken: null }, authMode: 'AMAZON_COGNITO_USER_POOLS' } )
        console.log("createListEntriesQuery = ", result);
        console.log("result.data.listUserContacts = ", result.data.listUserContacts);
        console.log("result.data.listUserContacts.items = ", result.data.listUserContacts.items);
        if ( result.data.listUserContacts && result.data.listUserContacts.items ) {
          this.listItems = result.data.listUserContacts.items;
        } else {
          this.error = "Can't get items!"
        }
      } catch ( err ) {
        console.log("Caught error: ", err );
        this.error = err;
      }
      this.loading = false;
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
      console.log('Entry created!');
    }
  },
  async mounted() {
    console.log("mounted!")
    this.getListEntriesQuery();
  },
  beforeCreate() {
    console.log("mutation = ", mutations.createUserContact )
  }
};
</script>