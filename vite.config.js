import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const env = loadEnv("development", process.cwd(), 'VITE')

console.log(env);
export default defineConfig({
  plugins: [react()],
  'react-bootstrap': 'react-bootstrap/esm',
  resolve: {
        alias: {
          '@': '/src',
        }
  },
  server:{
    port: env.VITE_PORT_FRONTEND,
    host: env.VITE_HOSTNAME,
  }
})