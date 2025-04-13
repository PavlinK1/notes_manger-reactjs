import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Ще го създадем след малко

interface User { id: number; name: string; email: string; }

export default function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('loggedInUser');
      setLoggedInUser(storedUser ? JSON.parse(storedUser) : null);
    };
    checkUser();
    // Слушател за обновяване, ако localStorage се промени в друг таб/прозорец
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedInUser(null); // Обнови state
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">SimpleNotes</Link>
      <ul className="nav-menu">
        <li className="nav-item"><Link to="/" className="nav-link">Начало</Link></li>
        {loggedInUser && (
          <li className="nav-item"><Link to="/notes" className="nav-link">Бележки</Link></li>
        )}
        {!loggedInUser ? (
          <>
            <li className="nav-item"><Link to="/login" className="nav-link">Вход</Link></li>
            <li className="nav-item"><Link to="/register" className="nav-link">Регистрация</Link></li>
          </>
        ) : (
          <>
            <li className="nav-item"><span className="nav-greeting">Здравей, {loggedInUser.name}!</span></li>
            <li className="nav-item"><button onClick={handleLogout} className="nav-button-link">Изход</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}