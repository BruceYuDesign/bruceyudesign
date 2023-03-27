import { gradientAnimate } from "./gradientAnimate"

export default defineNuxtPlugin( () => {
    return {
        provide: {
            gradientAnimate
        }
    }
})