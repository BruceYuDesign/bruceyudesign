/** @type {import('tailwindcss').Config} */

const colors = require( 'tailwindcss/colors' )

module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
        "./error.vue"
    ],
    theme: {
        extend: {
            fontFamily: {
                futura: 'futura'
            },
            colors: {
                primary: {
                    DEFAULT: colors.sky[ '500' ],
                    ...colors.sky
                },
                success: {
                    DEFAULT: colors.teal[ '500' ],
                    ...colors.teal
                },
                secondary: {
                    DEFAULT: colors.slate[ '400' ],
                    ...colors.slate
                },
                warning: {
                    DEFAULT: colors.amber[ '500' ],
                    ...colors.amber
                },
                danger: {
                    DEFAULT: colors.rose[ '400' ],
                    ...colors.rose
                }
            }
        }
    }
}
