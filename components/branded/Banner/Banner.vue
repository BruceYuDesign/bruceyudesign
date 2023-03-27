<template>
    <section v-if=" banners.length > 0 "
        class="pt-6 pb-6 flex flex-col gap-10 items-center justify-center
            lg:pt-2 lg:gap-6"
        :style="`background-image:linear-gradient(to right top,
            ${ gradient.start },
            ${ gradient.end })`"
            >
        <div :class=" change && 'banner-change' "
            class="w-full flex flex-col-reverse items-center justify-evenly
                lg:flex-row">
            <div class="flex flex-col gap-6">
                <p class="banner-text
                    text-xl text-left text-white transition duration-300
                    sm:text-2xl">
                    我使用
                </p>
                <p class="banner-text
                    text-4xl text-white transition duration-300 delay-150 font-futura
                    sm:text-5xl">
                    {{ banner.tool }}
                </p>
                <p class="banner-text
                    text-xl text-right text-white transition duration-300 delay-300
                    sm:text-2xl">
                    {{ banner.use }}
                </p>
            </div>
            <div class="banner-img
                w-full aspect-square bg-contain bg-no-repeat bg-center transition duration-700 delay-500
                sm:w-4/5
                md:w-3/5
                lg:w-2/5"
                :style="`background-image: url(${ banner.img })`">
            </div>
        </div>
        <ul class="flex flex-row gap-4">
            <li v-if=" banners.length > 1 "
                v-for=" ( banner , index ) of banners "
                class="w-2 h-2 border border-white btarget-solid rounded-full cursor-pointer"
                :class=" this.target === index ? 'bg-white' : '' "
                @click=" changeTarget( index ) ">
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        props: {
            banners: Array,
            timing: [ Number , String ]
        },
        data() {
            return {
                duration: null,
                delay: null,
                change: false,
                target: 0,
                banner: {},
                gradient: {
                    start: '',
                    end:   ''
                }
            }
        },
        created() {
            this.setBanner()
        },
        unmounted() {
            this.clearAllTimeout()
        },
        watch: {
            banners: function() {
                this.setBanner()
            },
            timing: function() {
                this.setBanner()
            }
        },
        methods: {
            clearAllTimeout() {
                clearTimeout( this.duration )
                clearTimeout( this.delay )
            },
            setBanner() {
                if( this.$props.banners.length > 0 ) {
                    this.banner = this.$props.banners[ this.target ]
                    this.gradient = {
                        start: this.banner.gradient.start,
                        end:   this.banner.gradient.end
                    }
                    this.change = false
                    this.clearAllTimeout()
                    this.setTiming()
                }
            },
            setTiming() {
                if( this.$props.banners.length > 1 ) {
                    this.duration = setTimeout( () => {
                        this.target + 1 < this.$props.banners.length ?
                            this.changeTarget( this.target + 1 ) :
                            this.changeTarget( 0 )
                    } , this.$props.timing * 1000 )
                }
            },
            changeTarget( target ) {
                this.clearAllTimeout()
                this.target = target
                this.change = true
                this.delay = setTimeout( () => {
                    this.banner = this.$props.banners[ target ]
                    this.change = false
                    this.setTiming()
                    useNuxtApp().$gradientAnimate({
                        duration: 1500,
                        from: {
                            startColor: this.gradient.start,
                            endColor:   this.gradient.end
                        },
                        to: {
                            startColor: this.banner.gradient.start,
                            endColor:   this.banner.gradient.end
                        },
                        bindColor: ( startColor , endColor ) => {
                            this.gradient = {
                                start: startColor,
                                end:   endColor
                            }
                        }
                    })
                } , 1500 )
            }
        }
    }
</script>

<style scoped>
    .banner-change .banner-text {
        @apply translate-y-4 opacity-0
    }
    .banner-change .banner-img {
        @apply translate-x-4 opacity-0
    }
</style>