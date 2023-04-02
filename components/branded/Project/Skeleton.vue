<template>
    <div class="project">
        <div class="project-head project-skeleton"></div>
        <div class="project-body">
            <div class="project-title project-skeleton"></div>
            <div class="project-subtitle project-skeleton"></div>
        </div>
        <div class="project-button project-skeleton"></div>
    </div>
</template>

<style src="./project.css"></style>
<style scoped>
    .project-title {
        @apply h-6 w-1/2 mb-2 rounded-full;
    }
    .project-subtitle {
        @apply h-5 w-2/3 mb-2 rounded-full;
    }
    .project-button {
        @apply w-[6.125rem] h-[2.125rem];
    }
    .project-skeleton {
        @apply bg-slate-300 border-none pointer-events-none animate-pulse;
    }
</style>