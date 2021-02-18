<template lang='pug'>
  .form-field(:class='fieldClass')
    p.form-field__title(v-if='title') {{ title }}
    label.form-field__label(:class='labelClass')
      input.input(
        :type='type'
        :readonly='readonly'
        :maxlength='maxlength'
        :size='size'
        :placeholder='placeholder'
        :name='name'
        v-bind:value='value'
        @input='$emit("input", $event.target.value)'
        @keypress='$emit("keypress", $event)'
        @focus='onFocus'
        @blur='$emit("blur", $event)'
      )
      slot

</template>

<script>
const INPUT_TYPES = ['text', 'number', 'email', 'password', 'tel'];
export default {
  name: 'AppInput',
  props: {
    value: String,
    type: {
      type: String,
      default: 'text',
      validator: (type) => (INPUT_TYPES.indexOf(type) !== -1),
    },
    placeholder: String,
    name: String,
    icon: Boolean,
    error: Boolean,
    title: String,
    readonly: Boolean,
    maxlength: String,
    size: String,
  },
  computed: {
    fieldClass() {
      let fieldClass = '';
      if (this.error) fieldClass = ' is-error';
      if (this.readonly) fieldClass += ' readonly';
      return fieldClass;
    },
    labelClass() {
      let labelClass = `is-${this.type}`;
      if (this.icon) labelClass += ' is-icon';
      return labelClass;
    },
  },

  methods: {
    onFocus(e) {
      this.$emit('focus', e);
    },
  },
};
</script>

<style lang="scss">
input {
  width: 100%;
  height: 48px;
}

input[type='number'] {
  -moz-appearance: textfield;
}
input[type='number']:hover,
input[type='number']:focus {
    /* -moz-appearance: number-input; */
    -moz-appearance: textfield;
}

input,
textarea {
  display: block;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.05em;
  border: none;
  border: 1px solid $primary;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: $bg-main;
  -webkit-appearance: none;
  color: $text;

  &:focus,
  &:active {
    outline: none;
    /* border-color: $dark; */
    box-shadow: 0px 0px 10px rgba(35, 157, 162, 0.35);

    &::placeholder {
      opacity: 0;
      transition: opacity .23s ease-in;
    }

  }
  &::placeholder {
    color: $secondary;
    transition: opacity .23s ease-in;
  }
}

input,
button{
  &[type='submit'] {
    min-width: 200px;
  }
}

.form input {
  width: 100%;
}

.form-field {
  position: relative;
  width: 100%;
}

.form-field + .form-field,
.form-field + .form-row,
.form-row + .form-field ,
.form-row + .form-row{
  margin-top: 16px;
}

.error-message {
  padding: 0 16px;
  font-size: 10px;
  line-height: 1.8;
  letter-spacing: 0.05em;
  color: $error;
}

.form-field.readonly {
  input {
    border-color: $secondary;
    color: $secondary;
  }

  .form-field__title {
    color: $headline;
  }
}

.form-field.is-error {
  input {
    border-color: $error;
    color: $error;
  }
  .form-field__title {
    color: $error;
  }
}

.form-field__label {
  position: relative;
  display: block;

  &.is-icon .input{
    padding-right: 30px;
  }

  .icon-close {
    position: absolute;
    right: 7px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.form-field__title {
  padding: 0 16px;
  font-size: 9px;
  line-height: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: left;
  color: $headline;
}
</style>
