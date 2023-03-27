<template>
    <div class="image-swiper">
        <ClientOnly>
            <Swiper
                :slides-per-view=" 1 "
                :space-between=" 0 "
                :pagination=" true "
                :modules=" modules "
                @swiper=" onSwiper "
                >
                <SwiperSlide
                    v-for=" ( img , index ) of images "
                    :key=" index "
                    >
                    <div class="image-swiper-card">
                        <img :src=" img.src "
                            width="692"
                            height="692"
                            >
                    </div>
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
</template>

<script>
    import 'swiper/css'
    import { Pagination } from 'swiper'
    export default {
        props: {
            images: Array
        },
        data() {
            return {
                modules: [ Pagination ]
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
    .image-swiper {
        @apply w-full h-full relative aspect-square rounded-2xl overflow-hidden;
    }

    .image-swiper .swiper-slide {
        @apply select-none;
    }
    .image-swiper .swiper-slide .image-swiper-card{
        @apply w-full h-full aspect-square bg-gray-900;
    }
    .image-swiper .swiper-slide .image-swiper-card img{
        @apply w-full h-full object-contain;
    }

    .image-swiper .swiper-button-prev,
    .image-swiper .swiper-button-next {
        @apply hidden text-2xl text-secondary absolute top-1/2 -translate-y-1/2 z-10 transition
        hover:text-primary
        md:block;
    }
    .image-swiper .swiper-button-prev {
        @apply left-4;
    }
    .image-swiper .swiper-button-next {
        @apply right-4;
    }

    .image-swiper .swiper-pagination {
        @apply absolute bottom-2 left-0 right-0 flex flex-row gap-1.5 justify-center z-10;
    }
    .image-swiper .swiper-pagination-bullet {
        @apply bg-secondary-300 opacity-100 w-2 h-2 rounded-full;
    }
    .image-swiper .swiper-pagination-bullet-active{
        @apply bg-primary-400;
    }
</style>