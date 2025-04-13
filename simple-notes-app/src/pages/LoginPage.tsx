import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError('');
    try {
        const res = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        localStorage.setItem('loggedInUser', JSON.stringify(res.data[0]));
        window.dispatchEvent(new Event("storage"));
        navigate('/notes');
      } else { setError('Грешен имейл или парола.'); }
    } catch (err) { setError('Грешка при вход.'); console.error(err); }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div><label htmlFor="email">Имейл:</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><label htmlFor="password">Парола:</label><input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Вход</button>
      </form>
      <p>Нямате акаунт? <Link to="/register">Регистрирайте се тук</Link></p>
    </div>
  );
}