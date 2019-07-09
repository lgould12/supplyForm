<template>
  <div id="reqview">
      <innerNav></innerNav>
      <div class="alert alert-danger" role="alert" v-if="this.delError">You must be logged in as an admin to delete a request.</div>
      <div class="form-control card" v-show="allRequests.length === 0"><p>No current requests</p></div>
      <request v-for="(request,index) in allRequests" :key="index" :admin="admin" v-on:del-request="deleteRequest" :request="request"></request>
  </div>
</template>

<script>
import InnerNav from '@/components/InnerNav'
import Request from '@/components/Request'
import {db} from '../firebase'
import {login} from '../firebase'
// @ is an alias to /src

export default {
  name: 'reqview',
  components:{
    InnerNav,
    Request
  },
  data() {
      return {
        allRequests: [],
        delError: '',
        admin: false
      }
  },
  methods: {
    deleteRequest (id) {
      var user = login.currentUser
      if (user) {
        db.collection('requests').doc(id).delete()
        this.allRequests = this.allRequests.filter(request => request.id !== id)
      } else {
        this.delError = true
      }
    },
  },
  created(){
    if(login.currentUser){
        if(login.currentUser.email == "techsupport@rushmarket.com"){
            this.admin = true
        }
    }
    db.collection('requests').orderBy("locale").onSnapshot(querySnapshot => {
      this.allRequests = [],
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'date': doc.data().date,
          'locale': doc.data().locale,
          'supplies': doc.data().supplies
        }
        this.allRequests.push(data)
      })
    })
  }
}
</script>
