<template>
  <div class="q-pa-md">
    <q-card class="item-card">
      <q-card-section>
        <div v-if="items.length <=0" class="text-h2">
          No Items Yet!
        </div>
        <div v-else class="text-h3">
          Entry Items ({{items.length}})
        </div>
      </q-card-section>


      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Phone</th>
            <th class="text-left">Description</th>
            <th class="text-left">Interests</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
            <td class="text-left">{{item.name}}</td>
            <td class="text-left">{{item.email}}</td>
            <td class="text-left">{{item.phone || 'null'}}</td>
            <td class="text-left">{{item.description || 'null'}}</td>
            <td class="text-left">
              <span v-for="(interest, subIndex) in item.interests" :key="subIndex">
                <template v-if="subIndex > 0"> - </template>{{interest}}
              </span>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>
  </div>   
</template>

<script>
export default {
  name: 'EntryList',
  // components: {
  //   EntryList,
  //   ...components
  // },
  props: {
    items: [Array, Object]
  },
  data() {
    return {
      error: ''
    }
  },
  computed: {
  
  },
  methods: {
    
  },
  mounted() {
    console.log(" in EntryList.beforeCreate. this.items = ", this.items )
  }
};
</script>
<style lang="sass" scoped>
.item-card
  width: 100%
  max-width: 1200px
</style>