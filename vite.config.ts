import path from "path"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: 'next/navigation',
        replacement: path.join(process.cwd(), 'src/shared/mocks/next-navigation.ts'),
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
    ]
  },
});
