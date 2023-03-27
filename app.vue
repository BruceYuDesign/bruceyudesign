<template>
    <NuxtLayout :name=" layout ">
        <NuxtPage />
        <NuxtLoadingIndicator
            color="#0ea5e9"
            :height=" 2 "
            />
    </NuxtLayout>
</template>

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