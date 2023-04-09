<template>
    <NuxtLayout :name=" layout ">
        <NuxtPage />
        <NuxtLoadingIndicator
            color="#0ea5e9"
            :height=" 2 "
            />
        <Popup
            v-bind:text=" usePopupStore().text "
            v-bind:type=" usePopupStore().type "
            v-model:is-shown=" usePopupStore().isShown "
            />
    </NuxtLayout>
</template>

<script setup>
    import { usePopupStore } from '~/stores/popup'
</script>

<script>
    export default {
        computed: {
            layout() {
                if( this.$route.path.startsWith( '/admin/' ) ) {
                    return 'admin'
                }
                else if( this.$route.path === '/login/' ) {
                    return 'blank'
                }
                else {
                    return 'branded'
                }
            }
        }
    }
</script>