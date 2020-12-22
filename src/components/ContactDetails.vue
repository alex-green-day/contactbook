<template>
  <div class="wrapper">
    <div class="header">
      <h3>Contact Details</h3>

      <div class="actions">
        <font-awesome-icon class="icon__button" icon="arrow-left" v-on:click="backTolist()" />
        <font-awesome-icon class="icon__button" icon="save" v-on:click="saveChanges()" />
      </div>
    </div>

    <div class="contact-body">
      <p>Default fields:</p>
      
      <div class="contact__properties" v-for="(property, name, index) in contact" :key="index">
        <div v-if="!(['id'].includes(name))" class="contact__properties__field" :class="{with_action: !(['id', 'age', 'name'].includes(name))}">
          <label>{{ name }}</label>
          <input type="text" v-model="contact[name]" />

          <font-awesome-icon v-if="!(['id', 'age', 'name'].includes(name))" icon="trash" v-on:click="removeField(name)" />
        </div>
      </div>

      <p>Additional fields:</p> 

      <div class="contact__additional">
        <input type="text" v-model="fieldName">
        <input type="text" v-model="fieldValue">
        <font-awesome-icon icon="plus" v-on:click="addField" title="Add New Fields" />
      </div>

    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex"
import _ from "lodash"

export default {
  name: 'ContactDetails',
  data() {
    return {
      contact: {},
      source: {},
      isModified: false,

      fieldName: '',
      fieldValue: ''
    }
  },
  computed: {
    ...mapGetters([
        'getContact',
        'getLastChanges',
        'contactList'
    ])
  },
  methods: {
    ...mapActions([
        'updateContact',
        'addContact'
    ]),
    /**
     * Method for back to contact list with check on exist changes in fields
     */
    backTolist: function () {
      if (this.isModified) {
        if (confirm('Are you sure wanna discard all unsaved changes?')) {
          this.contact = this.source;
          this.$router.push({ name: 'contacts'});
        }
      } else {
        this.$router.push({ name: 'contacts'});
      }
    },
    /**
     * Method for save changes in vuex depend of new contact or existing
     */
    saveChanges: function () {
      if (this.$route.params.id) {
        let data = {
          contact: this.contact,
          source: this.source
        }
        this.updateContact(data)
      } else {
        this.addContact(this.contact)
      }
      this.$router.push({ name: 'contacts'});
    },
    /**
     * Just add new field
     */
    addField: function () {
      if (this.fieldName && this.fieldValue) {
        this.$set(this.contact, this.fieldName, this.fieldValue)
        this.fieldName = this.fieldValue = ''
      }
    },
    /**
     * Getting index method, using sorting and cut top value of id
     * @returns {*}
     */
    getIndex: function () {
      let arraySort = this.contactList.slice()

      arraySort.sort((x, y) => {
        return y.id - x.id;
      })

      return arraySort.slice(0,1).shift().id + 1;
    },
    /**
     * Removing field by name as index
     * @param name
     */
    removeField: function (name) {
      if (confirm('Are you sure wanna delete that field?')) {
        if (String(name) in this.contact) {
          for (let k in this.contact) {
            if(~k.indexOf(name)) {
              this.$delete(this.contact, k)
            }
          }
        }
      }

    }
  },
  mounted() {
    // Check for existing contact or creating another one
    if (typeof this.$route.params.id != 'undefined') {
      const isInt = parseInt(this.$route.params.id)

      // Check for param is int value and get starting data for work with it from vuex. Source getting data for compare with
      // data without modify
      if (isInt) {
        this.contact = !this.isModified ? Object.assign({}, this.getContact(isInt)) : this.getLastChanges(this.contact)
        this.source = Object.assign({}, this.getContact(isInt));
      } else {
        this.$router.push({ name: 'contacts'});
      }
    } else {
      // Using for creating another one contact
      if (!this.isModified) {
        let id = this.getIndex()
        this.contact = {
          id,
          name: '',
          age: ''
        }
      }
    }

  },
  watch: {
    contact: {
      handler(old){
        // Compare two objects for check exist changes (using lodash)
        this.isModified = !_.isEqual(this.source, old)
      },
      deep: true
    }
  }

}
</script>