<template>
    <BrandedContainer>
        <div class="w-full flex flex-col-reverse bg-white overflow-hidden rounded-2xl shadow-md
            lg:flex-row-reverse lg:aspect-video"
            >
            <div class="w-full h-full p-4 overflow-auto
                lg:p-8">
                <div class="w-full h-fit flex flex-col gap-2">
                    <h1 class="text-gradient font-title">
                        {{ project.title }}
                    </h1>
                    <h2 class="text-2xl font-bold text-secondary">
                        {{ project.subtitle }}
                    </h2>
                    <hr class="my-4">
                    <span>
                        類別：
                    </span>
                    <p>
                        {{ project.type.join( ' , ' ) }}
                    </p>
                    <span>
                        日期：
                    </span>
                    <p>
                        {{ project.date }}
                    </p>
                    <span v-if=" project.linkHref ">
                        連結：
                    </span>
                    <a v-if=" project.linkHref "
                        class="w-fit text-primary hover:text-primary-400"
                        :href=" project.linkHref "
                        target="_blank"
                        >
                        <ClientOnly>
                            <FontAwesomeIcon icon="fa-solid fa-link" />
                        </ClientOnly>
                        {{ project.linkName }}
                    </a>
                    <hr class="my-4">
                    <span>
                        內文：
                    </span>
                    <p class="whitespace-pre-wrap">
                        {{ project.desc }}
                    </p>
                </div>
            </div>
            <div class="h-full w-full aspect-square">
                <BrandedProjectImageSwiper
                    :images=" project.imgs "
                    />
            </div>
        </div>
    </BrandedContainer>
    <BrandedContainer id="project">
        <h3 class="text-gradient font-title">
            其他作品
        </h3>
        <BrandedProjectSwiper
            :projects=" projects "
            />
    </BrandedContainer>
</template>

<script>
    export default {
        async setup() {
            const { id } = useRoute().params
            const { data , error } = await useFetch( `/api/branded/project/${ id }` )
            if( error.value ) {
                return showError( error.value )
            }
            const { project , projects } = data.value
            return { project , projects }
        }
    }
</script>