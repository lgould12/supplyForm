<template>
  <div id="orderForm">
      <innerNav></innerNav>
            <div class="card">
                <div class="card-header form-group row">
                  <locate ref="locator"></locate>
                  <div class="alert alert-danger" role="alert" v-if="this.locError">Please input a location!</div>
                </div>
                <div class="card-body">
                  <category ref="category" class="col-sm-3" @cat-changed="changeCat"></category>
                  <table class="table">
                    <thead>
                      <tr>
                          <th scope="col">Supply</th>
                          <th scope="col">Qty per box</th>
                          <th scope="col">Number Needed</th>
                      </tr>
                    </thead>
                    <tbody>
                      <entry v-for="(supply,index) in supplyList" :key="index" :item="supply.item" v-show="currCategory === supply.category" ref="supplies"></entry>
                      <other @item-added="addItem"></other>
                    </tbody>
                  </table>
                  <div class="row justify-content-md-center">
                    <button @click="recordForm" class="btn btn-primary" type="submit">Submit form</button>
                  </div>
                </div>
              </div>
  </div>
</template>

<script>
import InnerNav from '@/components/InnerNav'
import {login} from '../firebase'
import Category from '@/components/Category'
import Entry from '@/components/Entry'
import Other from '@/components/Other'
import Locate from '@/components/Locate'
import {db} from '../firebase'

// @ is an alias to /src

export default {
  name: 'orderForm',
  components:{
    InnerNav,
    Category,
    Entry,
    Other,
    Locate
  },
  data(){
      return{
        locError: false,
        currCategory: 'Office Supplies',
        supplyList: [],
        recordedList: []
      }
  },
  methods:{
      recordForm(){
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
            db.collection('requests').add({
                locale: this.$refs.locator.location,
                supplies: this.recordedList,
                date: new Date().toLocaleString()
            })
        }
      },
      addItem(item){
        db.collection('supplies').add({
            item: item,
            category: this.currCategory 
        })
      },
      changeCat(category){
        this.currCategory = category
      }
  },
  created(){
    db.collection('supplies').orderBy("item").onSnapshot(querySnapshot => 
    {
      this.supplyList = [],
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'item': doc.data().item,
          'category': doc.data().category
        }
        this.supplyList.push(data)
      })
    })

  }
}
</script>
