import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { supabase } from './lib/supabaseClient'; 

function App() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from('users').select('*')
      if (error) {
        console.error('Error fetching users:', error)
      } else {
        setUsers(data || [])
      }
    }

    fetchUsers()
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Affiliate Genius 👋</h1>
      <h2 className="text-lg font-semibold mb-2">User List</h2>
      <ul className="list-disc pl-6">
        {users.length === 0 ? (
          <li>No users found</li>
        ) : (
          users.map((user) => <li key={user.id}>{user.email}</li>)
        )}
      </ul>
    </main>
  )
}

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)


