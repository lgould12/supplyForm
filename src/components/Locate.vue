<template>
        <div class="form-group col-md-4">
            <label for="inputLocation">Location</label>
            <select id="inputLocation" v-model="location" class="form-control">
                <option>Lakeside</option>
                <option>Oakview</option>
                <option>Lincoln</option>
            </select>
        </div>
</template>

<script>
export default {
  name: 'Locate',
  data () {
    return {
      location: ''
    }
  }
}
</script>
