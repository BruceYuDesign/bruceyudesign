<template>
    <ul class="flow-list">
        <li v-for=" ( flow , index ) in flows "
            class="flow"
            :key=" index "
            >
            <div class="flow-icon-outline">
                <ClientOnly>
                    <FontAwesomeIcon
                        class="flow-icon"
                        :icon=" flow.fontAwesomeIcon "
                        />
                </ClientOnly>
            </div>
            <h3 class="flow-title">
                {{ flow.title }}
            </h3>
            <ul class="flow-item-list">
                <li v-for=" ( item , index ) in flow.items "
                    class="flow-item"
                    :key=" index "
                    >
                    {{ item }}
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            flows: Array
        }
    }
</script>

<style scoped>
    .flow-list {
        @apply w-full grid grid-cols-1 gap-6
        sm:grid-cols-2
        xl:grid-cols-4;
    }
    .flow {
        @apply relative px-8 py-12 flex flex-col items-center justify-start gap-4 bg-slate-50 rounded-2xl drop-shadow-md;
    }
    .flow:not( :last-child ):before {
        @apply absolute bg-inherit rotate-45 rounded -z-10;
        content: '';
        --size: 2.5rem;
        width:  var( --size );
        height: var( --size );
        bottom: calc( var( --size ) / -4 );
        right:  calc( 50% - var( --size ) / 2 );
    }
    @media ( min-width: 640px ) {
        .flow:not( :last-child ):before {
            bottom: calc( 50% - var( --size ) / 2 );
            right:  calc( var( --size ) / -4 );
        }
    }
    .flow-icon-outline {
        @apply w-20 h-20 grid place-items-center bg-sky-100 rounded-full;
    }
    .flow-icon {
        @apply text-sky-300 text-4xl;
    }
    .flow-title {
        @apply text-2xl text-center font-bold text-sky-500;
    }
    .flow-item-list {
        @apply w-full ml-3 text-lg leading-loose -indent-4 text-slate-500;
    }
    .flow-item::before {
        content: '•';
        @apply text-sky-400 mr-2 font-bold;
    }
    .flow-item {
        @apply mt-2;
    }
</style>