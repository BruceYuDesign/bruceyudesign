<template>
    <footer class="footer">
        <span class="footer-text">{{ 'Copyright ' + year }}&copy;
            <a class="footer-link"
                href="/"
                >BRUCE YU DESIGN</a
            > 版權所有
        </span>
    </footer>
</template>

<script setup>
    const year = new Date().getFullYear()
</script>

<style scoped>
    .footer {
        @apply w-full py-6 px-4 text-center bg-[#181818];
        
    }
    .footer-text {
        @apply text-white text-sm
        sm:text-base;
    }
    .footer-link {
        @apply font-futura underline transition
        hover:text-primary-400
    }
</style>