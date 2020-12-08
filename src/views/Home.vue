<template>
<div class="container">
  <div class="card" v-for="product in getProduct" :key="product.id">
  <img src="#" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{product.name}}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  methods: {
    ...mapActions({
      getAllProduct: 'getProduct'
    })
  },
  computed: {
    ...mapGetters(['getProduct'])
  },
  mounted () {
    this.getAllProduct()
  }
}
</script>
