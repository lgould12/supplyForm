<template>
    <div class="card">
        <div class="card-header form-group row justify-content-end">
            <div class="col-sm col-form-label"> {{ request.locale }} </div>
            <div class="col-sm-auto col-form-label"> {{ request.date }} </div>
            <button type="button" class="btn btn-danger col-sm-2 col-form-label" @click="$emit('del-request',request.id)">Delete Request</button>
        </div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Supply</th>
                        <th scope="col">Qty per box</th>
                        <th scope="col">Number Requested</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in request.supplies" :key="index" v-show="item.numRequested != 0">
                        <td>{{ item.supplyInfo.item.iName }}</td>
                        <td>{{item.supplyInfo.item.qty}}</td>
                        <td>{{item.numRequested}}</td>
                        <td>{{item.supplyInfo.category}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Request',
  props: {
    request: {
      id: Number,
      locale: String,
      date: String,
      supplies: Array
    },
    admin: {
      default: false
    }
  },
  methods: {
    sortRequest () {
      this.request.supplies.sort(function (a, b) {
        var nameA = a.supplyInfo.category.toLowerCase(); var nameB = b.supplyInfo.category.toLowerCase()
        if (nameA < nameB) // sort string ascending
        { return -1 }
        if (nameA > nameB) { return 1 }
        return 0 // default return value (no sorting)
      })
    }
  },
  created () {
    this.sortRequest()
  }
}
</script>
