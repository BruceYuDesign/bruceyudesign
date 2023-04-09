<template>
    <NuxtLayout name="blank">
        <div class="w-11/12 max-w-sm bg-white py-12 px-6 flex flex-col gap-4 items-center rounded-2xl shadow-md
            sm:px-12"
            >
            <h2 class="text-sky-500 font-bold text-6xl">
                {{ error.statusCode }}
            </h2>
            <p>
                {{ error.statusMessage }}
            </p>
            <hr class="mt-4 mb-2"/>
            <AdminFormButton
                class="bg-primary"
                text="重新登入"
                @click=" handleError "
                />
        </div>
    </NuxtLayout>
</template>

<script setup>
    const props = defineProps({
        error: Object
    })

    const handleError = () => {
        if(
            window.location.pathname.startsWith( '/admin/' ) ||
            window.location === '/login/'
        ) {
            window.location = '/login/'
            return
        }
        window.location = '/'
    }

    useHead({
        title: '錯誤',
        meta: [
            { name: 'robots' , content: 'noindex, nofollow' }
        ]
    })
</script>