/**
 * TruthLens AI - Vite Build & Development Configuration
 * 
 * Configures:
 * - `@vitejs/plugin-react` for Fast Refresh and React 19 JSX transformations.
 * - `@tailwindcss/vite` for Tailwind CSS v4 JIT compilation.
 * - Path alias `@` mapping to project root for clean import paths.
 * - Development server HMR & file watching rules.
 */

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is controlled via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
