import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { env } from './src/env';

const config = defineConfig({
	server: { port: env.WEB_PORT },
	plugins: [tailwindcss(), tanstackStart(), viteReact()],
});

export default config;
