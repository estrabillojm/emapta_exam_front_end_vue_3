<template>
    <div class="parent-layout">
        <slot name="form-modal"></slot>
        <div class="nav-container pt-5">
            <slot name="nav-content"></slot>
        </div>
        <div class="values-container">
            <slot name="values-content"></slot>
        </div>

        <div class="principles-container">
            <slot name="principles-content"></slot>
        </div>
    </div>
</template>

<style>

    .parent-layout{
        @apply grid grid-cols-12 gap-5;
        margin:0 auto;
    }

    .nav-container{
        /* FOR SMALL DEVICES */
        @apply col-span-12 px-5 pb-5 border bg-white;
        @apply lg:px-24;
        position:fixed;
        z-index:3;
        width:100%;
    }

    .values-container, .principles-container{
        @apply col-span-12 grid grid-cols-12 gap-5 px-5;
        @apply lg:px-24;
    }

    .values-container{
        @apply bg-blue-100;
        padding-bottom:10rem;
        margin-top:7.3rem;
        -webkit-clip-path: polygon(100% 0, 100% 89%, 62% 100%, 0 92%, 0 49%, 0% 0%);
        clip-path: polygon(100% 0, 100% 89%, 62% 100%, 0 92%, 0 49%, 0% 0%);
    }

    .principles-container{
        @apply mb-32
    }
</style>