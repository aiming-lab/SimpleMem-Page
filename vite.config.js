import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/SimpleMem-Page/', // 👈 匹配GitHub仓库名的大小写
});
