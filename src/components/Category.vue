<template>
        <div class="form-group row">
            <label for="colFormLabel" class="col-form-label col-sm"> Category: </label>
            <select v-model="category" class="form-control col-sm-10" @change="alterCategory">
                <option>Tagging Supplies</option>
                <option>Office Supplies</option>
                <option>Shipping/Receiving Supplies</option>
                <option>Cleaning Supplies</option>
                <option>Bathroom Supplies</option>
                <option>Breakroom Supplies</option>
                <option>Build Supplies</option>
                <option>Build Tools</option>
            </select>
        </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      category: ''
    }
  },
  methods: {
    alterCategory () {
      this.$emit('cat-changed', this.category)
    }
  }
}
</script>
