import axios from 'axios'
import Swal from 'sweetalert2'
const values = {
    namespaced: true,
    state: {
        values: [],
        value: null
    },
    mutations: {
        GET_ALL_VALUES: (state, data)=>{
            state.values = data
        },
        FETCH_SINGLE_VALUE: (state, data)=>{
            state.value = data
        }
    },
    actions: {
        getAllValues: ({ commit })=>{
            axios.get(`/values`).then(res=>{
                commit('GET_ALL_VALUES', res.data)
            })
        },
        fetchSingleValue: async ({commit}, id)=>{
            await axios.get(`/values/${id}`).then(res=>{
                commit('FETCH_SINGLE_VALUE', res.data)
            })
        },
        saveValues: ({ dispatch }, values)=>{
            axios.post(`/values`, {
                alias: values.alias,
                description: values.description
            }).then(res=>{
                dispatch('getAllValues')
            })
        },
        updateValues:  ({ dispatch }, values)=>{
            axios.put(`/values/${values.id}`, {
                alias: values.alias,
                description: values.description
            }).then(res=>{
                dispatch('getAllValues')
            })
        },
        deleteValues: ({ dispatch }, id)=>{
            Swal.fire({
                title: 'Do you really want to delete this data?',
                showDenyButton: false,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `Delete`,
                confirmButtonColor: '#c02d2d'
              }).then((result) => {
                if (result.isConfirmed) {
                  axios.delete(`/values/${id}`).then(res=>{
                    dispatch("getAllValues")
                  })
                  Swal.fire('Deleted', '', 'error')
                }
            })
        },
        
        
    }
}

export default values