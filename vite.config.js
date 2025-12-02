import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/simplemem-page/', // 👈 这里改成你的仓库名
});
