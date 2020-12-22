import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        items: [
            {id: 1, name: 'James', age: "20" },
            {id: 2, name: 'Phil', age: "22" },
            {id: 3, name: 'Mike', age: "19" },
            {id: 4, name: 'Elsa', age: "34" },
            {id: 5, name: 'Julia', age: "28" },
            {id: 6, name: 'Anna', age: "45" }
        ],
        last: [

        ]
    },
    getters: {
        // Get list all existing contacts
        contactList: state => {
            return state.items
        },
        // Select one contact by id
        getContact: state => id => {
            return state.items.find(item => item.id === id)
        },
        // Select changes by id for contact
        getLastChanges: state => id => {
            return state.last.find(item => item.id === id)
        }
    },
    mutations: {
        // Add new contact
        addContact (state, payload) {
            state.items.push(payload);
        },
        // Remove exist contact
        deleteContact(state, payload) {
            state.items = state.items.filter(item => item.id !== payload)
        },
        // Update contact by incoming payload and add last changes for recognize, what is need to change on rollback
        updateContact(state, payload) {
            const id = payload['source'].id;
            if (id) {
                let contactId = state.items.findIndex(item => item.id === id)
                state.items[contactId] = payload['contact']
                state.last = payload['source']
            }
        },
        // Rollback last changes
        rollBack(state) {
            let el = state.last;
            if (el) {
                const id = state.items.findIndex(item => item.id === el.id)
                state.items[id] = el;
            }
        }
    },
    actions: {
        addContact ({ commit }, payload) {
            commit('addContact', payload)
        },
        deleteContact ({ commit }, id) {
            commit('deleteContact', id)
        },
        updateContact({ commit }, payload) {
            commit('updateContact', payload)
        },
        rollBack({ commit }) {
            commit('rollBack')
        }
    }
})

export default store