import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavbarMobile from './pages/coba/NavbarMobile';
import NavbarWeb from './pages/coba/NavbarWeb';
import Home from './pages/home/Home';
import OnGoing from './pages/Admin/Dashboard/OnGoing';
import AgendaList from './pages/Admin/Agenda/AgendaList';
import EditAgenda from './pages/Admin/Agenda/EditAgenda';
import Login from './pages/LoginandRegist/Login';
import Setting from './pages/setting-profile/Setting';
import AddAgenda from './pages/Admin/Agenda/AddAgenda';
import DisposisiList from './pages/Admin/MasterData/Disposisi/DisposisiList';
import AddDisposisi from './pages/Admin/MasterData/Disposisi/AddDisposisi';
import ProtectedRoute from './ProtectedRoutes';
import Footer from './pages/coba/Footer';
// Import the ProtectedRoute component

function App({ apiUrl }) {

  return (
    <div className="flex min-h-screen w-full flex-col">
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<Home apiUrl={apiUrl} />} />
        </Routes>
      </BrowserRouter>

      <BrowserRouter basename='/admin'>
        <Routes>
          <Route path='/login' element={<Login apiUrl={apiUrl}/>} />
        </Routes>
      </BrowserRouter>

      <BrowserRouter basename='/control'>
        <ProtectedRoute>
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <NavbarWeb />
            <div className="flex flex-col">
              <NavbarMobile />
              <Routes>
                <Route path='/dashboard' element={<OnGoing apiUrl={apiUrl}/>} />
                <Route path='/agenda' element={<AgendaList apiUrl={apiUrl} />} />
                <Route path='/agenda/add-agenda' element={<AddAgenda apiUrl={apiUrl} />} />
                <Route path='/agenda/edit-agenda/:id' element={<EditAgenda apiUrl={apiUrl} />} />
                <Route path='/setting' element={<Setting />} />
                <Route path='/disposisi' element={<DisposisiList apiUrl={apiUrl} />} />
                <Route path='/disposisi/add-disp' element={<AddDisposisi apiUrl={apiUrl} />} />
              </Routes>
              <Footer />
            </div>
          </div>
        </ProtectedRoute>
      </BrowserRouter>
    </div>
  );
}

export default App;
