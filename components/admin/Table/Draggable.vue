<template>
    <div class="draggable-table">
        <div v-if=" canDrag "
            class="draggable-option"
            >
            <button class="draggable-edit"
                :class=" !disabled && 'draggable-edit-lock' "
                type="button"
                @click=" startDrag ">
                <ClientOnly>
                    <FontAwesomeIcon icon="fa-solid fa-hand-pointer" />
                </ClientOnly>
                調整順序
            </button>
            <div class="draggable-btn-list">
                <ClientOnly>
                    <FontAwesomeIcon
                        class="draggable-btn text-danger "
                        :class=" disabled && 'draggable-btn-lock' "
                        icon="fa-solid fa-square-xmark"
                        @click=" cancelDrag "
                        />
                    <FontAwesomeIcon
                        class="draggable-btn text-primary"
                        :class=" disabled && 'draggable-btn-lock' "
                        icon="fa-solid fa-square-check"
                        @click=" saveDrag "
                        />
                </ClientOnly>
            </div>
        </div>
        <div class="draggable-table-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th v-for=" header of headers "
                            :key=" header.value "
                            >
                            {{ header.text }}
                        </th>
                    </tr>
                </thead>
                <Draggable
                    tag="tbody"
                    animation="300"
                    ghost-class="opacity-0"
                    :item-key=" itemKey "
                    :disabled=" disabled "
                    @change=" dragItem "
                    v-model=" modelValue "
                    v-bind=" $attrs "
                    >
                    <template #item="{ element , index }">
                        <tr :key=" index "
                            :class=" disabled ? 'cursor-pointer' : 'cursor-move' "
                            @click=" disabled ? $emit( 'clickRow' , element ) : null "
                            >
                            <td>
                                <FontAwesomeIcon
                                    icon="fa-solid fa-grip-vertical"
                                    class="draggable-item-icon"
                                    :class=" disabled ? 'opacity-25' : 'opacity-100' "
                                    />
                            </td>
                            <td v-for=" header of headers ">
                                <slot
                                    :name=" `item-${ header.value }` "
                                    v-bind=" element ">
                                    {{ element[ header.value ] }}
                                </slot>
                            </td>
                        </tr>
                    </template>
                </Draggable>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            headers: {
                type: Array,
                require: true
            },
            modelValue: {
                type: Array,
                require: true
            },
            itemKey: {
                type: String,
                require: true
            },
            canDrag: {
                type: Boolean,
                default: true
            },
            clickRow: {
                type: Function,
                default: () => {}
            },
            saveItems: {
                type: Function,
                default: () => {}
            }
        },
        data() {
            return {
                disabled: true,
                memory: []
            }
        },
        watch: {
            modelValue: {
                handler( newValue , oldValue ) {
                    if( newValue.length !== oldValue.length ) {
                        this.memory = _cloneDeep( newValue )
                    }
                }
            }
        },
        methods: {
            startDrag() {
                this.disabled = false
                this.memory = _cloneDeep( this.$props.modelValue )
            },
            dragItem() {
                let itemList = _cloneDeep( this.$props.modelValue )
                for( let index in itemList ) {
                    itemList[ index ][ this.$props.itemKey ] = Number( index )
                }
                this.$emit( 'update:modelValue' , itemList )
            },
            cancelDrag() {
                this.disabled = true
                this.$emit( 'update:modelValue' , this.memory )
            },
            saveDrag() {
                this.disabled = true
                this.$props.saveItems()
            }
        }
    }
</script>

<style src="./table.css"></style>

<style scoped>
    .draggable-table {
        @apply w-full overflow-x-auto;
    }
    .draggable-option {
        @apply bg-secondary-50 p-4 flex flex-row items-center justify-between border-b-2 border-secondary-100;
    }
    .draggable-edit {
        @apply font-bold text-primary px-3 py-1 rounded bg-primary-100 opacity-90 transition
        hover:opacity-100;
    }
    .draggable-edit-lock {
        @apply text-secondary bg-secondary-200 pointer-events-none;
    }
    .draggable-btn-list {
        @apply flex flex-row gap-4;
    }
    .draggable-btn {
        @apply text-2xl cursor-pointer opacity-90 transition
        hover:opacity-100;
    }
    .draggable-btn-lock {
        @apply text-secondary-300 pointer-events-none;
    }
    .draggable-item-icon {
        @apply text-secondary transition;
    }
    .draggable-table-container {
        @apply w-full overflow-auto;
    }
</style>