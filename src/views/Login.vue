<template>
    <div class="card mx-auto" style="width: 18rem;">
      <div class="card-header" >
        Login
      </div>
      <div class="card-body">
        <input class="form-control" type="text" v-model="email" placeholder="Email" style="margin: 3px">
        <input class="form-control" type="password" v-model="password" placeholder="Password" style="margin: 3px">
        <button @click="authenticate" class="btn btn-dark" style="margin: 3px">Log In</button>
        <button @click="logout" class="btn btn-dark" style="margin: 3px">Log Out</button>
      </div>
    </div>
</template>

<script>
import {login} from '../firebase.js'

export default {
  name: 'Login',

  data () {
    return {
      password: '',
      email: ''
    }
  },
  methods: {
    authenticate () {
      login.signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
        console.log(error.code)
        alert(error.message)
      })
      this.email = ""
      this.password = ""
      this.$router.push('/')
    },
    logout () {
      login.signOut()
    },
  }
}
</script>