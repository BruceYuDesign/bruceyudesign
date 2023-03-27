<template>
    <label>
        {{ label }}
        <input
            :value=" modelValue "
            @input=" handleInput "
            v-bind=" $attrs "
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

<style scoped src="./field.css"></style>