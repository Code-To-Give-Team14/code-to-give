import {defineConfig} from 'vite'
import {VitePWA} from "vite-plugin-pwa";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
                registerType: 'autoUpdate',
                workbox: {globPatterns: ['**/*.{js,css,html,jpg,png,jpeg}']},
                injectManifest: {globPatterns: ['**/*.{js,css,html,jpg,png,jpeg']},
            }
        )
    ]
})
