import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ssl from "@vitejs/plugin-basic-ssl";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/fitness-zettel/",
    server: {
        open: "/fitness-zettel/",
        port: 3000,
        https: true, // needs https to get mobile-testing working because indexed-db and crypto only work in secure context
    },
    plugins: [
        react(),
        ssl(),
        VitePWA({
            manifest: {
                id: "fitness-zettel",
                name: "Fitness-Zettel",
                short_name: "Fitness-Zettel",
                start_url: "./",
                scope: "./",
                icons: [
                    {
                        src: "icon/favicon256.png",
                        sizes: "256x256",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "icon/favicon512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "icon/favicon.svg",
                        sizes: "any",
                        type: "image/svg",
                        purpose: "any",
                    },
                ],
            },
            workbox: {
                globPatterns: ["**/*.{js,css,html,svg,woff2}"],
            },
        }),
    ],
});

