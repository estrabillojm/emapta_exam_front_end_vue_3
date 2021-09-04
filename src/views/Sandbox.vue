<template>
  
</template>

<script>
export default {
    setup(){
        const validate = ()=>{
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
        }
    }
}
</script>

<style>

</style>