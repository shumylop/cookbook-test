<template lang='pug'>
  header.app-header#nav
    router-link.app-header__link(to='/' exact) Cookbook
    router-link.app-header__link(to='/add-recepie' exact) Add main recepie
</template>

<script>

export default {
  name: 'AppHeader',
};

</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  &__link {
    font-weight: 700;
    color: $primary;
    text-decoration: none;

    &.router-link-exact-active {
      color: $error;
      text-decoration: underline;
    }
    & + & {
      margin-left: 20px;
    }
  }
}
</style>>
