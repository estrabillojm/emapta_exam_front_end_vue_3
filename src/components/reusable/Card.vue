<template>
  <div class="card">
      <div class="line"></div>
      <slot name="card-content"></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .card{
        @apply shadow bg-gray-50 rounded-lg px-5 py-5 shadow-md text-lg relative overflow-hidden;
        
        z-index:1;
    }

    .value-style{
        @apply col-span-12; /* SMALL DEVICES */
        @apply lg:col-span-6; /* LARGER DEVICES */
    }

    .principle-style{
        @apply col-span-12; /* SMALL DEVICES */
        @apply lg:col-span-4; /* LARGER DEVICES */

    }

    .card .card-h3{
        @apply ml-7 uppercase font-bold text-lg;
        @apply md:text-xl;
        color: #14273b;
    }

    .card .card-p{
        color: #3871b5;
        @apply text-justify ml-7 mt-5 mb-10;
    }

    .line{
        @apply lg:block;
        z-index:1;
        border-color: #3871b5;
    }


    .close-icon{
        @apply absolute text-red-600 top-3 cursor-pointer transition-all ease-in;
        @apply hover:text-red-400;  /* HOVER EFFECT */
        top:10px;
        right:10px;
        z-index:1;
    }

    .header-icon{
        @apply absolute text-gray-200;
        @apply md:top-2;
        z-index:-1;
        left:20px;
    }

    .header-icon-circle{
        font-size: 20rem;
        top:-90px;
        left:-110px;
    }

    .modified-icon{
        top:1.4rem;
        left:0;
    }
</style>