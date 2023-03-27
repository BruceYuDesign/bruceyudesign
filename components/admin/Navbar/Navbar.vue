<template>
    <aside id="navbar">
        <NuxtLink
            to="/admin/"
            class="navbar-head"
            >
            <img class="navbar-img"
                src="/logo.svg"
                alt="BRUCE YU DESIGN"
                >
        </NuxtLink>
        <nav class="navbar-body">
            <NuxtLink
                to="/admin/"
                class="navbar-link"
                >
                <ClientOnly>
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                </ClientOnly>
                首頁
            </NuxtLink>
            <NuxtLink
                v-if=" A_USER_ACCESS.get "
                to="/admin/user-access/"
                class="navbar-link"
                >
                <ClientOnly>
                    <FontAwesomeIcon icon="fa-solid fa-user-gear" />
                </ClientOnly>
                帳號權限設定
            </NuxtLink>
            <NuxtLink
                v-if=" A_USER.get "
                to="/admin/user/"
                class="navbar-link"
                >
                <ClientOnly>
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                </ClientOnly>
                帳號管理
            </NuxtLink>
            <NuxtLink
                v-if=" A_BANNER.get "
                to="/admin/banner/"
                class="navbar-link"
                >
                <ClientOnly>
                    <FontAwesomeIcon icon="fa-solid fa-rectangle-ad" />
                </ClientOnly>
                廣告管理
            </NuxtLink>
            <NuxtLink
                v-if=" A_PROJECT_TYPE.get "
                to="/admin/project-type/"
                class="navbar-link"
                >
                <ClientOnly>
                    <FontAwesomeIcon icon="fa-solid fa-briefcase" />
                </ClientOnly>
                專案類別設定
            </NuxtLink>
            <NuxtLink
                v-if=" A_PROJECT.get "
                to="/admin/project/"
                class="navbar-link"
                >
                <ClientOnly>
                    <FontAwesomeIcon icon="fa-solid fa-suitcase" />
                </ClientOnly>
                專案管理
            </NuxtLink>
        </nav>
        <a class="navbar-foot"
            href="/"
            >
            BRUCE YU DESIGN
        </a>
    </aside>
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    const {
        userAccess:  A_USER_ACCESS,
        user:        A_USER,
        banner:      A_BANNER,
        projectType: A_PROJECT_TYPE,
        project:     A_PROJECT
    } = useAuthStore().auth.access
</script>

<style scoped>
    #navbar {
        @apply top-0 bg-white w-fit min-w-fit h-screen flex flex-col items-center overflow-auto z-20 transition
        fixed -translate-x-full
        xl:sticky xl:translate-x-0;
    }
    #navbar.navbar-open {
        @apply translate-x-0
    }

    .navbar-head {
        @apply flex px-8 h-14 min-h-[3.5rem] items-center;
    }
    .navbar-img {
        @apply w-48
        sm:w-60;
    }

    .navbar-body {
        @apply px-4 py-6 w-full flex flex-col gap-4 text-secondary-500 border-y-2 border-secondary-100;
    }
    .navbar-link {
        @apply w-full px-4 py-2 text-base font-bold rounded-lg
        hover:bg-secondary-100
        sm:px-6 sm:py-3;
    }
    .navbar-link > svg {
        @apply w-8;
    }
    .navbar-link.router-link-exact-active {
        @apply bg-primary-400 text-white;
    }

    .navbar-foot {
        @apply mt-4 mb-16 font-bold text-sm text-secondary-200
        hover:text-primary-300
    }
</style>