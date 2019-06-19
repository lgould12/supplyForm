<template>
  <div id="app">
    <nav data-v-ccc41290="" class="navbar navbar-light sticky-top navbar-expand-md" style="background: rgb(255, 255, 255); border-bottom: 1px solid rgb(221, 221, 221); margin-bottom: 0px;">
      <div data-v-ccc41290="" class="container">
        <div data-v-ccc41290="" class="navbar-brand brand-logo">
          <img data-v-ccc41290="" src="//cdn.shopify.com/s/files/1/1757/1461/files/HZ-no-city-digital-black.png?10146406607426040436" alt="The Rush Market" width="250" class="">
        </div>
        <input class="form-control" type="password" v-model="password" placeholder="Password" >
        <button @click="authenticate" class="btn btn-default">Log In</button>
        <button @click="logout" class="btn btn-default">Log Out</button>

      </div>
    </nav>
    <body class="app header-fixed">
      <div class="app-body">
        <main class="main">
          <tabs>
            <tab name="Order Form" :selected="true">
              <div class="card">
                <div class="card-header form-group row">
                  <locate ref="locator"></locate>
                  <div class="alert alert-danger" role="alert" v-if="this.locError">Please input a location!</div>
                </div>
                <div class="card-body">
                  <category ref="category" class="col-sm-3" @cat-changed="changeCat"></category>
                  <entry v-for="(supply,index) in supplyList" :key="index" :item="supply.item" v-show="currCategory === supply.category" ref="supplies"></entry>
                  <other @item-added="addItem"></other>

                  <div class="row justify-content-md-center">
                    <button @click="recordForm" class="btn btn-primary" type="submit">Submit form</button>
                  </div>
                </div>
              </div>
            </tab>
            <tab name="View Requests" ref="requests">
              <div class="alert alert-danger" role="alert" v-if="this.delError">You must be logged in to delete a request.</div>
              <div class="form-control card" v-show="allRequests.length === 0"><p>No current requests</p></div>
              <request v-for="(request,index) in allRequests" :key="index" :admin="admin" v-on:del-request="deleteRequest" :request="request"></request>
            </tab>
          </tabs>
        </main>
      </div>
    </body>
  </div>
</template>

<script>
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import Locate from '../components/Locate.vue'
import Request from '../components/Request.vue'
import Other from '../components/Other.vue'
import Entry from '../components/Entry.vue'
import axios from 'axios'
import Category from '../components/Category.vue'
// import Login from '../components/Login.vue'
import uuid from 'uuid'

export default {
  name: 'Home',
  data () {
    return {
      supplyList: [
        {
          id: 1,
          item: 'Post It Notes(Square)',
          category: 'Office Supplies'
        }
      ],
      recordedList: [],
      request: {
        id: 0,
        date: '',
        locale: '',
        supplies: []
      },
      allRequests: [
      ],
      reqId: 0,
      locError: false,
      delError: false,
      currCategory: 'Office Supplies',
      admin: false,
      password: '',
      corrPass: ''
    }
  },

  components: {
    Other,
    Entry,
    // Login,
    Tab,
    Tabs,
    Request,
    Locate,
    Category
  },

  methods: {
    addItem (item) {
      axios.post('http://my-json-server.typicode.com/lgould12/requestForm/supplies/',
        { id: uuid.v4(),
          item: item,
          category: this.currCategory })
        .then(res => { this.supplyList = [...this.supplyList, res.data] })
        .catch(err => console.log(err))
    },
    changeCat (category) {
      this.currCategory = category
    },
    recordForm () {
      if (this.$refs.locator.location === '') {
        this.locError = true
      } else {
        this.locError = false
        var i
        this.recordedList = []
        for (i = 0; i < this.supplyList.length; i++) {
          if (this.$refs.supplies[i] !== 0) {
            this.recordedList.push({ supplyInfo: this.supplyList[i], numRequested: this.$refs.supplies[i].count, category: this.supplyList[i].category })
          }
        }
        this.reqId++
        axios.post('http://my-json-server.typicode.com/lgould12/requestForm/requests/',
          {
            id: uuid.v4(),
            locale: this.$refs.locator.location,
            supplies: this.recordedList,
            date: new Date().toLocaleString()
          })
          .then(res => { this.allRequests = [...this.allRequests, res.data] })
          .catch(err => console.log(err))
      }
    },
    deleteRequest (id) {
      if (this.admin) {
        this.allRequests = this.allRequests.filter(request => request.id !== id)
        /* axios.delete(`http://my-json-server.typicode.com/DigitalTaco/supplyForm/requests/${id}`)
              .then(res=>this.allRequests = this.allRequests.filter(request => request.id !== id))
              .catch(err => console.log(err));
            */
      } else {
        this.delError = true
      }
    },
    authenticate () {
      if (this.password === this.corrPass[0].pass) {
        this.admin = true
      }
      this.delError = false
      this.password = ''
    },
    logout () {
      this.admin = false
    }
  },
  created () {
    axios.get('http://my-json-server.typicode.com/lgould12/requestForm/supplies/')
      .then(res => { this.supplyList = res.data })
      .catch(err => console.log(err))
    axios.get('http://my-json-server.typicode.com/lgould12/requestForm/requests/')
      .then(res => { this.allRequests = res.data })
      .catch(err => console.log(err))
    axios.get('http://my-json-server.typicode.com/lgould12/requestForm/password/')
      .then(res => { this.corrPass = res.data })
      .catch(err => console.log(err))
  }
}
</script>
