import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    // Load env variables
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
        plugins: [
            laravel({
                input: ['resources/js/app.jsx', 'resources/css/app.css'],
                refresh: true,
            }),
            react(),
        ],
        define: {
            // Directly expose the env variables
            'import.meta.env.VITE_PUSHER_APP_KEY': JSON.stringify(env.PUSHER_APP_KEY),
            'import.meta.env.VITE_PUSHER_APP_CLUSTER': JSON.stringify(env.PUSHER_APP_CLUSTER),
        },
    };
});
