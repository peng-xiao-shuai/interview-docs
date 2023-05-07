import { defineConfig } from 'vite';
import { MarkdownTransform } from './utils/markdown-transform';

export default defineConfig(async ({ mode }) => {
  return {
    plugins: [MarkdownTransform()],
    server: {
      port: 8080,
      host: true,
    },
    build: {
      chunkSizeWarningLimit: 1024,
    },
  };
});
