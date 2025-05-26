
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
// Fix: Import fileURLToPath to resolve __dirname in ES modules
import { fileURLToPath } from 'node:url';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    // Fix: Define currentDir using import.meta.url for ES modules
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    return {
      define: {
        'process.env.USER1_USERNAME': JSON.stringify(env.USER1_USERNAME),
        'process.env.USER1_PASSWORD': JSON.stringify(env.USER1_PASSWORD),
        'process.env.USER2_USERNAME': JSON.stringify(env.USER2_USERNAME),
        'process.env.USER2_PASSWORD': JSON.stringify(env.USER2_PASSWORD)
      },
      resolve: {
        alias: {
          // Fix: Use the derived current directory for the '@' alias
          '@': currentDir,
          // Add alias: When index.html requests /index.js in dev mode,
          // Vite will serve and process index.tsx from the project root.
          '/index.js': path.resolve(currentDir, 'index.tsx'),
        }
      }
    };
});