<template>
    <a :aria-label=" label "
        data-microtip-position="bottom"
        role="tooltip"
        v-bind=" $attrs "
        >
        <img :src=" image "
            :alt=" label "
            width="40"
            height="40"
            >
    </a>
</template>

<script>
    export default {
        props: {
            label: String,
            image: String
        }
    }
</script>

<style scoped>
    a {
        @apply w-10 h-10 opacity-80
        hover:opacity-100
    }
</style>