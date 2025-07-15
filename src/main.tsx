import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error.message);
      } else {
        console.log('Fetched users:', data);
        setUsers(data);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Hello Affiliate Genius 👋</h1>
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

export default App;