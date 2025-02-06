import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="w-64 sm:w-80 h-screen bg-gray-800 text-white p-6 shadow-md">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/users" className="block py-2 px-4 bg-violet-400 rounded hover:bg-violet-500 transition">
              Users
            </Link>
          </li>
          <li>
            <Link to="/products" className="block py-2 px-4 bg-violet-400 rounded hover:bg-violet-500 transition">
              Products
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
