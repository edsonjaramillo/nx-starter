import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { adminEnv } from './src/admin-env';

const config = defineConfig({
	server: { port: adminEnv.ADMIN_PORT },
	plugins: [tailwindcss(), tanstackStart(), viteReact()],
});

export default config;
