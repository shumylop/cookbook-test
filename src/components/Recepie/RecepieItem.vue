<template lang='pug'>
  article.recepie(v-if='recepie')
    .recepie-container
      header.recepie-header.is-wrapper
        .recepie-header-body
          h2.h2-like.recepie-heading.truncate {{ recepie.title }}
          time.recepie-date created: {{ recepie.createdAt | date }}
        .recepie-header-controls
          button.recepie-delete-btn.icon-close(@click='deleteRecepie')
      section.recepie-body.is-wrapper: ul.recepie-ingredients
        li.recepie-ingredients__item(v-for='(item, key) in recepie.ingredients' :key='key')
          | {{ item }}

      footer.recepie-footer.is-wrapper
        router-link.link(:to='"add-recepie/" + recepie.createdAt') Add recepie
        router-link.link(:to='"edit-recepie/" + recepie.createdAt') Edit

    recepie-item(
      v-for='child in recepie.childrens'
      :key='child'
      :recepie='recepies[child]'
    )

</template>

<script>

export default {
  name: 'RecepieItem',
  props: {
    recepie: {
      type: Object,
    },
  },
  computed: {
    recepies() {
      return this.$store.getters['recepies/recepies'];
    },
  },
  methods: {
    deleteRecepie() {
      this.$store.dispatch('recepies/deleteRecepie', this.recepie);
    },
  },
};
</script>

<style scoped lang="scss">
.is-wrapper {
  padding: 15px 10px;
}
.recepie {
  max-width: 100%;
  & + & {
    margin-top: 50px;
  }
  &-container {
    position: relative;
    padding: 10px;
    background-color: rgba(216, 238, 254, .5);
    border-radius: 10px;
  }
  & > .recepie {
    margin-top: 30px;
    margin-left: 15px;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    &-body {
      max-width: calc(100% - 30px);
    }
    &-controls {
      flex-shrink: 0;
    }
  }
  &-heading {
    max-width: 100%;
  }
  &-footer {
    .link + .link {
      margin-left: 15px;
    }
  }
  &-ingredients {
    &__item {
      position: relative;
      padding-left: 20px;
      letter-spacing: 1px;
      font-weight: 500;

      &:before {
        content: '';
        position: absolute;
        left: 3px;
        top: calc(50% - 4px);
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: $error;
      }

      & + & {
        margin-top: 10px;
      }
    }
  }
  &-date {
    font-size: 12px;
    font-weight: 700;
    color: #90b4ce;
  }
}
.link {
  padding: 5px;
}
</style>
