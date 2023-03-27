<template>
    <header class="header"
        :class=" isOpen && 'header-open' ">
        <div class="header-container">
            <NuxtLink to="/">
                <img class="header-logo"
                    src="/logo.svg"
                    alt="BRUCE YU DESIGN"
                    >
            </NuxtLink>
            <button class="header-burger"
                @click=" handleBurger "
                type="button"
                >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="header-link-list">
                <NuxtLink
                    class="header-link"
                    to="/#service"
                    >
                    服務項目
                </NuxtLink>
                <NuxtLink
                    class="header-link"
                    to="/#flow"
                    >
                    服務流程
                </NuxtLink>
                <NuxtLink
                    class="header-link"
                    to="/#project"
                    >
                    專案項目
                </NuxtLink>
                <NuxtLink
                    class="header-link
                    !text-white bg-sky-600 rounded-full
                    hover:!text-white hover:bg-sky-500"
                    to="/#contact"
                    >
                    與我聯絡
                </NuxtLink>
            </nav>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
                isOpen: false
            }
        },
        watch: {
            $route: function() {
                this.isOpen = false
            }
        },
        methods: {
            handleBurger() {
                this.isOpen = !this.isOpen
            }
        }
    }
</script>

<style scoped>
    .header {
        @apply sticky top-0 w-full py-1.5 bg-slate-50/95 z-20;
    }
    .header-container {
        @apply w-11/12 md:w-5/6 max-w-[1400px] mx-auto
        flex flex-row justify-between items-center;
    }

    .header-logo {
        @apply h-12 transition
        hover:opacity-75;
    }

    .header-burger {
        @apply block relative h-7 w-7
        md:hidden
    }
    .header-burger > span {
        @apply bg-slate-400 h-0.5 transition absolute left-0 right-0 top-0 bottom-0 m-auto pointer-events-none;
    };
    .header-burger > span:nth-child( 1 ) {
        @apply translate-y-2.5;
    };
    .header-burger > span:nth-child( 3 ) {
        @apply -translate-y-2.5;
    };

    .header-link-list {
        @apply absolute top-full left-0 right-0 flex flex-col items-center w-full h-screen py-8 gap-6 text-base font-bold bg-slate-50/95 opacity-0 pointer-events-none transition
        md:static md:flex-row md:w-fit md:h-fit md:py-0 md:bg-transparent md:opacity-100 md:pointer-events-auto;
    }
    .header-link {
        @apply block px-4 py-1 w-fit text-slate-500 whitespace-nowrap transition
            hover:text-sky-500;
    }

    .header.header-open > div > nav {
        @apply opacity-100 pointer-events-auto;
    };
    .header.header-open > div > .header-burger > span:nth-child( 1 ) {
        @apply translate-y-0 rotate-45;
    };
    .header.header-open > div > .header-burger > span:nth-child( 2 ) {
        @apply opacity-0;
    };
    .header.header-open > div > .header-burger > span:nth-child( 3 ) {
        @apply -translate-y-0 -rotate-45;
    };
</style>