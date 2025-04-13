import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError('');
    if (!name || !email || !password) { setError('Моля, попълнете всички полета.'); return; }
    try {
      const existing = await axios.get(`http://localhost:3001/users?email=${email}`);
      if (existing.data.length > 0) { setError('Имейлът е зает.'); return; }
      await axios.post('http://localhost:3001/users', { name, email, password });
      navigate('/login');
    } catch (err) { setError('Грешка при регистрация.'); console.error(err); }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div><label htmlFor="name">Име:</label><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
        <div><label htmlFor="email">Имейл:</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><label htmlFor="password">Парола:</label><input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Регистрация</button>
      </form>
      <p>Вече имате акаунт? <Link to="/login">Влезте тук</Link></p>
    </div>
  );
}