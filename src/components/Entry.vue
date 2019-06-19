<template>
    <form>
        <div class="form-group row justify-content-md-center">
            <label class="col-sm-3 col-form-label"> {{item}} </label>
            <div class="col-sm-3">
                <input type="number" class="form-control" placeholder="0" v-model="count">
            </div>
        </div>
    </form>
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
      type: String,
      required: true,
      default: 'Error'
    }
  }
}
</script>
