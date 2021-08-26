<template>
  <Layout>
    <template v-slot:form-modal>
      <div :class="{'fixed': true, 'add-edit-form':true,'disabled': !showOption}" v-if="!showOption">
        <span>
          <Icon iconName="close" class="text-red-600 absolute right-2 top-2 cursor-pointer" @click="showOption=true"/>
        </span>
        <form @submit.prevent="validateData()">
          <div class="flex justify-center">
              <img src="../assets/img/jd.png" alt="emapta-jd-logo" class="jd-logo">
          </div>
          <div class="flex flex-col px-16">
              <div class="form-group flex flex-col w-full mt-3" v-if="!editMode">
                  <label for="type" :class="{'text-red-600': err.type != ''}">Type*</label>
                  <select id="type" :class="{'pl-1 border w-full p-3': true, 'border-red-600': err.type != ''}" v-model="data.type">
                      <option value="" class="text-gray-400">Select Type*</option>
                      <option value="0" class="text-gray-600">Values</option>
                      <option value="1" class="text-gray-600">Principles</option>
                  </select>
                  <p class="text-red-600">{{ err.type }}</p>
              </div>

              <div class="form-group flex flex-col w-full mt-3" v-if="editMode">
                  <label for="" >Type*</label>
                  <input type="text" :class="{'pl-1 border w-full h-11 p-3 cursor-not-allowed':true}" disabled=true value="Values" v-if="data.type == 0">
                  <input type="text" :class="{'pl-1 border w-full h-11 p-3 cursor-not-allowed':true}" disabled=true value="Principles" v-else>
              </div>
              <div class="form-group flex flex-col w-full mt-3">
                  <label for="alias" :class="{'text-red-600': err.alias != ''}">Alias*</label>
                  <input type="text" id="alias" :class="{'pl-1 border w-full h-11 p-3 uppercase':true, 'border-red-600': err.alias != ''}" v-model="data.alias">
                  <p class="text-red-600">{{ err.alias }}</p>
              </div>
              <div class="form-group flex flex-col w-full mt-3">
                  <label for="description" :class="{'text-red-600': err.description != ''}">Description*</label>
                  <textarea id="description" cols="20" rows="5" :class="{'border p-3 lowercase': true, 'border-red-600': err.description != ''}" v-model="data.description"></textarea>
                  <p class="text-red-600">{{ err.description }}</p>
              </div>
              <div class="form-group flex mt-3">
                  <Button :btnName="btnName" class="border save-update-btn save md:mr-2"/>
                  <Button type="button" btnName="Cancel" @click="showOption=true" class="border save-update-btn hover:bg-gray-200"/>
              </div>
          </div>     
        </form>
      </div>
    </template>
    <template v-slot:nav-content>
      <div class="flex justify-between">
        <img src="../assets/img/logo.png" alt="emapta-logo" class="max-h-20" />
        <div class="flex items-end">
          <div class="relative">
            <Button class="rounded-md text-gray-700 text-sm relative z-10 add-btn hidden md:block" btnName="Add New" @click="toggleOptions()"/>
            <Icon iconName="add_circle" class="btn-add-icon" @click="toggleOptions()"/>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:values-content>
      <div class="col-span-12 values-header relative z-0 mt-3" v-if="values">
        <h2 class="inline">The
          <span v-if="values.length > 0">{{ values.length }}</span> <span class="font-bold text-blue-600 text-3xl"> Value<span v-if="values.length > 1">s</span></span> of
          Agile Manifesto in Software Development
        </h2>
        <div class="yellow-line overflow-hidden"></div>
      </div>
      <div class="flex justify-center col-span-12" v-if="values.length == 0">
        <img src="../assets/img/noData.png" alt="no data found" class="no-data">
      </div>
      <Card v-for="(val, index) in values" :key="index" class="value-style" v-else>
        <template v-slot:card-content>
          <Icon iconName="cancel" class="close-icon" @click="deleteValues(val.id)"/>
          <p :class="{'header-icon z-10 font-bold': true,'text-9xl': index < 8,'text-8xl': index > 8,'modified-icon': index > 8,}">
            {{ index + 1 }}
          </p>
          <Icon iconName="radio_button_unchecked" class="header-icon header-icon-circle"/>
          <h2 class="card-h3 border-b-2 relative border-yellow-600 w-3/4">
            {{ val.alias }}
            <Icon iconName="hdr_weak" class="icon-line text-yellow-600"/>
          </h2>
          
          <p class="card-p">{{ val.description }}</p>
          <div class="flex justify-end">
            <Button btnName="Modify" class="modify-btn blue-btn" @click="editData(val.id, '0')"/>
          </div>

        </template>
      </Card>
    </template>
    <template v-slot:principles-content>
      <div class="col-span-12 values-header relative mt-5" v-if="values">
        <h2 class="inline">
          The <span v-if="principles.length > 0">{{ principles.length }}</span> <span class="font-bold text-yellow-600 text-3xl"> Principle<span v-if="principles.length > 1">s</span></span>
           of Agile Manifesto in Software
          Development
        </h2>
        <div class="blue-line overflow-hidden"></div>
      </div>
      <div class="flex justify-center col-span-12" v-if="principles.length == 0">
        <img src="../assets/img/noData.png" alt="no data found" class="no-data">
      </div>
      <Card v-for="(principle, index) in principles" :key="index" class="principle-style" v-else>
        <template v-slot:card-content>
          <Icon iconName="cancel" class="close-icon" @click="deletePrinciple(principle.id)"/>
          <p :class="{'header-icon z-10 font-bold': true,'z-10': true,'font-bold': true,'text-9xl': index <= 8,'text-8xl': index >= 8,'modified-icon': index >= 8,}">
            {{ index + 1 }}
          </p>
          <Icon iconName="radio_button_unchecked" class="header-icon header-icon-circle"/>
          <h2 class="card-h3 border-b-2 relative border-blue-600 w-3/4">
            {{ principle.alias }}
            <Icon iconName="hdr_weak" class="icon-line text-blue-600"/>
          </h2>
          <p class="card-p">{{ principle.description }}</p>
          <div class="flex justify-end">
            <Button btnName="Modify" class="modify-btn yellow-btn" @click="editData(principle.id, '1')"/>
          </div>
        </template>
      </Card>
    </template>
  </Layout>
