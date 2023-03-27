<template>
    <div class="project-swiper">
        <ClientOnly>
            <Swiper
                :breakpoints=" breakpoints "
                :pagination=" true "
                :modules=" modules "
                @swiper=" onSwiper "
                >
                <SwiperSlide
                    v-for=" ( project , index ) of projects "
                    :key=" index "
                    >
                    <BrandedProject
                        :project=" project "
                        />
                </SwiperSlide>
            </Swiper>
        </ClientOnly>
        <button class="swiper-button-prev"
            type="button"
            @click=" prevPage "
            >
            <ClientOnly>
                <FontAwesomeIcon icon="fa-solid fa-circle-chevron-left" />
            </ClientOnly>
        </button>
        <button class="swiper-button-next"
            type="button"
            @click=" nextPage "
            >
            <ClientOnly>
                <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right" />
            </ClientOnly>
        </button>
    </div>
    <NuxtLink
        class="w-fit px-6 py-1.5 font-bold text-white whitespace-nowrap rounded-full opacity-90 transition bg-primary-600 -mt-6
        hover:opacity-100"
        to="/project/"
        >
        觀看更多作品
    </NuxtLink>
</template>

<script>
    import 'swiper/css'
    import { Pagination } from 'swiper'
    export default {
        props: {
            projects: Array
        },
        data() {
            return {
                swiper: null,
                modules: [ Pagination ],
                breakpoints: {
                    default: {
                        slidesPerView: 1
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 32
                    },
                    1280: {
                        slidesPerView: 3,
                        spaceBetween: 48
                    }
                }
            }
        },
        methods: {
            onSwiper( swiper ) {
                this.swiper = swiper
            },
            prevPage() {
                this.swiper.slidePrev()
            },
            nextPage() {
                this.swiper.slideNext()
            }
        }
    }
</script>

<style>
    .project-swiper {
        @apply relative w-full;
    }
    .project-swiper .swiper {
        @apply w-full;
    }

    .project-swiper .swiper-slide {
        @apply h-auto pb-1 px-1 select-none;
    }

    .project-swiper .swiper-button-prev,
    .project-swiper .swiper-button-next {
        @apply hidden text-2xl text-secondary absolute top-1/2 -translate-y-full z-10 transition
        hover:text-primary
        md:block;
    }
    .project-swiper .swiper-button-prev {
        @apply -left-12;
    }
    .project-swiper .swiper-button-next {
        @apply -right-12;
    }

    .project-swiper .swiper-pagination {
        @apply mt-4 flex flex-row gap-1.5 justify-center;
    }
    .project-swiper .swiper-pagination-bullet {
        @apply bg-secondary-300 opacity-100 w-2 h-2 rounded-full;
    }
    .project-swiper .swiper-pagination-bullet-active{
        @apply bg-primary-400;
    }
</style>