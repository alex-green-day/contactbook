<template>
  <div class="wrapper">
    <div class="header">
      <h3>Contact Book</h3>

      <div class="actions">
        <font-awesome-icon icon="plus" v-on:click="add" title="Add" />
        <font-awesome-icon icon="undo" v-on:click="goRollback" title="Undo" />
      </div>
    </div>

    <div class="contacts-list">
      <div v-for="item in this.contactList" :key="item.id" class="contacts-list__item">
        <ContactItem :item="item"></ContactItem>
      </div>
    </div>
  </div>
</template>

<script>

import ContactItem from "@/components/ContactItem";
import {mapGetters, mapActions} from "vuex"

export default {
  name: 'Contacts',
  components: {
    ContactItem
  },
  methods: {
    ...mapActions([
       'rollBack'
    ]),
    // Just redirect to form for create new contact
    add: function () {
      this.$router.push({ name: 'details-create' })
    },
    // Rollback changes for last modified contact. In task no specified to control actions only changes, that
    // mean if remove contact or add new one, rollback is not rollback that actions
    goRollback: function () {
      if (confirm('Do you wanna rollback your last change?')) {
        this.rollBack()
        // Set reactivity for able to re-render
        this.$set(this.contactList, this.$store.getters.contactList)
      }
    }
  },
  computed: {
    ...mapGetters([
      'contactList'
    ])
  }
}
</script>


