import { useState } from 'react';

const sampleUsers = [
  { id: 1, username: 'Bismark Bett', email: 'bismark@gmail.com', isAdmin: true, isBlocked: false },
  { id: 2, username: 'Mercy Mike', email: 'mercy.mike@example.com', isAdmin: false, isBlocked: false },
  { id: 3, username: 'admin_user', email: 'admin@example.com', isAdmin: true, isBlocked: true },
  { id: 4, username: 'test_user', email: 'test.user@example.com', isAdmin: false, isBlocked: false },
];

const Users = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState(sampleUsers);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleBlockUser = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
    );
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 w-full min-h-screen pt-0 pb-0">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded w-full max-w-md"
        />
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Is Admin</th>
            <th className="px-6 py-3">Is Blocked</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.id}
              className="odd:bg-blue-300 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.username}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.isAdmin ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4">{user.isBlocked ? 'Yes' : 'No'}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleBlockUser(user.id)}
                  className={`px-4 py-2 font-medium text-white rounded ${
                    user.isBlocked ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
