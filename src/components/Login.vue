<template>
    <div class="col-md-auto">
        <div class="form-group row justify-content-md-center">
            <div class="col-sm-auto">
                <input class="form-control" type="password" name="password" v-model="passwordInput" placeholder="Password" >
            </div>
            <div class="col-sm-auto">
                <button class="form-control" type="button" v-on:click="login">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      passwordInput: ""
    }
  },
  props: {
    password: ""
  },
  methods: {
    login () {
      if (this.passwordInput == this.password) {
        this.$emit('authenticated', true)
                }
    }
  }
}
</script>
