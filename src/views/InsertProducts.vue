<template>
  <div class="container">
    <form @submit.prevent="handelSubmit">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name product</label>
    <input type="text" v-model="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">price</label>
    <input type="number" v-model="price" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">id category</label>
    <input type="text" v-model="id_category" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">description</label>
    <input type="text" v-model="description" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
    <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">id category</label>
    <input type="file" @change="handleChangeImage" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" multiple>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'InsertProducts',
  data () {
    return {
      name: '',
      price: 0,
      id_category: null,
      description: '',
      image: null
    }
  },
  methods: {
    ...mapActions(['insertProduct']),
    handleChangeImage (e) {
      this.image = e.target.files[0]
    },
    handelSubmit () {
      const data = new FormData()
      data.append('name', this.name)
      data.append('price', this.price)
      data.append('id_category', this.id_category)
      data.append('description', this.description)
      data.append('image', this.image)

      this.insertProduct(data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
