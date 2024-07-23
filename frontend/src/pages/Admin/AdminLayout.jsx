import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import NavbarMobile from '../coba/NavbarMobile';
import NavbarWeb from '../coba/NavbarWeb';

const AdminLayout = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavbarWeb />
      <div className="flex flex-col">
        <NavbarMobile />
        <div className="p-4">
          <Link to="/" className="text-blue-500 hover:text-blue-700">
            Go to User View
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
