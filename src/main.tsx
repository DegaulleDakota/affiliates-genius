import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import supabase from './lib/supabaseClient';

function App() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('❌ Error fetching users:', error.message);
      } else {
        console.log('✅ Fetched users:', data);
        setUsers(data || []);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Hello Affiliate Genius 🚀</h1>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.full_name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);