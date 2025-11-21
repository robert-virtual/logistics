import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  base:'/logistics/',
  plugins: [
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
      name: 'Logistics',
      short_name: 'Logistics',
      description: 'Aplicacion para logistica para empresas',
      theme_color: '#6A3DE8',
      display:'standalone',
      start_url:'/logistics/',
      scope:'/logistics/',
      icons: [
        { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
      ],
      },
      workbox: {
        navigateFallback: "/logistics/index.html",
      },
    })
  ],
});
