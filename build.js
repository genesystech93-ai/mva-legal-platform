import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

console.log('[Node.js Build] Compiling frontend bundle...');
try {
  await build({
    plugins: [react(), tailwindcss()],
  });
  console.log('[Node.js Build] Build completed successfully.');
} catch (err) {
  console.error('[Node.js Build] Build failed:', err);
  process.exit(1);
}
