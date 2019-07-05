<template>
      <tr @submit.prevent="onSubmit">
          <td> <input type="text" class="form-control" id="validationDefault01" placeholder="Other" v-model="item.iName" required> </td>
          <td> <input type="text" class="form-control" id="validationDefault02" placeholder="Qty per box" v-model="item.qty" required></td>
          <td>
            <input @click="onSubmit" type="submit" class="form-control" value="Add To List">
          </td>
      </tr>
</template>

<script>
export default {
  name: 'Other',
  data () {
    return {
      item: {
        iName: '',
        qty: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('item-added', this.item)
      this.item.iName = ''
      this.item.qty = ''
    }
  }
}
</script>
