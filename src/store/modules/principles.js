import axios from 'axios'
import Swal from 'sweetalert2'
const principles = {
    namespaced: true,
    state: {
        principles: [],
        principle: null
    },
    mutations: {
        GET_ALL_PRINCIPLES: (state, data)=>{
            state.principles = data
        },
        FETCH_SINGLE_PRINCIPLE: (state, data) => {
            state.principle = data
        }
    },
    actions: {
        getAllPrinciples: async ({ commit })=>{
            await axios.get(`/principles`).then(res=>{
                commit('GET_ALL_PRINCIPLES', res.data)
            })
        },
        savePrinciples: ({ dispatch }, principles)=>{
            axios.post(`/principles`, {
                alias: principles.alias.toLowerCase(),
                description: principles.description.toLowerCase()
            }).then(res=>{
                dispatch('getAllPrinciples')
            })
        },
        updatePrinciples: ({ dispatch }, principle)=>{
            axios.put(`/principles/${principle.id}`, {
                alias: principle.alias.toLowerCase(),
                description: principle.description.toLowerCase()
            }).then(res=>{
                dispatch('getAllPrinciples')
            })
        },
        deletePrinciples: ({ dispatch }, id)=>{
            Swal.fire({
                title: 'Do you really want to delete this data?',
                showDenyButton: false,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: `Delete`,
                confirmButtonColor: '#c02d2d'
              }).then((result) => {
                if (result.isConfirmed) {
                  axios.delete(`/principles/${id}`).then(res=>{
                    dispatch("getAllPrinciples")
                  })
                  Swal.fire('Deleted', '', 'error')
                }
            })
        },
        fetchSinglePrinciple: async ({ commit }, id)=>{
            await axios.get(`/principles/${id}`).then(res=>{
                commit('FETCH_SINGLE_PRINCIPLE', res.data)
            })
        }
    },
}

export default principles