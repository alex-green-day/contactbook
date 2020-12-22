<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

/**
 * Just a wrapper component for init router views
 */
export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
@import "./src/assets/scss/style.scss";
</style>