import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import api from '../services/api'; // Uses baseURL and token interceptor

export default function CreateItem() {
  const { user } = useContext(UserContext);

  const handleCreate = async () => {
    try {
      const res = await api.post('/items', {
        name: 'Example Item',
      });

      alert(`✅ Created new item with ID ${res.data.id}. Welcome, ${user.name}!`);
    } catch (err) {
      console.error('❌ Failed to create item:', err);
      alert('❌ Failed to create item');
    }
  };

  return <button onClick={handleCreate}>Create Item</button>;
}
