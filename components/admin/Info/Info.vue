<template>
    <div class="info">
        <div class="info-head">
            <slot name="head"></slot>
        </div>
        <div class="info-body"
            :class=" $slots['body-row'] && 'info-body-row' ">
            <slot name="body"></slot>
            <slot name="body-col"></slot>
            <slot name="body-row"></slot>
        </div>
        <hr/>
        <div class="info-foot">
            <slot name="foot"></slot>
        </div>
    </div>
</template>

<style scoped>
    .info {
        @apply p-6 flex flex-col gap-8 bg-white
        sm:p-10;
    }
    .info-head {
        @apply flex flex-row flex-wrap gap-4;
    }
    .info-body {
        @apply flex flex-col gap-4;
    }
    .info-body-row {
        @apply items-center md:flex-row md:gap-8 md:items-start;
    }
    .info-foot {
        @apply flex flex-row flex-wrap gap-4 justify-end;
    }
</style>