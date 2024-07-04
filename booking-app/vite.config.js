import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from 'rollup-plugin-postcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    postcss({
      // This plugin will resolve .css and .pcss files automatically
      extract: 'index.css', // Extract CSS to this file
    }),
  ],
})
