<template>
    <Transition name="confirm">
        <div class="confirm-mask"
            v-if=" isOpen "
            @click=" clickOverlay "
            >
            <div class="confirm-container">
                <div class="confirm-icon-outline"
                    :class=" setIconColor() "
                    >
                    <ClientOnly>
                        <FontAwesomeIcon
                            class="confirm-icon"
                            :icon=" fontAwesomeIcon "
                            />
                    </ClientOnly>
                </div>
                <p class="confirm-message">
                    {{ message }}
                </p>
                <hr/>
                <div class="confirm-btn-list">
                    <AdminFormButton
                        :text=" rejectText "
                        type="secondary"
                        @click=" handleReject "
                        />
                    <AdminFormButton
                        :text=" resolveText "
                        :type=" type "
                        @click=" handleResolve "
                        />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'primary'
            },
            message: {
                type: String,
                default: ''
            },
            fontAwesomeIcon: {
                type: String,
                default: ''
            },
            rejectText: {
                type: String,
                default: '取消'
            },
            resolveText: {
                type: String,
                default: '確定'
            }
        },
        data() {
            return {
                isOpen: false,
                promise: null
            }
        },
        methods: {
            setIconColor() {
                return 'confirm-' + this.$props.type
            },
            clickOverlay( event ) {
                if( event.target.classList.contains( 'confirm-mask' ) ) {
                    const confirm = document.querySelector( '.confirm-container' )
                    confirm.style.transform = 'scale(1.03)'
                    setTimeout( () => {
                        confirm.style.transform = 'scale(1)'
                    }, 150 )
                }
            },
            showConfirm() {
                this.isOpen = true
                return new Promise( ( resolve , reject ) => {
                    this.promise = { resolve , reject }
                })
            },
            handleReject() {
                this.promise.reject()
                this.isOpen = false
            },
            handleResolve() {
                this.promise.resolve()
                this.isOpen = false
            }
        }
    }
</script>

<style scoped>
    .confirm-mask {
        @apply w-screen h-screen fixed top-0 right-0 bottom-0 left-0 z-30 grid place-items-center bg-black/75;
    }
    .confirm-container {
        @apply relative max-w-lg px-4 py-10 flex flex-col items-center gap-8 bg-white transition w-11/12 mx-auto rounded-lg overflow-hidden
        sm:px-10
        md:w-5/6;
    }

    .confirm-icon-outline {
        @apply grid place-items-center w-20 h-20 rounded-full;
    }
    .confirm-icon {
        @apply text-4xl;
    }
    .confirm-message {
        @apply text-xl text-secondary font-bold text-center;
    }
    .confirm-btn-list {
        @apply flex flex-row gap-4;
    }

    /* color */
    .confirm-primary {
        @apply text-primary bg-primary/10;
    }
    .confirm-success {
        @apply text-success bg-success/10;
    }
    .confirm-secondary {
        @apply text-secondary bg-secondary/10;
    }
    .confirm-warning {
        @apply text-warning bg-warning/10;
    }
    .confirm-danger {
        @apply text-danger bg-danger/10;
    }

    /* animation */
    .confirm-enter-active,
    .confirm-leave-active {
        @apply transition
    }
    .confirm-enter-from,
    .confirm-leave-to {
        @apply opacity-0
    }
    .confirm-enter-to,
    .confirm-leave-from {
        @apply opacity-100
    }

    .confirm-enter-active .confirm-container,
    .confirm-leave-active .confirm-container {
        @apply transition
    }
    .confirm-enter-from .confirm-container,
    .confirm-leave-to .confirm-container {
        @apply translate-y-8
    }
    .confirm-enter-to .confirm-container,
    .confirm-leave-from .confirm-container {
        @apply translate-y-0
    }
</style>