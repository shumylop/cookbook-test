<template lang='pug'>
  .page.wrapper
    template(v-if='sortedRecepies.length > 0')
      app-recepie-item(v-for='(item, i) in sortedRecepies' :key='i' :recepie='recepies[item]')

    .page-empty.flow(v-else)
      h2.h3-like You do not have any recepie, do you want add someone?
      app-button(to='/add-recepie' value='Add recepie' filled)
</template>

<script>
import RecepieItem from '@/components/Recepie/RecepieItem.vue';

export default {
  name: 'Cookbook',
  components: {
    'app-recepie-item': RecepieItem,
  },
  computed: {
    recepies() {
      return this.$store.getters['recepies/recepies'];
    },
    sortedRecepies() {
      return this.$store.getters['recepies/sortedMainRecepies'];
    },
    process() {
      return process.env;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-empty {
  text-align: center;
}
</style>
