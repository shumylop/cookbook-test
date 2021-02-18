<template lang='pug'>
  router-link.btn(v-if='to' :to='to' :class='btnClass' :disabled='disabled' exact)
    i(v-if='icon' aria-hidden='true')
    span(v-if='value') {{ value }}

  a.btn(v-else-if='href' :href='href' :class='btnClass' :disabled='disabled')
    i(v-if='icon' aria-hidden='true')
    span(v-if='value') {{ value }}

  button.btn(v-else :type='type' :class='btnClass' :disabled='disabled' @click='clicked')
    i(v-if='icon' aria-hidden='true')
    span(v-if='value') {{ value }}

</template>

<script>
export default {
  name: 'AppButton',
  props: {
    value: String,
    icon: Boolean,
    type: {
      type: String,
      default: 'button',
    },
    filled: Boolean,
    href: String,
    to: String,
    disabled: Boolean,
  },
  computed: {
    btnClass() {
      let btnClass = '';
      if (this.filled) btnClass += 'is-filled';
      if (!this.filled) btnClass += 'is-bordered';
      return btnClass;
    },

  },
  methods: {
    clicked(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 4px 24px;
  border-radius: 100px;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.03em;
  font-weight: 700;
  cursor: pointer;
  transition: box-shadow .23s ease-in;
  text-decoration: none;

  &:hover, &:focus {
    box-shadow: 0px 0px 10px rgba(35, 157, 162, 0.35);
  }

  &.is-bordered {
    border: 1px solid $primary;
    background: transparent;
    color: $headline;

    &:after {
      content: '';
      position: absolute;
      left: -2px;
      top: -2px;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      border: 1px solid transparent;
      border-radius: 100px;
      transition: border-color .23s ease-in;
    }
    &:hover {
      &:after {
        border-color: inherit;
      }
    }
  }

  &.is-filled {
    border: none;
    background-color: $primary;
    color: $text-inverse;
  }

  &:disabled,
  &.is-disabled {
    opacity: .6;
    pointer-events: none;
  }

  i {
    display: inline-flex;
    margin-right: 8px;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
</style>
