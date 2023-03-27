<template>
    <Vue3EasyDataTable
        theme-color="#0ea5e9"
        hide-rows-per-page
        alternating
        buttons-pagination
        :rows-per-page=" 10 "
        empty-message="未有任何資訊"
        v-bind=" $attrs ">
        <template v-for=" name of Object.keys( $slots ) "
            v-slot:[name]=" slotData ">
            <slot
                :name="name"
                v-bind="slotData">
            </slot>
        </template>
    </Vue3EasyDataTable>
</template>

<script>
    import 'vue3-easy-data-table/dist/style.css'
    export default {
        inheritAttrs: false
    }
</script>

<style src="./table.css"></style>

<style>
    .vue3-easy-data-table {
        --easy-table-border: none;
        --easy-table-row-border: 2px solid #f1f5f9;

        --easy-table-footer-background-color: #f8fafc;
        --easy-table-footer-font-color: #c0c7d2;
        --easy-table-footer-font-size: 1rem;
        --easy-table-footer-padding: 1rem;
        --easy-table-footer-height: 4rem;

        --easy-table-scrollbar-track-color: #eeeeee;
        --easy-table-scrollbar-color: transparent;
        --easy-table-scrollbar-thumb-color: #9ed2ff;
    }

    .vue3-easy-data-table__header .header-text {
        @apply text-base text-primary
    }
    .vue3-easy-data-table__header th.sortable .sortType-icon {
        @apply !opacity-30 !border-b-primary
    }
    .vue3-easy-data-table__header th.sortable.asc  .sortType-icon,
    .vue3-easy-data-table__header th.sortable.desc .sortType-icon {
        @apply !opacity-100
    }

    .vue3-easy-data-table__body > tr:hover > td {
        @apply !bg-none
    }

    .vue3-easy-data-table__main > .vue3-easy-data-table__message {
        @apply !text-sm !text-secondary
    }
</style>