</template>
<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import { useStore } from "vuex"
import Swal from 'sweetalert2'
export default {
  setup() {
    const store = useStore()
    const values = computed(() => store.state.values.values)
    const principles = computed(()=> store.state.principles.principles)
    const getAllValues = () => store.dispatch(`values/getAllValues`)
    const showOption = ref(true)
    const editMode = ref(false)
    const btnName = ref("Save")
    const data = ref({
      id: null,
      type: '',
      alias: '',
      description: ''
    })

    const err = ref({
      type: '',
      alias: '',
      description: ''
    })

    const clearFields = () => {
      data.value.id = null
      data.value.type = ''
      data.value.alias = ''
      data.value.description = ''
    }

    // SHOW/HIDE THE FORM MODAL
    const toggleOptions = () => {
      btnName.value = "Save"
      editMode.value = false
      showOption.value = !showOption.value
      clearFields()
    }

    // PATH OF VUEX, DEPENDS IN THE CONDITION IF VALUE OR PRINCIPLES
    const path = ref('')

    // FUNCTION OF SAVING DATA
    const saveData = ()=> {    
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: false,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: btnName.value,
        denyButtonText: `Don't save`,
      }).then((result) => {
        if (result.isConfirmed) {
          if(data.value.type=="0"){
            if(!editMode.value){
              path.value = 'values/saveValues'
            }else{
              path.value = 'values/updateValues'
            }
          }else{
            if(!editMode.value){
              path.value = 'principles/savePrinciples'
            }else{
              path.value = 'principles/updatePrinciples'
            }
          }
          store.dispatch(path.value, data.value)
          showOption.value = true
          clearFields()
          Swal.fire('Data Saved!', '', 'success')
        } 
      })
    }
    // FORM VALIDATION
    const validateData = () => {
      // CHECK IF THE TYPE CONTAINS A VALUE
      if(data.value.type){
        err.value.type = ''
        err.value.alias = ''
        err.value.description = ''
        // CHECK IF THE ALIAS CONTAINS A VALUE
        if(data.value.alias){
          // CHECK IF THE ALIAS HAVE 3 MORE CHARACTERS
          if(data.value.alias.length > 2){
            // CHECK IF THE DESCRIPTION HAVE A VALUE
            if(data.value.description){
              // CHECK IF THE DESCRIPTION HAVE 7 MORE CHARACTERS
              if(data.value.description.length > 7){
                // CHECK IF THE STATE IS ABOUT TO SAVE OR UPDATE
                if(data.value.type == '0'){
                  
                  let val = values.value.map(val=> val.alias.toLowerCase())
                  if(val.includes(data.value.alias.toLowerCase()) && !editMode.value){
                    err.value.alias = 'Alias already used in Values'
                  }else{
                    saveData()
                  }
                }else{
                  let principle = principles.value.map(val=> val.alias.toLowerCase())
                  if(principle.includes(data.value.alias.toLowerCase()) && !editMode.value){
                    err.value.alias = 'Alias already used in Principles'
                  }else{
                    saveData()
                  }
                }
              }else{
                err.value.description = 'Alias must consist of 7 or more characters*'
              }
            }else{
              err.value.description = "Description Field is required*"
            }
          }else{
            err.value.alias = "Alias must consist of 3 or more characters*"
          }
        }else{
          err.value.alias = "Alias Field is required*"
        }
      }else{
        err.value.type = "Type Field is required*"
      }
    }
    const getAllPrinciples = () => store.dispatch(`principles/getAllPrinciples`)
    const deleteValues = (id) => {
      store.dispatch(`values/deleteValues`, id)
    }
    const fetchSingleValue = async (id) => await store.dispatch(`values/fetchSingleValue`, id)
    const fetchSinglePrinciple = async (id) => await store.dispatch(`principles/fetchSinglePrinciple`, id)
    const singleValue = computed(()=> store.state.values.value)
    const singlePrinciple = computed(()=> store.state.principles.principle)
    const editData = (id, type) => {
      btnName.value = "Update"
      editMode.value = true
      data.value.type = type
      showOption.value = false
      if(type=="0"){
        fetchSingleValue(id)
      }else{
        fetchSinglePrinciple(id)
      }
      setTimeout(()=>{
        if(type=="0"){
          data.value.id = singleValue.value.id
          data.value.alias = singleValue.value.alias
          data.value.description = singleValue.value.description
        }else{
          data.value.id = singlePrinciple.value.id
          data.value.alias = singlePrinciple.value.alias
          data.value.description = singlePrinciple.value.description
        }
      },600)
    }
    const deletePrinciple = (id) => {
      store.dispatch(`principles/deletePrinciples`, id)
    }
    onMounted(() => {
        getAllValues()
        getAllPrinciples()
    });
    return {
      values, showOption, principles, data, err, editMode, btnName,
      toggleOptions, deleteValues, deletePrinciple, validateData, editData
    };
  },
};
</script>
