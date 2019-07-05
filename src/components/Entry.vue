<template>
    <tr>
            <td> {{item.iName}} </td>
            <td> {{item.qty}}</td>
            <td>
                <input type="number" class="form-control" placeholder="0" v-model="count">
            </td>
    </tr>
</template>

<script>
export default {
  name: 'Entry',

  data () {
    return {
      count: '0'
    }
  },
  props: {
    item: {
      iName: '',
      qty: ''
    }
  }
}
</script>
