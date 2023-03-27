<template>
    <label>
        {{ label }}
        <input
            :checked=" modelValue "
            @input=" handleInput "
            v-bind=" $attrs "
            type="checkbox"
            />
        <div class="toggle">
            <span class="toggle-text">
                {{ falseText }}
            </span>
            <span class="toggle-thumb"></span>
            <span class="toggle-text">
                {{ trueText }}
            </span>
        </div>
    </label>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            label: {
                type: String,
                default: ''
            },
            modelValue: {
                type: Boolean,
                default: false
            },
            trueText:  {
                type: String,
                default: 'ON'
            },
            falseText: {
                type: String,
                default: 'OFF'
            }
        },
        methods: {
            handleInput( event ) {
                this.$emit( 'update:modelValue' , event.target.checked )
            }
        }
    }
</script>

<style scoped>
    label {
        @apply w-fit flex flex-col gap-1 text-sm text-secondary-500;
    }
    input {
        @apply hidden;
    }

    .toggle {
        @apply relative w-fit flex flex-row bg-secondary-50 border-secondary-200 border-2 rounded-full cursor-pointer transition;
    }
    .toggle-thumb {
        @apply absolute left-0 top-0 block w-1/2 h-full rounded-full bg-danger transition;
    }
    .toggle-text {
        @apply w-1/2 px-3 py-1.5 text-center font-bold whitespace-nowrap z-10 transition
        first:text-white last:text-secondary-300;
    }

    input:checked + .toggle > .toggle-text {
        @apply first:text-secondary-300 last:text-white;
    }

    input:checked + .toggle > .toggle-thumb {
        @apply translate-x-full bg-success;
    }
</style>