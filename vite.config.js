import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

dotenv.config();
const env = loadEnv("development", process.cwd(), 'VITE')

// console.log(env);
export default defineConfig({
  plugins: [react()],
  'react-bootstrap': 'react-bootstrap/esm',
  resolve: {
        alias: {
          '@': '/src',
          '.env': '/path/to/.env/file',
        }
  },
  server:{
    port: env.VITE_PORT_FRONTEND,
    host: env.VITE_HOSTNAME,
  }
})