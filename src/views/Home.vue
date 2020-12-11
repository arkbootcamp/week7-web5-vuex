<template>
<div class="container">
  <h2 v-setfont:big.style="'yellow'">halaman home</h2>
  <div class="card" v-for="product in getProduct" :key="product.id">
  <img src="#" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{product.name}}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
<!-- pagination -->
  <nav aria-label="...">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li v-for="noPage in getPagination.totalPage" class="page-item" :class="[getPagination.currentPage == noPage ? 'active': '']" :key="noPage"><a class="page-link" href="#" @click.prevent="getAllProduct(noPage)">{{noPage}}</a></li>
    <li class="page-item"
    :class="[getPagination.currentPage == getPagination.totalPage ? 'disabled': '']">
      <a class="page-link" href="#" @click.prevent="getAllProduct(parseInt(getPagination.currentPage)+1)">Next</a>
    </li>
  </ul>
</nav>
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
    ...mapGetters(['getProduct', 'getPagination'])
  },
  mounted () {
    this.getAllProduct()
  },
  directives: {
    setfont: {
      bind: function (el, binding) {
        console.log(binding.modifiers.style)
        // if (binding.value === 'blue') {
        //   el.style.color = 'blue'
        // } else if (binding.value === 'red') {
        //   el.style.color = 'red'
        // } else {
        //   el.style.color = 'salmon'
        // }
        // el.style.color = binding.value ? binding.value : 'black'
        el.innerHTML = binding.value
        // kondisi ke 2 => arg
        if (binding.arg === 'big') {
          el.style.fontSize = '50px'
        } else if (binding.arg === 'small') {
          el.style.fontSize = '8px'
        } else {
          el.style.fontSize = '13px'
        }

        // kondisi ke 3 => modifiers
        if (binding.modifiers.style) {
          el.style.fontStyle = 'italic'
        }
      }
    }
  }
}
</script>
