<template lang='pug'>
  #app
    app-header
    main.app-main
      transition(name='fade' mode='out-in')
        router-view

</template>
<script>
import Vue from 'vue';
import AppHeader from '@/components/Base/AppHeader.vue';
import AppButton from '@/components/Base/AppButton.vue';

Vue.component('app-button', AppButton);

export default {
  name: 'App',
  components: {
    'app-header': AppHeader,
  },
  async created() {
    await this.$store.dispatch('recepies/getInitialState');
  },
};
</script>

<style lang="scss">
@import '@/styles/global.scss';
</style>
