<template>
    <button class="button"
        :class=" setColor "
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
        data() {
            return {
                setColor: '' 
            }
        },
        created() {
            const type = this.$props.type
            switch( true ) {
                case type === 'primary':
                    this.setColor = 'button-primary'
                    break
                case type === 'success':
                    this.setColor = 'button-success'
                    break
                case type === 'secondary':
                    this.setColor = 'button-secondary'
                    break
                case type === 'warning':
                    this.setColor = 'button-warning'
                    break
                case type === 'danger':
                    this.setColor = 'button-danger'
                    break
            }
        }
    }
</script>

<style scoped>

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
    .button {
        @apply w-fit min-w-[5.5rem] h-fit px-3 py-1 text-base text-white font-bold whitespace-nowrap rounded bg-opacity-90 cursor-pointer
        hover:bg-opacity-100
    }
    .button[disabled] {
        @apply cursor-not-allowed bg-opacity-50
        hover:bg-opacity-50
    }
</style>