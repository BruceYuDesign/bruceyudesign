<template>
    <Draggable
        animation="300"
        ghost-class="opacity-0"
        v-bind=" $attrs "
        >
        <template #item="{ element , index }">
            <div>
                <slot
                    name="item"
                    :element=" element "
                    :index=" index "
                    >
                </slot>
            </div>
        </template>
    </Draggable>
</template>

<script>
    export default {
        inheritAttrs: false
    }
</script>