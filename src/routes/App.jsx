import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Login from '../modules/auth/components/Login';
import NotFound from '@/modules/auth/components/NotFound';
import { AuthProvider, AuthRoute } from '@/modules/auth/context/auth'
import { Logout } from '@/modules/auth/components/Logout';
import Home from '../modules/home/Home';
import SuperAdmin from '../modules/pages/superAdmin/SuperAdmin';
import Index from '../modules/auth/Index';

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
              path="/logout"
              element={
                <AuthRoute>
                  <Logout />
                </AuthRoute>
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