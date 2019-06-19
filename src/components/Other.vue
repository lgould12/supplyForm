<template>
    <form @submit.prevent="onSubmit">
        <div class="form-group row justify-content-md-center">
            <div class="col-sm-3">
                <input type="text" class="form-control" id="validationDefault01" placeholder="Other" v-model="item" required>
            </div>
            <div class="col-sm-3">
                <input type="submit" class="form-control" value="Add To List">
            </div>
        </div>
    </form>
</template>

<script>
export default {
  name: 'Other',
  data () {
    return {
      item: ''
    }
  },
  methods: {
    onSubmit () {
      this.$emit('item-added', this.item)
      this.item = null
    }
  }
}
</script>
