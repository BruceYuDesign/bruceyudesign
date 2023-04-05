<template>
    <div class="flex flex-row bg-slate-200/60">
        <AdminNavbar/>
        <main class="w-full min-h-screen pb-12">
            <AdminHeader/>
            <article class="w-11/12 mx-auto max-w-7xl flex flex-col gap-8 mt-10
                md:w-5/6">
                <slot></slot>
            </article>
        </main>
        <AdminLoading/>
        <Welcom/>
    </div>
</template>

<script setup>
    useHead({
        title: '管理系統',
        meta: [
            { name: 'robots' , content: 'noindex, nofollow' }
        ]
    })
</script>