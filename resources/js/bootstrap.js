// resources/js/bootstrap.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

// Set axios defaults for CSRF protection

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.withCredentials = true;

window.axios = axios;
window.Pusher = Pusher;

// Debug environment variables
console.log('VITE_PUSHER_APP_KEY:', import.meta.env.VITE_PUSHER_APP_KEY);
console.log('VITE_PUSHER_APP_CLUSTER:', import.meta.env.VITE_PUSHER_APP_CLUSTER);

// Check if we have valid Pusher credentials before initializing Echo
if (import.meta.env.VITE_PUSHER_APP_KEY && import.meta.env.VITE_PUSHER_APP_CLUSTER) {
    console.log('Initializing Echo with:', {
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER
    });

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        auth: {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'X-Requested-With': 'XMLHttpRequest',
            }
        }
    });
} else {
    console.error('Missing Pusher credentials. Echo initialization skipped.');
}