<template>
    <div id="innverNav">
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <router-link class="nav-link" to="/orderForm">Order Form</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/reqView">View Requests</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/editor">Edit Supplies</router-link>
      </li>
    </ul>
    </div>
</template>

<script>
export default {
    name: 'innerNav'
}
</script>