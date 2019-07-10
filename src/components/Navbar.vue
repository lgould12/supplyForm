<template>
    <div id="navbar">
        <nav data-v-ccc41290="" class="navbar navbar-light sticky-top navbar-expand-md" style="background: rgb(255, 255, 255); border-bottom: 1px solid rgb(221, 221, 221); margin-bottom: 0px; margin-top: 0px;">
            <div data-v-ccc41290="" class="container">
                <div data-v-ccc41290="" class="navbar-brand brand-logo">
                <img data-v-ccc41290="" src="//cdn.shopify.com/s/files/1/1757/1461/files/HZ-no-city-digital-black.png?10146406607426040436" alt="The Rush Market" width="250" class="">
                </div>
            </div>
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/login">Login</router-link>
            <a class="nav-link" href="" @click="logOut">Logout</a>
            <a class="nav-link disabled">{{this.currUser}}</a>
        </nav>
    </div>
</template>

<script>
import {login} from '../firebase'

export default {
    name: 'Navbar',
    data() {
        return{
            currUser: ''
        }
    },
    created(){
        if(login.currentUser){
            this.currUser = login.currentUser.email
        }
        else{
            this.currUser = "Logged Out"
        }
    },
    methods: {
        logOut(){
            login.signOut()
            this.$router.push('/login')
        }
    }
}
</script>