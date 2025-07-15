import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { supabase } from './lib/supabaseClient';

function App() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        console.log('Fetched users:', data);
        setUsers(data || []);
      }
    }

    fetchUsers();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Affiliate Genius 👋</h1>
      <h2 className="text-xl font-semibold mb-2">User List</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.uid}>
              {user.full_name} – {user.email}
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </main>
  );
}

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);