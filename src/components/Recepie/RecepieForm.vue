<template lang='pug'>
  form.form.recepie-form(@submit.prevent='onSubmit')
    .form-row
      app-input(
        v-model='title'
        placeholder='Please add title'
        type='text'
        :error='!title && errors.indexOf("title") !== -1'
        @input='resetFieldError("title")'
        @blur='validateField("title")')

    .form-row(v-for='(item, id) in ingredients')
      app-input(v-model='ingredients[id]' placeholder='Please describe ingredient' icon)
        button.remove-btn.icon-close(type='button' @click='removeIngredient(id)')
    .form-row.is-buttons
      app-button(type='button' @click='addIngredient' value='Add ingredient')
      app-button(type='submit' value='Save recepie' filled :disabled='!formIsValid')

</template>

<script>
import AppButton from '@/components/Base/AppButton.vue';
import AppInput from '@/components/Base/AppInput.vue';

export default {
  name: 'RecepieForm',
  components: {
    'app-button': AppButton,
    'app-input': AppInput,
  },
  props: {
    parentId: {
      type: String,
      default: '',
      required: true,
    },
    action: {
      type: String,
      required: true,
      validator: (action) => (['add', 'edit'].indexOf(action) !== -1),
    },
    recepie: Object,
  },
  data() {
    return {
      title: '',
      ingredients: {},
      alerts: false,
      errors: [],
    };
  },
  computed: {
    formIsValid() {
      return Boolean(this.title);
    },
  },
  methods: {
    addIngredient() {
      const id = new Date().getTime();
      this.$set(this.ingredients, id, '');
    },
    removeIngredient(id) {
      this.$delete(this.ingredients, id);
    },
    resetFieldError(field) {
      this.errors = this.errors.filter((e) => e !== field);
    },
    validateField(field) {
      if (this[field] !== '') return;
      if (this.errors.indexOf(field) !== -1) return;
      this.errors.push(field);
    },
    resetFormState() {
      this.title = '';
      this.ingredients = {};
    },
    async onSubmit() {
      const createdAt = this.recepie?.createdAt || new Date().getTime();
      const recepie = {
        id: createdAt,
        createdAt,
        title: this.title,
        ingredients: this.ingredients,
        childrens: [],
        isMain: !this.parentId,
        parentId: this.parentId,
      };
      await this.$store.dispatch(`recepies/${this.action}Recepie`, recepie);
      this.resetFormState();
    },
  },
  mounted() {
    if (this.recepie) {
      this.title = this.recepie.title;
      this.ingredients = this.recepie.ingredients;
    }
  },
};
</script>

<style scoped lang='scss'>
.form {
  margin: 0 auto;
  width: 100%;
  max-width: 800px;
  &-row {
    display: flex;
    align-items: center;
    margin-top: 20px;
    width: 100%;

    &.is-buttons {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  };
}
input {
  height: 40px;
  width: 100%;
}
.remove-ingredient {
  min-width: 40px;
  margin-left: -2px;
  border: 1px solid red;
  background-color: red;
}
</style>
