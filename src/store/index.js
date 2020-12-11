import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    name: '',
    user: {},
    idUser: null || localStorage.getItem('id'),
    token: null || localStorage.getItem('token'),
    products: [],
    pagination: null
  },
  mutations: {
    SET_INCREMENT (state, data) {
      state.count = state.count + data
      // state.count ++
    },
    SET_DECREMENT (state) {
      state.count = state.count - 1
    },
    SET_USER (state, payload) {
      state.user = payload
      state.token = payload.token
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    },
    REMOVE_TOKEN (state) {
      state.token = null
    },
    SET_PAGINATION (state, payload) {
      state.pagination = payload
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:2020/v1/users/login', payload)
          .then((res) => {
            console.log('success')
            const result = res.data.result
            // context.state.user = res.data.result
            localStorage.setItem('token', result.token)
            localStorage.setItem('id', result.id)
            localStorage.setItem('refreshToken', result.refreshToken)
            context.commit('SET_USER', result)
            context.dispatch('interceptorRequest')
            resolve(result)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    refreshToken (context, refreshToken) {
      axios.get('http://localhost:2020/v1/resfresh', { token: refreshToken })
    },
    getProduct (context, noPage = 1) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:2020/v1/products?page=' + noPage)
          .then((res) => {
            context.commit('SET_PRODUCTS', res.data.result.products)
            context.commit('SET_PAGINATION', res.data.result.pagination)
            resolve(res.data.result.products)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    insertProduct (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/v1/products', payload)
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        if (error.response.status === 401) {
          if (error.response.data.error.message === 'invalid token') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            localStorage.removeItem('refreshToken')
            context.commit('REMOVE_TOKEN')
            alert('tidak boleh mengubah token ya.. bro')
            router.push('/auth/login')
          } else if (error.response.data.error.message === 'jwt expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            localStorage.removeItem('refreshToken')
            context.commit('REMOVE_TOKEN')
            alert('session sudah habis bro... ! silahkan login kembali')
            router.push('/auth/login')
          }
        }
        return Promise.reject(error)
      })
    }
  },
  getters: {
    getCount (state) {
      return state.count
    },
    getUser (state) {
      return state.user
    },
    isLogin (state) {
      return state.token !== null
    },
    getProduct (state) {
      return state.products
    },
    getPagination (state) {
      return state.pagination
    }
  },
  modules: {
  }
})
