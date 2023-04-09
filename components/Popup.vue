<template>
    <Transition name="popup">
        <div v-if=" isShown "
            class="popup"
            :class=" 'popup-' + type "
            v-bind=" $attrs "
            >
            <span class="popup-text">
                {{ text }}
            </span>
            <button class="popup-close"
                type="button"
                @click=" closePopup "
                >
                <ClientOnly>
                    <FontAwesomeIcon icon="fa-solid fa-circle-xmark"/>
                </ClientOnly>
            </button>
        </div>
    </Transition>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            text: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'primary'
            },
            isShown: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                duration: null
            }
        },
        watch: {
            isShown: function( newValue ) {
                if( newValue ) {
                    this.duration = setTimeout( () => {
                        this.$emit( 'update:isShown' , false )
                    } , 3000 )
                }
                else {
                    clearTimeout( this.duration )
                }
            }
        },
        methods: {
            closePopup() {
                this.$emit( 'update:isShown' , false )
            }
        }
    }
</script>

<style scoped>
    .popup-enter-active,
    .popup-leave-active {
        @apply transition
    }
    .popup-enter-from,
    .popup-leave-to {
        @apply opacity-0
    }
    .popup-enter-to,
    .popup-leave-from {
        @apply opacity-100
    }
    .popup-enter-from {
        @apply -translate-y-8
    }
    .popup-enter-to {
        @apply -translate-y-0
    }

    .popup-primary {
        @apply bg-primary;
    }
    .popup-success {
        @apply bg-success;
    }
    .popup-secondary {
        @apply bg-secondary;
    }
    .popup-warning {
        @apply bg-warning;
    }
    .popup-danger {
        @apply bg-danger;
    }
    .popup {
        @apply fixed top-20 left-1/2 -translate-x-1/2 z-40 flex flex-row items-center gap-2 w-fit h-fit pl-4 pr-2.5 py-1 rounded-full
        hover:bg-opacity-100;
    }
    .popup-text {
        @apply text-base text-white font-bold whitespace-nowrap;
    }
    .popup-close {
        @apply text-white text-lg opacity-75 transition
        hover:opacity-100;
    }
</style>