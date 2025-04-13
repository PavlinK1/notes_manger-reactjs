import { JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import HomePage from './pages/HomePage.tsx'; 
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import NotesPage from './pages/NotesPage.tsx';
import './App.css'; // Може да добавиш App-специфични стилове тук

// Прост компонент за защита на пътища
function ProtectedRoute({ children }: { children: JSX.Element }) {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

function App() {
  return (
    <> {/* Може да използваш Fragment <>...</> */}
      <Navbar />
      <main className="container"> {/* Добавяме клас за лесно стилизиране */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/notes"
            element={
              <ProtectedRoute>
                <NotesPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<h2>404: Страницата не е намерена</h2>} />
        </Routes>
      </main>
    </>
  );
}

export default App;