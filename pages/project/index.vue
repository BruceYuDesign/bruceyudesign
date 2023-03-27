<template>
    <BrandedContainer id="project"
        class="min-h-screen"
        >
        <h2 class="text-gradient font-title">
            專案項目
        </h2>
        <div class="max-w-full flex flex-row pb-2 overflow-auto">
            <div class="w-fit flex flex-row gap-4 px-4"
                :class=" isLoading && 'pointer-events-none' "
                >
                <NuxtLink
                    v-for=" ( projectType , index ) of projectTypes "
                    class="px-4 py-1 w-fit font-bold text-center whitespace-nowrap border border-primary text-primary rounded-full transition
                    hover:bg-primary hover:text-white"
                    :class=" useRoute().query.type === projectType.id && 'bg-primary text-white' "
                    :key=" index "
                    :to=" {
                        path: '/project/',
                        query: {
                            type: projectType.id,
                            page: 1
                        }
                    }"
                    >
                    {{ projectType.text }}
                </NuxtLink>
            </div>
        </div>
        <div v-if=" !isLoading "
            class="w-full h-auto grid grid-cols-1 gap-8
            sm:grid-cols-2
            xl:grid-cols-3 xl:gap-12"
            >
            <BrandedProject
                v-for=" ( project , index ) of projects "
                :key=" index "
                :project=" project "
                />
        </div>
        <div v-else
            class="w-full h-auto grid grid-cols-1 gap-8
            sm:grid-cols-2
            xl:grid-cols-3 xl:gap-12"
            >
            <BrandedProjectSkeleton/>
            <BrandedProjectSkeleton/>
            <BrandedProjectSkeleton/>
        </div>
        <div class="flex flex-row items-center gap-4 bg-slate-600 p-2 rounded-full shadow-md"
            :class=" isLoading && 'pointer-events-none' "
            >
            <NuxtLink class="bg-secondary-500 text-white px-4 py-1 rounded-full font-bold
                hover:bg-primary"
                :to="{
                    path: '/project/',
                    query: {
                        type: useRoute().query.type,
                        page: pageNow > 1 ? pageNow - 1 : pageNow
                    }
                }"
                >
                Prev
            </NuxtLink>
            <div class="flex flex-row gap-1 font-bold">
                <span class="text-white">
                    {{ pageNow }}
                </span>
                <span class="text-white">
                    ／
                </span>
                <span class="text-white">
                    {{ pageTotal }}
                </span>
            </div>
            <NuxtLink class="bg-secondary-500 text-white px-4 py-1 rounded-full font-bold
                hover:bg-primary"
                :to="{
                    path: '/project/',
                    query: {
                        type: useRoute().query.type,
                        page: pageNow < pageTotal ? pageNow + 1 : pageNow
                    }
                }"
                >
                Next
            </NuxtLink>
        </div>
    </BrandedContainer>
</template>

<script>
    export default {
        async setup() {
            const { data } = await useFetch( '/api/branded/projectType/' )
            return {
                projectTypes: data.value
            }
        },
        data() {
            return {
                isLoading: true,
                projects:  [],
                pageTotal: '',
                pageNow:   ''
            }
        },
        mounted() {
            this.getData()
        },
        watch: {
            '$route.query': function( newValue ) {
                if( !newValue.type && !newValue.page ) return
                this.getData()
                window.scrollTo( 0 , 0 )
            }
        },
        methods: {
            async getData() {
                this.isLoading = true
                const {
                    projects,
                    pageTotal,
                    pageNow
                } = await this.$fetchData( '/api/branded' + useRoute().fullPath )
                this.projects  = projects
                this.pageTotal = Number( pageTotal )
                this.pageNow   = Number( pageNow )
                this.isLoading = false
            }
        }
    }
</script>