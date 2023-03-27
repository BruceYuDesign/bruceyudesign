<template>
    <div class="service">
        <div class="service-head">
            <h3 class="service-title">
                {{ title }}
            </h3>
            <p class="service-desc">
                {{ desc }}
            </p>
            <ul class="service-icon-list">
                <li v-for=" ( icon , index ) in icons "
                    :key=" index "
                    class="service-icon"
                    :aria-label=" icon.name "
                    data-microtip-position="bottom"
                    role="tooltip"
                    >
                    <img :src=" icon.src "
                        :alt=" icon.name "
                        width="32"
                        height="32"
                        >
                </li>
            </ul>
        </div>
        <img class="service-image"
            :src=" image "
            :alt=" title "
            width="700"
            height="467"
            >
    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            desc:  String,
            icons: Array,
            image: String
        }
    }
</script>

<style scoped>
    .service {
        @apply flex flex-col gap-8 items-center p-2 bg-slate-50 rounded-2xl shadow-md
        sm:gap-12 sm:p-8
        odd:lg:flex-row
        even:lg:flex-row-reverse;
    }
    .service-head {
        @apply w-full flex flex-col gap-8 p-6
        sm:gap-12;
    }
    .service-title {
        @apply text-4xl text-sky-500
        sm:text-5xl;
    }
    .service-desc {
        @apply leading-loose text-lg text-slate-500;
    }
    .service-icon-list {
        @apply flex flex-row flex-wrap gap-5;
    }
    .service-icon {
        @apply w-8 h-8;
    }
    .service-image {
        @apply w-full rounded-lg
        lg:w-1/2;
    }
</style>