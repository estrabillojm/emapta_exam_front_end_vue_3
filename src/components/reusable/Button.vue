<template>
    <button>
      {{ btnName }}
    </button>
</template>

<script>
export default {
    props: ['btnName']
}
</script>

<style>
 
    .add-btn{
        @apply text-lg text-gray-700 relative px-5 py-2 border rounded-md hover:text-gray-700 hover:bg-gray-200 z-0 transition-all;
        transition:.5s;
    }

    .modify-btn{
        @apply absolute bottom-0 right-0 py-2 px-3 text-gray-800 rounded-tl-md bg-transparent overflow-hidden  transition-all ease-in;   
        transition:.5s;
    }

    .blue-btn{
        @apply bg-blue-300;
        @apply hover:bg-blue-600 hover:text-white;
         
    }

    .yellow-btn{
        @apply bg-yellow-300;
        @apply hover:bg-yellow-600 hover:text-white;
    }

    .save-update-btn{
        @apply px-5 py-2 border rounded-md  z-0 transition-all;
        transition:.5s;
    }

    .save{
        @apply bg-blue-500 hover:text-gray-700 hover:bg-blue-200 text-gray-100;
    }
    .cancel{

    }
</style>