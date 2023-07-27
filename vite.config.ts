import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@apis': path.resolve(__dirname, 'src/apis'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
});
