import React from 'react';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      {/* User Navbar or other layout components can go here */}
      <Outlet />
    </div>
  );
};

export default UserLayout;
