import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'
import typescript from '@rollup/plugin-typescript'

import path from 'path'
const resolvePath = (str: string) => path.resolve(__dirname, str)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    lib: {
      entry: [
        './src/index.ts',
        './src/components/index.ts',
        './src/plugins/index.ts',
        './src/utils/index.ts',
      ],
      formats: ['es'],
    },
    outDir: './es',
    minify: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', 'react/jsx-runtime'],
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
        globals: {
          react: 'react',
          antd: 'antd',
          'react-dom': 'react-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
      plugins: [
        typescript({
          target: 'es2015', // 这里指定编译到的版本
          rootDir: resolvePath('src/'),
          declaration: true,
          declarationDir: resolvePath('es'),
          exclude: resolvePath('node_modules/**'),
          allowSyntheticDefaultImports: true,
        }),
      ],
    },
  },
})
