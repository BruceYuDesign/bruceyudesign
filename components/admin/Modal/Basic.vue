<template>
    <Transition name="modal">
        <div class="modal-outline"
            v-if=" openModal "
            >
            <div class="modal-mask"
                @click=" clickOverlay "
                >
                <div class="modal-container">
                    <div class="modal-head">
                        <h3 class="modal-title">
                            <slot name="head"></slot>
                        </h3>
                        <button class="modal-close"
                            @click=" this.$emit( 'closeModal' , null ) "
                            type="button"
                            >
                            <FontAwesomeIcon icon="fa-solid fa-xmark" />
                        </button>
                    </div>
                    <div class="modal-body"
                        :class=" !canEditModal && 'pointer-events-none' ">
                        <AdminNotification
                            v-if=" !canEditModal "
                            type="danger"
                            text="未有權限修改內容"
                            />
                        <slot name="body"></slot>
                    </div>
                    <hr/>
                    <div class="modal-foot">
                        <slot name="foot"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
    export default {
        props: {
            openModal: {
                type: Boolean,
                default: false
            },
            canEditModal: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            openModal: {
                handler: function ( newValue ) {
                    document.body.style.overflow = newValue ? 'hidden' : 'overlay'
                }
            }
        },
        methods: {
            clickOverlay( event ) {
                if( event.target.classList.contains( 'modal-mask' ) ) {
                    let modal = document.querySelector( '.modal-container' )
                    modal.style.transform = 'scale(1.03)'
                    setTimeout( () => {
                        modal.style.transform = 'scale(1)'
                    }, 150 )
                }
            }
        }
    }
</script>

<style scoped>
    .modal-outline {
        overflow: overlay;
        @apply w-screen h-screen fixed top-0 right-0 bottom-0 left-0 grid place-items-start z-20;
    }
    .modal-mask {
        @apply w-full min-h-full h-fit py-12 px-0 grid place-items-center bg-black/75
        sm:py-16;
    }
    .modal-container {
        @apply relative max-w-5xl px-4 py-10 flex flex-col gap-10 bg-white transition w-11/12 mx-auto rounded-lg overflow-hidden
        sm:px-10
        md:w-5/6;
    }

    .modal-head {
        @apply flex items-center justify-between gap-4;
    }
    .modal-title {
        @apply text-2xl font-bold text-sky-500 whitespace-nowrap text-ellipsis overflow-hidden;
    }
    .modal-close {
        @apply text-3xl text-secondary-300 hover:text-danger;
    }

    .modal-body {
        @apply flex flex-col gap-4;
    }

    .modal-foot {
        @apply flex flex-row flex-wrap gap-4 justify-end;
    }

    /* animation */
    .modal-enter-active,
    .modal-leave-active {
        @apply transition
    }
    .modal-enter-from,
    .modal-leave-to {
        @apply opacity-0
    }
    .modal-enter-to,
    .modal-leave-from {
        @apply opacity-100
    }

    .modal-enter-active .modal-container,
    .modal-leave-active .modal-container {
        @apply transition
    }
    .modal-enter-from .modal-container,
    .modal-leave-to .modal-container {
        @apply translate-y-8
    }
    .modal-enter-to .modal-container,
    .modal-leave-from .modal-container {
        @apply translate-y-0
    }
</style>