<template>
    <fieldset class="checkboxes">
        <label class="checkboxes-label">
            {{ label }}
        </label>
        <div class="checkboxes-list">
            <AdminFormCheckbox
                v-for=" ( checkbox , index ) in checkboxes "
                :key=" index "
                :label=" checkbox[ checkboxLabel ] "
                :checked=" setChecked( checkbox[ checkboxValue ] ) "
                @input=" handleInput( $event , checkbox[ checkboxValue ] ) "
                />
        </div>
    </fieldset>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ''
            },
            checkboxLabel: {
                type: String,
                default: 'label'
            },
            checkboxValue: {
                type: String,
                default: 'value'
            },
            checkboxes: {
                type: [ Array , Object ],
                required: true
            },
            checkedList: {
                type: [ Array , Object ],
                default: []
            },
            modelValue: {
                type: [ Array , Object ],
                default: []
            }
        },
        methods: {
            setChecked( value ) {
                return this.$props.modelValue.indexOf( value ) !== -1
            },
            handleInput( event , value ) {
                let newValue = this.$props.modelValue
                if( event.target.checked ) {
                    newValue.push( value )
                }
                else {
                    newValue.splice( newValue.indexOf( value ) , 1 )
                }
                this.$emit( 'updata:modelValue' , newValue )
            }
        }
    }
</script>

<style scoped>
    .checkboxes {
        @apply flex flex-col gap-2;
    }
    .checkboxes-label {
        @apply w-full text-secondary-500 text-sm;
    }
    .checkboxes-list {
        @apply flex flex-row gap-4 flex-wrap;
    }
</style>