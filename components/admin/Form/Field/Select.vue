<template>
    <label>
        {{ label }}
        <select
            @change=" handleChange "
            v-bind=" $attrs "
            >
            <option value="">--- 請選擇 ---</option>
            <option
                v-for=" ( option , index ) in options "
                :key=" index "
                :value=" option[ optionValue ] "
                :selected=" option[ optionValue ] === modelValue "
                >
                {{ option[ optionLabel ] }}
            </option>
        </select>
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
            },
            optionLabel: {
                type: String,
                default: 'label'
            },
            optionValue: {
                type: String,
                default: 'value'
            },
            options: {
                type: [ Array , Object ],
                required: true
            }
        },
        methods: {
            handleChange( event ) {
                this.$emit( 'update:modelValue' , event.target.value )
            }
        }
    }
</script>

<style scoped src="./field.css"></style>