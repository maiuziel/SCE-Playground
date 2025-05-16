import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function CreateItem() {
  const { user } = useContext(UserContext);

  const handleCreate = async () => {
    const res = await fetch('http://localhost:4001/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ name: 'Example Item' }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Created new item with ID ${data.id}. Welcome, ${user.name}!`);
    } else {
      alert('❌ Failed to create item');
    }
  };

  return <button onClick={handleCreate}>Create Item</button>;
}
