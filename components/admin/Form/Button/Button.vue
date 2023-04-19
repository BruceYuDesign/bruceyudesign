<template>
    <button class="button"
        :class=" setButtonColor() "
        v-bind=" $attrs "
        type="button"
        >
        {{ text }}
    </button>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            text: {
                type: String,
                default: '按鈕'
            },
            type: {
                type: String,
                default: 'primary'
            }
        },
        methods: {
            setButtonColor() {
                return 'button-' + this.$props.type
            }
        }
    }
</script>

<style scoped>
    .button {
        @apply w-fit min-w-[5.5rem] h-fit px-3 py-1 text-base text-white font-bold whitespace-nowrap rounded bg-opacity-90 cursor-pointer
        hover:bg-opacity-100
    }
    .button[disabled] {
        @apply cursor-not-allowed bg-opacity-50
        hover:bg-opacity-50
    }
    .button-primary {
        @apply bg-primary;
    }
    .button-success {
        @apply bg-success;
    }
    .button-secondary {
        @apply bg-secondary;
    }
    .button-warning {
        @apply bg-warning;
    }
    .button-danger {
        @apply bg-danger;
    }
</style>