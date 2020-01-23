<template>
  <div>
    <h1>Welcome, {{username}}</h1>
    <h2 v-if="isAdmin"> Admin user!</h2>
    <h2 v-else>Regular user</h2>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  props: {
    user: { type: Object, default: {} },
    isAdmin: { type: Boolean, default: false },
    username: { type: String, default: '' }
  },
//  props: ['user', 'isAdmin'],
  data() {
    return {
     // user: {}
    }
  },
  computed: {
    // username() {
    //   return (this.user && this.user.username ? this.user.username : this.user && this.user.attributes ? this.user.attributes.email : '');
    // }
    // isAdmin() {
    //   let groups = this.groups;
    //   console.log("groups = ", groups);
    //   if (groups && groups.includes('admin')) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    // groups() {
    //   try {
    //     if (this.user.signInUserSession.accessToken.payload['cognito:groups']) {
    //       return this.user.signInUserSession.accessToken.payload['cognito:groups'];
    //     } else {
    //       return []
    //     }

    //   } catch(err) {
    //     console.log("Could not get groups")
    //     return [];
    //   }
    // }
  }
 // beforeCreate() {
  //   this.$Auth.currentAuthenticatedUser()
  //     .then(user => {
  //       this.user = user
  //       console.log("-- User = ", user);
  //       console.log(" usersession = ", user.signInUserSession);
  //     })
  //     .catch(() => console.log('not signed in...'))
  // }
};
</script>