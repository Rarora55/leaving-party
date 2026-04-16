import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig(async () => {
  const isVitest = Boolean(process.env.VITEST);
  const plugins = [react()];

  if (!isVitest) {
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    plugins.unshift(tailwindcss());
  }

  return {
    plugins,
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      css: true,
      coverage: {
        reporter: ['text', 'html'],
      },
    },
  };
});
