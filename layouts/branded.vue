<template>
    <div>
        <BrandedHeader/>
        <main class="w-full min-h-screen">
            <slot></slot>
        </main>
        <BrandedFooter/>
        <Welcom/>
    </div>
</template>