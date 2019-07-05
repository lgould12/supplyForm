<template>
  <tr @submit.prevent="onSubmit">
      <td> <input type="text" class="form-control" id="validationDefault01" placeholder="Category" v-model="supply.category" required> </td>
      <td> <input type="text" class="form-control" id="validationDefault02" placeholder="Supply" v-model="supply.item.iName" required></td>
      <td> <input type="text" class="form-control" id="validationDefault03" placeholder="Qty per box" v-model="supply.item.qty" required></td>

      <td>
        <input @click="onSubmit" type="submit" class="form-control" value="Change">
      </td>
  </tr>
</template>

<script>
export default {
  name: 'SupplyEdit',
  data () {
    return {
      count: '0'
    }
  },
  props: {
    supply: {
      item: {
        iName: '',
        qty: ''
      },
      category: ''
    }
  },
  methods: {
    onSubmit () {
      this.$emit('supply-updated',this.supply)
    }
  }
}
</script>
