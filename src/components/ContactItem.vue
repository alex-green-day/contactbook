<template>
  <div class="contacts-list__item-wrapper">
      <div class="contacts-list__item__description">
        <small>Contact id: {{ item.id }}</small>
        <h4>{{ item.name }}</h4>
        <p>Age {{ item.age }}</p>
      </div> 

      <div class="contacts-list__item__actions">
        <font-awesome-icon icon="eye" v-on:click="showDetails(item.id)" title="Contact Detail" />
        <font-awesome-icon icon="trash" v-on:click="remove(item.id)" title="Remove" />
    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex"

export default {
  name: 'ContactItem',
  props: {
    item: Object
  },
  methods: {
    ...mapActions([
        'deleteContact'
    ]),
    // Removing selected contact by id from vuex
    remove: function (id) {
      if (confirm('Do you wanna delete that contact?')) {
        this.deleteContact(id);
      }
    },
    // Redirect to selected contact details with param id, using Vue-router method
    showDetails: function (id) {
      this.$router.push({ name: 'details', params: { id: id } })
    }
  }
}
</script>