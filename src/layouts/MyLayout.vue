<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated >
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>
        <q-toolbar-title>
          <router-link :to="{ name: 'collect' }" tag="span" style="cursor: pointer">
            <q-toolbar-title>Crafted Crowds</q-toolbar-title>
          </router-link>

        </q-toolbar-title>

        <div v-if="signedIn">
          <q-icon name="person"></q-icon>
          {{username}}
          <q-btn  @click="signOut" label="Sign Out" class="t-button"></q-btn>
        </div>
        <div v-else><q-icon name="person_outline" /></div>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Crafted Crowds App</q-item-label>

        <q-item clickable :to="{name: 'collect'}">
          <q-item-section avatar>
            <q-icon name="note"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Signup with Email</q-item-label>
            <q-item-label caption>Signup receive information on app..</q-item-label>
          </q-item-section>
        </q-item>

         <q-item clickable :to="{name: 'brunch'}">
          <q-item-section avatar>
            <q-icon name="event"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Brunch</q-item-label>
            <q-item-label caption>Reserve seat for event</q-item-label>
          </q-item-section>
        </q-item>

        <div v-if="isLoggedIn">
          <q-item clickable :to="{name: 'profile', params: { user: user, isAdmin: true }}">
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Profile</q-item-label>
              <q-item-label caption>view your profile</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div v-if="isAdmin">
           <q-item clickable :to="{name: 'admin'}">
            <q-item-section avatar>
              <q-icon name="settings"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Admin</q-item-label>
              <q-item-label caption>List and update items</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div v-if="isLoggedIn">
          <q-item clickable @click="signOut">
            <q-item-section avatar>
              <q-icon name="stop"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </div>

        <div v-if="!isLoggedIn">
          <q-item clickable :to="{name: 'auth'}">
            <q-item-section avatar>
              <q-icon name="group"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Login/SignUp</q-item-label>
              <q-item-label caption>Login or Signup</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view  :user="user" :isAdmin="isAdmin" :username="username"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MyLayout',
  data () {
    return {
      user: null,
      signedIn: 'false',
      leftDrawerOpen: false//this.$q.platform.is.desktop
    }
  },
  computed: {
    username() {
      return (this.user && this.user.username ? this.user.username : this.user && this.user.attributes ? this.user.attributes.email : '');
    },
    isAdmin() {
      let groups = this.groups;
      console.log("groups = ", groups);
      if (groups && groups.includes('siteadmin')) {
        return true;
      } else {
        return false;
      }
    },
    groups() {
      try {
        if (this.user.signInUserSession.accessToken.payload['cognito:groups']) {
          return this.user.signInUserSession.accessToken.payload['cognito:groups'];
        } else {
          return []
        }

      } catch(err) {
        console.log("Could not get groups")
        return [];
      }
    },
    isLoggedIn () {
      return this.signedIn
    }
  },
  mounted () {
    this.$AmplifyEventBus.$on('authState', info => {
      this.signedIn = true
    });
    this.$Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user;
        this.signedIn = true;
      })
      .catch(() => {
        this.user = null;
        this.signedIn = false;
      })
  },
  beforeCreate () {
   
  },
  methods: {
    openURL,
    async signOut () {
      await this.$Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err))
      this.signedIn = false
      parent.signedIn = false
      this.$router.push({ name: 'auth' })
    }
  }
};
</script>

<style>

.q-page {
  margin-top: 1.5em;
}
</style>