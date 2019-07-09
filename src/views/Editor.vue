<template>
  <div id="editor">
      <innerNav></innerNav>
              <div class="card">
                <div class="card-body">
                  <category ref="category" class="col-sm-3" @cat-changed="changeCat"></category>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Supply</th>
                        <th scope="col">Qty per box</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <supplyEdit @supply-updated="updateSupply" v-for="(supply,index) in supplyList" :key="index" :supply="supply" v-show="currCategory === supply.category" ref="supplies"></supplyEdit>
                    </tbody>
                  </table>
                </div>
              </div>
  </div>
</template>

<script>
import InnerNav from '@/components/InnerNav'
import Category from '@/components/Category'
import SupplyEdit from '@/components/SupplyEdit'
import {db} from '../firebase'
// @ is an alias to /src

export default {
  name: 'editor',
  components:{
    InnerNav,
    Category,
    SupplyEdit
  },
  data(){
      return {
        currCategory: 'Tagging Supplies',
        supplyList: []
      }
  },
  methods:{
    changeCat (category) {
      this.currCategory = category
    },
    updateSupply(supply){
      db.collection('supplies').doc(supply.id).update({
        item: supply.item,
        category: supply.category
      })
    },
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
