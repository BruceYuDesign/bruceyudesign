<template>
    <header class="header">
        <div class="com-container header-container">
            <div class="header-head">
                <button class="header-burger"
                    @click=" openNavbar "
                    type="button"
                    >
                    <ClientOnly>
                        <FontAwesomeIcon icon="fa-solid fa-bars"/>
                    </ClientOnly>
                </button>
                <h1 class="header-path">
                    {{ title() }}
                </h1>
            </div>
            <div class="header-foot"
                style="background-image: url( /default_user.png )"
                >
                <NuxtLink
                    class="header-link"
                    to="/admin/profile/"
                    >
                    <img class="header-avatar"
                        :src=" useAuthStore().auth.profile.avatar ">
                </NuxtLink>
            </div>
        </div>
    </header>
    <div id="overlay" @click="closeNavbar"></div>
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
</script>

<script>
    export default {
        methods: {
            title() {
                const pathList = {
                    '/admin/':              '首頁',
                    '/admin/profile/':      '個人資料',
                    '/admin/user-access/':  '帳號權限設定',
                    '/admin/user/':         '帳號管理',
                    '/admin/banner/':       '廣告管理',
                    '/admin/project-type/': '專案類別設定',
                    '/admin/project/':      '專案管理'
                }
                const path = this.$route.path
                return pathList[ path ]
            },
            openNavbar() {
                document.getElementById( 'navbar' ).classList.add( 'navbar-open' )
                document.getElementById( 'overlay' ).classList.add( 'overlay-show' )
            },
            closeNavbar() {
                document.getElementById( 'navbar' ).classList.remove( 'navbar-open' )
                document.getElementById( 'overlay' ).classList.remove( 'overlay-show' )
            }
        }
    }
</script>

<style scoped>
    .header {
        @apply sticky top-0 w-full h-14 flex flex-row items-center bg-secondary-50 z-10;
    }
    .header-container {
        @apply max-w-7xl flex flex-row justify-between items-center w-11/12 mx-auto
        md:w-5/6
    }

    .header-head {
        @apply flex flex-row gap-4 items-center;
    }
    .header-burger {
        @apply block w-10 h-10 text-secondary-500/75 text-2xl rounded-full
        xl:hidden
        hover:bg-secondary-200/75;
    }
    .header-path {
        @apply text-secondary-400 text-lg font-bold;
    }

    .header-foot {
        @apply w-12 h-12 bg-cover rounded-full overflow-hidden border-4 border-secondary-200;
    }
    .header-link {
        @apply block w-full h-full;
    }
    .header-avatar {
        @apply w-full h-full;
    }

    #overlay {
        @apply w-screen h-screen fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-10 opacity-0 pointer-events-none transition;
    }
    #overlay.overlay-show {
        @apply opacity-100 pointer-events-auto
        xl:opacity-0 xl:pointer-events-none;
    }
</style>