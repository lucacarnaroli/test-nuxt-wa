import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        'vuetify/lib/styles/main.sass', 
        '~/assets/main.scss', 
        '@mdi/font/css/materialdesignicons.min.css',],
    build: {
        transpile: ['vuetify'],
    },
    alias: {
        "@": resolve(__dirname, '/')
    },
    
})
