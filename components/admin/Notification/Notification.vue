<template>
    <span class="notification"
        :class=" setNotificationColor() ">
        <ClientOnly>
            <FontAwesomeIcon
                v-if=" type === 'primary' "
                icon="fa-solid fa-comment"
                />
            <FontAwesomeIcon
                v-else-if=" type === 'success' "
                icon="fa-solid fa-circle-check"
                />
            <FontAwesomeIcon
                v-else-if=" type === 'warning' "
                icon="fa-solid fa-circle-exclamation"
                />
            <FontAwesomeIcon
                v-else-if=" type === 'danger' "
                icon="fa-solid fa-circle-exclamation"
                />
        </ClientOnly>
        {{ text }}
    </span>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'primary'
            }
        },
        methods: {
            setNotificationColor() {
                return 'notification-' + this.$props.type
            }
        }
    }
</script>

<style scoped>
    .notification {
        @apply p-2 w-full font-bold border-2 rounded whitespace-pre-wrap leading-relaxed;
    }
    .notification-primary {
        @apply bg-primary-50 text-primary border-primary-200;
    }
    .notification-success {
        @apply bg-success-50 text-success border-success-200;
    }
    .notification-warning {
        @apply bg-warning-50 text-warning border-warning-200;
    }
    .notification-danger {
        @apply bg-danger-50 text-danger border-danger-200;
    }
</style>