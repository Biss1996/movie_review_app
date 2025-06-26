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

   };

  const handleBlockUser = (id) => {

  };

  return (
<div className="relative bg-gradient-to-b from-blue-200 to-blue-200/30 dark:from-blue-900 dark:to-blue-900/30 w-full min-h-screen pt-0 pb-0">
     

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Is Admin
            </th>
            <th scope="col" className="px-6 py-3">
              Is Blocked
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
              <tr
                key={user.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
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
                    className="bg-gray-600 px-4 py-2 font-medium text-white dark:text-blue-500 hover:bg-gray-400"
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
