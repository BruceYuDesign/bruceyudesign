<template>
    <label>
        {{ label }}
        <input
            :value=" modelValue "
            @input=" handleInput "
            v-bind=" $attrs "
            type="color"
            />
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
                type: [ String , Number ],
                default: ''
            }
        },
        methods: {
            handleInput( event ) {
                this.$emit( 'update:modelValue' , event.target.value )
            }
        }
    }
</script>

<style scoped>
    label {
        @apply w-fit flex flex-col gap-1 text-sm text-secondary-500;
    }
    input[type="color"] {
        @apply appearance-none border-none w-8 h-8 rounded-lg;
    }
    input[type="color"]::-webkit-color-swatch-wrapper {
        @apply p-[2px] bg-secondary-200 rounded-lg;
    }
    input[type="color"]::-webkit-color-swatch {
        @apply border-2 border-secondary-50 rounded-lg;
    }
</style>