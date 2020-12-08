<template>
  <div>
    <h1>halaman register</h1>
    <h2>{{getCount}}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Register',
  computed: {
    ...mapGetters(['getCount'])
  }
}
</script>

<style lang="scss" scoped>

</style>
