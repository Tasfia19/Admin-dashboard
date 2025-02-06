import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="relative flex">
      {/* User List */}
      <div className="p-6 w-2/3">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="p-4 bg-gray-100 rounded shadow transition hover:bg-gray-200">
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-gray-700">{user.email}</p>
              <p className="text-gray-600">{user.address.city}</p>
              <button
                onClick={() => setSelectedUser(user)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Slide-in User Details */}
      <div className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${
        selectedUser ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {selectedUser && (
          <>
            <h3 className="text-xl font-semibold mb-2">{selectedUser.name}</h3>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Street:</strong> {selectedUser.address.street}</p>
            <p><strong>Suite:</strong> {selectedUser.address.suite}</p>
            <p><strong>City:</strong> {selectedUser.address.city}</p>
            <p><strong>Zipcode:</strong> {selectedUser.address.zipcode}</p>
            <p><strong>Geo:</strong> Lat {selectedUser.address.geo.lat}, Lng {selectedUser.address.geo.lng}</p>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
