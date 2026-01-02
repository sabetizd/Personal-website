import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { twTreePlugin } from '@tailwind-tree/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
    twTreePlugin(),
  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,"src"),
      '@components' : path.resolve(__dirname,'src/components')
    }
  }
})
