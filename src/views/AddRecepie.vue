<template lang='pug'>
  .page.wrapper
    template(v-if='parentTitle === undefined')
      h2.h3-like.text-center This recepie not defined, please back to cookbook or create new one.
    template(v-else)
      h2.h3-like.text-center You add recepie to {{ parentTitle }}
      app-recepie-form(:parentId='parentId' action='add')
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
    parentId() {
      return this.$route.params.id || '';
    },
    parentTitle() {
      if (this.parentId === '') return 'main directory';
      return this.recepies[this.parentId]?.title;
    },
  },
};
</script>
