
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Navigation } from './Components/Layout/Navigation';
import { AuthForm } from './Components/Auth/AuthForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { useAuth } from './hooks/useAuth';
import { CreatePage } from "./components/pages/CreatePage";
import { ServiceList } from "./components/Services/ServiceList";
import { EventCalendar } from "./components/Events/EventCalendar";
import { AnnouncementList } from './components/Announcements/AnnouncementList';
import { OpportunitiesList } from './components/Opportunities/OpportunitiesList';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {user && <Navigation />}
        
        <main>
          <Routes>
            <Route
              path="/"
              element={user ? <Dashboard /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <AuthForm mode="login" onSuccess={() => window.location.href = '/'} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <AuthForm mode="signup" />
                )
              }
            />
            <Route
              path="/reset-password"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <AuthForm mode="reset" />
                )
              }
            />
            
            {/* Protected Routes */}
            <Route
              path="/services"
              element={
                user ? (
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Servicios</h1>
                        <ServiceList />
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/events"
              element={
                user ? (
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Eventos</h1>
                    <p className="text-gray-600"><EventCalendar /></p>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/opportunities"
              element={
                user ? (
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Oportunidades</h1>
                    <div className="text-gray-600"><OpportunitiesList/></div>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/announcements"
              element={
                user ? (
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Anuncios</h1>
                    <p className="text-gray-600"><AnnouncementList/></p>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
  path="/create"
  element={user ? <CreatePage /> : <Navigate to="/login" replace />}
/>
            <Route
              path="/profile"
              element={
                user ? (
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Perfil</h1>
                    <p className="text-gray-600">Próximamente: Gestión del perfil de usuario</p>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/my-services"
              element={
                user ? (
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Servicios</h1>
                    <p className="text-gray-600">Próximamente: Gestión de servicios publicados</p>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/search"
              element={
                user ? (
                  <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Resultados de Búsqueda</h1>
                    <p className="text-gray-600">Próximamente: Sistema de búsqueda integral</p>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;