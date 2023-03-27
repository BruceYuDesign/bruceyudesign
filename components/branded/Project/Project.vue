<template>
    <div class="project">
        <div class="project-head">
            <img class="project-image"
                :src=" project.imgs[ 0 ].src "
                :alt=" project.title "
                >
        </div>
        <div class="project-body">
            <h4 class="project-title">
                {{ project.title }}
            </h4>
            <p class="project-subtitle">
                {{ project.subtitle }}
            </p>
        </div>
        <NuxtLink
            class="project-button"
            :to=" '/project/' + project.id "
            >
            觀看內容
        </NuxtLink>
    </div>
</template>

<script>
    export default {
        props: {
            project: Object
        }
    }
</script>

<style src="./project.css"></style>