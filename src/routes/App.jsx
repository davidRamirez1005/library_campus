import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '@/modules/auth/components/NotFound';
import { AuthProvider, AuthRoute } from '@/modules/auth/context/auth'
import { Logout } from '@/modules/auth/components/Logout';
import Home from '../modules/home/Home';
import SuperAdmin from '../modules/pages/superAdmin/SuperAdmin';
import Index from '../modules/auth/Index';
import Admin from '../modules/pages/admin/Admin';
import Client from '../modules/pages/client/Client';
import Registrer from '../modules/auth/components/Registrer';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Index />} />
              <Route
              path="/SuperAdmin"
              element={
                <AuthRoute>
                  <SuperAdmin />
                </AuthRoute>
              }
            />
            <Route
              path="/Admin"
              element={
                <AuthRoute>
                  <Admin />
                </AuthRoute>
              }
            />
              <Route
              path="/Client"
              element={
                <AuthRoute>
                  <Client />
                </AuthRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthRoute>
                  <Logout />
                </AuthRoute>
              }
            />
            <Route
              path="/Registrer"
              element={
                  <Registrer />
              }
            />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;