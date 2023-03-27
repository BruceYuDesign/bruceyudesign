<template>
    <div class="content">
        <div class="content-main">
            <BrandedBanner
                :banners=" banners "
                :timing=" bannerOption.timing "
                />
            <div class="content-main-block">
                <h2 class="chart-title">
                    專案數據
                </h2>
                <AdminChartDonut
                    class="w-full lg:w-1/2"
                    chart-title="專案狀態"
                    :chart-labels=" chart.projectState.labels "
                    :chart-series=" chart.projectState.series "
                    :chart-colors=" chart.colors.duotone "
                    />
                <AdminChartDonut
                    class="w-full lg:w-1/2"
                    chart-title="已上架專案"
                    :chart-labels=" chart.projectType.labels "
                    :chart-series=" chart.projectType.series "
                    :chart-colors=" chart.colors.colorful "
                    />
            </div>
        </div>
        <div class="content-aside">
            <div class="content-aside-block">
                <div class="calendar-row">
                    <h3 class="calendar-minor">
                        {{ calendar.year }}
                    </h3>
                    <p class="calendar-text">
                        年
                    </p>
                    <h3 class="calendar-minor">
                        {{ calendar.month }}
                    </h3>
                    <p class="calendar-text">
                        月
                    </p>
                </div>
                <div class="calendar-row">
                    <h2 class="calendar-major">
                        {{ calendar.day }}
                    </h2>
                    <p class="calendar-text">
                        日
                    </p>
                </div>
                <hr class="w-full my-2">
                <div class="calendar-row">
                    <h4 class="calendar-minor">
                        {{ calendar.hour }}
                    </h4>
                    <span class="calendar-text">
                        :
                    </span>
                    <h4 class="calendar-minor">
                        {{ calendar.minute }}
                    </h4>
                    <span class="calendar-text">
                        :
                    </span>
                    <h4 class="calendar-minor">
                        {{ calendar.second }}
                    </h4>
                </div>
            </div>
            <div class="content-aside-block">
                <div class="profile-avatar"
                    style="background-image: url( /default_user.png )"
                    >
                    <img class="profile-avatar-img"
                        :src=" profile.avatar "
                        >
                </div>
                <h2 class="profile-name">
                    {{ profile.name }}
                </h2>
                <h3 class="profile-account">
                    {{ profile.account }}
                </h3>
                <AdminFormButton
                    text="編輯個人資料"
                    type="primary"
                    @click=" navigateTo( '/admin/profile/' ) "
                    />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useAuthStore } from '~/stores/auth'
    const { profile } = useAuthStore().auth
</script>

<script>
    export default {
        data() {
            return {
                banners: [],
                bannerOption: {},
                chart: {
                    colors: {
                        colorful: [ '#38bdf8' , '#34d399' , '#fbbf24' , '#fb7185' , '#a78bfa' ],
                        duotone:  [ '#38bdf8' , '#94a3b8' ]
                    },
                    projectType: {
                        labels: [],
                        series: []
                    },
                    projectState: {
                        labels: [],
                        series: []
                    }
                },
                timer: null,
                calendar: {
                    year: '',
                    month: '',
                    day: '',
                    hour: '',
                    minute: '',
                    second: ''
                }
            }
        },
        created() {
            this.timer = setInterval( () => this.setCalendar() , 1000 )
        },
        async mounted() {
            const {
                banner,
                bannerOption,
                project,
                projectType
            } = await this.$fetchData( '/api/admin/' )
            this.setBanners( banner , bannerOption )
            this.setProjectStates( project )
            this.setProjectTypes( projectType , project )
        },
        unmounted() {
            clearInterval( this.timer )
        },
        methods: {
            setBanners( banners , bannerOption ) {
                banners.sort( ( a , b ) => a.index > b.index ? 1 : -1 )
                this.bannerOption = bannerOption
                this.banners = banners
            },
            setProjectStates( projects ) {
                const onShelves  = projects.filter( ({ state }) => state ).length
                const offShelves = projects.length - onShelves
                this.chart.projectState = {
                    labels: [ '上架' , '下架' ],
                    series: [ onShelves , offShelves ]
                }
            },
            setProjectTypes( projectTypes , projects ) {
                projectTypes.sort( ( a , b ) => a.index > b.index ? 1 : -1 )
                const { labels , series } = projectTypes.reduce(
                    ( result , { id , text } ) => {
                        result.labels.push( text )
                        result.series.push(
                            projects.filter( ({ state , type }) => state && type.includes( id ) ).length
                        )
                        return result
                    },
                    { labels: [] , series: [] }
                )
                this.chart.projectType = {
                    labels: labels,
                    series: series
                }
            },
            setCalendar() {
                const now = new Date()
                const formatter = value => value.toString().padStart( 2 , '0' )
                this.calendar = {
                    year:   now.getFullYear(),
                    month:  formatter( now.getMonth() + 1 ),
                    day:    formatter( now.getDate()      ),
                    hour:   formatter( now.getHours()     ),
                    minute: formatter( now.getMinutes()   ),
                    second: formatter( now.getSeconds()   )
                }
            }
        }
    }
</script>

<style scoped>
    .content {
        @apply w-full flex flex-col-reverse gap-x-12 gap-y-6
        md:flex-row;
    }
    .content-main {
        @apply w-full flex flex-col gap-6
        md:w-3/4;
    }
    .content-aside {
        @apply w-full flex flex-col gap-6
        md:w-1/4;
    }
    .content-main-block {
        @apply w-full py-8 flex flex-row flex-wrap gap-y-4 items-center bg-white font-bold;
    }
    .content-aside-block {
        @apply w-full p-12 flex flex-col items-center bg-white font-bold;
    }

    .chart-title {
        @apply w-full text-center text-primary text-xl;
    }

    .calendar-row {
        @apply my-1 flex flex-row items-end gap-2;
    }
    .calendar-major {
        @apply text-primary text-8xl;
    }
    .calendar-minor {
        @apply text-primary-400 text-xl;
    }
    .calendar-text {
        @apply text-secondary;
    }

    .profile-avatar {
        @apply mb-2 w-3/4 max-w-[7rem] aspect-square bg-cover rounded-full overflow-hidden border-4 border-secondary-200;
    }
    .profile-avatar-img {
        @apply w-full h-full;
    }
    .profile-name {
        @apply text-primary text-2xl;
    }
    .profile-account {
        @apply text-secondary text-sm mb-6;
    }

</style>