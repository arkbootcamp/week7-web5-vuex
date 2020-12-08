<template>
  <div class="container">
    <h1>halaman login {{getUser.fullName}}</h1>
    <h1>ini id user {{userId}}</h1>
  <form @submit.prevent="handeLogin">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="text" v-model="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" v-model="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['SET_INCREMENT', 'SET_DECREMENT']),
    ...mapActions(['login']),
    handleIncre () {
      this.SET_INCREMENT(10)
      // this.$store.commit('SET_INCREMENT', 10)
    },
    handleDecre () {
      this.SET_DECREMENT()
      // this.$store.commit('SET_DECREMENT')
    },
    handeLogin () {
      console.log('handle login di panggil')
      const payload = {
        username: this.username,
        password: this.password
      }
      this.login(payload)
        .then((res) => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err.response.data.error.message)
          alert(err.response.data.error.message)
        })
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    ...mapState({
      userId: state => state.idUser

    }),
    getCount () {
      return this.$store.getters.getCount
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
