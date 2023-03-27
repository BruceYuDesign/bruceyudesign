<template>
    <div class="container-outline"
        v-bind=" $attrs "
        >
        <div class="container-block">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false
    }
</script>

<style scoped>
    .container-outline {
        @apply w-full py-24
        odd:bg-slate-100
        even:bg-slate-200/75;
    }
    .container-block {
        @apply max-w-[1400px] w-11/12 mx-auto flex flex-col items-center gap-16
        md:w-5/6;
    }
</style>