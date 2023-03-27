<template>
    <label>
        <input
            @input=" handleInput "
            :checked=" modelValue "
            v-bind=" $attrs "
            type="checkbox"
            />
        {{ label }}
    </label>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            label: {
                type: String,
                default: ''
            },
            modelValue: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            handleInput( event ) {
                this.$emit( 'update:modelValue' , event.target.checked )
            }
        }
    }
</script>

<style scoped>
    label {
        @apply w-fit flex flex-row items-center gap-1 text-secondary-500 text-base;
    }
    input {
        @apply appearance-none w-5 h-5 cursor-pointer rounded bg-secondary-50 border-secondary-200 border-2
            disabled:cursor-not-allowed disabled:opacity-50;
    }
    input:checked {
        @apply bg-primary-400 border-primary-300;
        background-image: url( "/check.svg" );
    }
</style>