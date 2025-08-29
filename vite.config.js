import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'date-fns': resolve(__dirname, 'node_modules/date-fns/esm'),
    },
  },
});
