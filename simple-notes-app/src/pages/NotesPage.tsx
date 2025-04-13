import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface Note { id: number; title: string; content: string; userId: number; }
interface User { id: number; name: string; email: string; }

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  // Вземи потребителя от localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Защитеният рут вече трябва да е спрял нелогнати потребители,
    // но можем да добавим и проверка тук, ако е нужно.
  }, []);

  // useCallback, за да не се пресъздава функцията при всяко рендиране
  const fetchNotes = useCallback(async () => {
    if (!user) return; // Не прави заявка, ако няма потребител
    setLoading(true); setError('');
    try {
      const response = await axios.get<Note[]>(`http://localhost:3001/notes?userId=${user.id}`);
      setNotes(response.data);
    } catch (err) { setError('Грешка при зареждане на бележките.'); console.error(err); }
    finally { setLoading(false); }
  }, [user]);

  // useEffect за зареждане на бележките, когато user се зареди
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]); // Зависи от fetchNotes (която зависи от user)

  const handleAddNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim() || !user) return;
    try {
      await axios.post('http://localhost:3001/notes', {
        title: newNoteTitle,
        content: newNoteContent,
        userId: user.id
      });
      setNewNoteTitle(''); // Изчисти формата
      setNewNoteContent('');
      fetchNotes(); // Презареди бележките
    } catch (err) { setError('Грешка при добавяне.'); console.error(err); }
  };

   const handleDeleteNote = async (noteId: number) => {
        if (!window.confirm("Сигурни ли сте, че искате да изтриете тази бележка?")) return;
        try {
            await axios.delete(`http://localhost:3001/notes/${noteId}`);
            fetchNotes(); // Презареди бележките
        } catch (err) { setError('Грешка при изтриване.'); console.error(err); }
   };

  if (!user) return <p>Зареждане...</p>; // Или съобщение за грешка/пренасочване

  return (
    <div>
      <h2>Моите Бележки (Потребител: {user.name})</h2>

      <form onSubmit={handleAddNote} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #eee' }}>
         <h3>Нова бележка</h3>
         <div>
             <label htmlFor="noteTitle">Заглавие:</label>
             <input type="text" id="noteTitle" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} required />
         </div>
          <div>
              <label htmlFor="noteContent">Съдържание:</label>
              <textarea id="noteContent" value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} required />
          </div>
        <button type="submit">Добави бележка</button>
      </form>

      {loading && <p>Зареждане на бележки...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div>
          {notes.length === 0 && <p>Нямате добавени бележки.</p>}
          {notes.map(note => (
            <div key={note.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px', position: 'relative' }}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button
                  onClick={() => handleDeleteNote(note.id)}
                  style={{ position: 'absolute', top: '5px', right: '5px', background: 'red', color: 'white', border: 'none', cursor: 'pointer', padding: '3px 6px' }}
                  title="Изтрий бележката"
               > X </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}