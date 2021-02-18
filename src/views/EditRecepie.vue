<template lang='pug'>
  .page.wrapper
    section.flow.text-center(v-if='!currentRecepie')
      h2.h3-like This recepie not defined, back to Cookbook?
      app-button(to='/' value='Back to cookbook' filled)
    template(v-else)
      app-recepie-form(:parentId='currentRecepie.parentId' :recepie='currentRecepie' action='edit')
</template>

<script>
import RecepieForm from '@/components/Recepie/RecepieForm.vue';

export default {
  components: {
    'app-recepie-form': RecepieForm,
  },
  computed: {
    recepies() {
      return this.$store.getters['recepies/recepies'];
    },
    currentRecepie() {
      const recepieId = this.$route.params.id;
      return this.recepies[recepieId];
    },
  },
};
</script>
