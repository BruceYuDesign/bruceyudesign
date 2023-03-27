<template>
    <div v-if=" useLoadStore().isLoading "
        class="load"
        >
        <svg class="load-spinner"
            viewBox="0 0 50 50"
            >
            <path d="M25,49a24.03363,24.03363,0,0,1-10.68759-2.51129,1.39137,1.39137,0,0,1-.59923-1.94015l1.12269-1.94376a1.365,1.365,0,0,1,1.77606-.557,18.99975,18.99975,0,0,0,27.3467-15.7869A1.36568,1.36568,0,0,1,45.32955,25h2.24422a1.39136,1.39136,0,0,1,1.38075,1.48606A24.03139,24.03139,0,0,1,25,49Z"/>
        </svg>
    </div>
</template>

<script setup>
    import { useLoadStore } from '~/stores/isLoading'
</script>

<style scoped>
    .load {
        @apply w-full h-screen fixed top-0 left-0 right-0 bottom-0 grid place-items-center z-40 bg-white/10 cursor-wait;
    }
    .load-spinner {
        @apply animate-spin w-8 h-8 fill-primary;
    }
</style>