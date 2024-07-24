'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FaClipboardList, FaMapMarkerAlt, FaUsers, FaUserPlus } from 'react-icons/fa';

export default function OnGoing({ apiUrl }) {
  const navigate = useNavigate();
  const [agendaCount, setAgendaCount] = useState(0);
  const [ruanganCount, setRuanganCount] = useState(0);
  const [disposisiCount, setDisposisiCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const agendaResponse = await axios.get(`${apiUrl}/count`);
      const agendaData = agendaResponse.data;
      const totalAgendas = agendaData.totalAgendas;

      if (totalAgendas === null || totalAgendas === 0) {
        setAgendaCount(0); // Set langsung tanpa animasi
      } else {
        animateCount(setAgendaCount, totalAgendas);
      }

      // Animasi untuk count lainnya (disesuaikan jika menggunakan API yang sebenarnya)
      animateCount(setRuanganCount, 9);
      animateCount(setDisposisiCount, 60);
      animateCount(setUsersCount, 1);
    } catch (error) {
      console.error('Error fetching counts:', error);
      // Set semua count menjadi 0 jika terjadi error
      setAgendaCount(0);
      setRuanganCount(0);
      setDisposisiCount(0);
      setUsersCount(0);
    }
  };

  const animateCount = (setCount, target) => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setCount(count);
      if (count === target) {
        clearInterval(interval);
      }
    }, 50);
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-4 rounded-lg border border-dashed shadow-sm w-full">
        <Card className="flex flex-col items-center justify-center w-60 h-60 sm:w-48 sm:h-48 lg:w-60 lg:h-60 p-5 bg-blue-500 text-white cursor-pointer hover:bg-blue-700" onClick={() => handleCardClick('/agenda')}>
          <FaClipboardList className="text-6xl sm:text-5xl lg:text-6xl mb-1" />
          <CardContent>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-2xl sm:text-xl lg:text-2xl font-semibold tracking-tight">AGENDA</h3>
              <p className="text-4xl sm:text-4xl lg:text-5xl font-bold">{agendaCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center w-60 h-60 sm:w-48 sm:h-48 lg:w-60 lg:h-60 p-5 bg-red-500 text-white cursor-pointer hover:bg-red-700" onClick={() => handleCardClick('/lokasi-rapat')}>
          <FaMapMarkerAlt className="text-6xl sm:text-5xl lg:text-6xl" />
          <CardContent>
            <div className="flex flex-col items-center gap-2 mb-1">
              <h3 className="text-2xl sm:text-xl lg:text-2xl font-semibold tracking-tight">RUANGAN</h3>
              <p className="text-4xl sm:text-4xl lg:text-5xl font-bold">{ruanganCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center w-60 h-60 sm:w-48 sm:h-48 lg:w-60 lg:h-60 p-5 bg-green-500 text-white cursor-pointer hover:bg-green-700" onClick={() => handleCardClick('/disposisi')}>
          <FaUsers className="text-6xl sm:text-5xl lg:text-6xl" />
          <CardContent>
            <div className="flex flex-col items-center gap-2 mb-1">
              <h3 className="text-2xl sm:text-xl lg:text-2xl font-semibold tracking-tight">DISPOSISI</h3>
              <p className="text-4xl sm:text-4xl lg:text-5xl font-bold">{disposisiCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center justify-center w-60 h-60 sm:w-48 sm:h-48 lg:w-60 lg:h-60 p-5 bg-yellow-500 text-white cursor-pointer hover:bg-yellow-700" onClick={() => handleCardClick('/users')}>
          <FaUserPlus className="text-6xl sm:text-5xl lg:text-6xl" />
          <CardContent>
            <div className="flex flex-col items-center gap-2 mb-1">
              <h3 className="text-2xl sm:text-xl lg:text-2xl font-semibold tracking-tight">USERS</h3>
              <p className="text-4xl sm:text-4xl lg:text-5xl font-bold">{usersCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}



// 'use client'

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { FaClipboardList, FaMapMarkerAlt, FaUsers, FaUserPlus } from 'react-icons/fa';

// export default function OnGoing() {
//   const navigate = useNavigate();
//   const [agendaCount, setAgendaCount] = useState(0);
//   const [ruanganCount, setRuanganCount] = useState(0);
//   const [disposisiCount, setDisposisiCount] = useState(0);
//   const [usersCount, setUsersCount] = useState(0);

//   useEffect(() => {
//     animateCount(setAgendaCount, 100);
//     animateCount(setRuanganCount, 7);
//     animateCount(setDisposisiCount, 34);
//     animateCount(setUsersCount, 1);
//   }, []);

//   const animateCount = (setCount, target) => {
//     let count = 0;
//     const interval = setInterval(() => {
//       count += 1;
//       setCount(count);
//       if (count === target) {
//         clearInterval(interval);
//       }
//     }, 50);
//   };

//   const handleCardClick = (path) => {
//     navigate(path);
//   };

//   return (
//     <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
//       <div className="flex">
//         <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
//       </div>
//       <div className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm w-full">
//       {/* <div className="flex flex-wrap gap-6 w-full p-6 rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"> */}
//         <Card className="flex flex-col items-center justify-center w-60 h-60 p-5 bg-blue-500 text-white cursor-pointer ml-10 hover:bg-blue-700" onClick={() => handleCardClick('/agenda')}>
//           <FaClipboardList className="text-6xl" />
//           <CardContent>
//             <div className="flex flex-col items-center gap-2">
//               <h3 className="text-2xl font-semibold tracking-tight">AGENDA</h3>
//               <p className="text-4xl font-bold">{agendaCount}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="flex flex-col items-center justify-center w-60 h-60 p-5 bg-red-500 text-white cursor-pointer ml-10 hover:bg-red-700" onClick={() => handleCardClick('/lokasi-rapat')}>
//           <FaMapMarkerAlt className="text-6xl" />
//           <CardContent>
//             <div className="flex flex-col items-center gap-2">
//               <h3 className="text-2xl font-semibold tracking-tight">RUANGAN</h3>
//               <p className="text-4xl font-bold">{ruanganCount}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="flex flex-col items-center justify-center w-60 h-60 p-5 bg-green-500 text-white cursor-pointer ml-10 hover:bg-green-700" onClick={() => handleCardClick('/disposisi')}>
//           <FaUsers className="text-6xl" />
//           <CardContent>
//             <div className="flex flex-col items-center gap-2">
//               <h3 className="text-2xl font-semibold tracking-tight">DISPOSISI</h3>
//               <p className="text-4xl font-bold">{disposisiCount}</p>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="flex flex-col items-center justify-center w-60 h-60 p-5 bg-yellow-500 text-white ml-10 hover:bg-yellow-700">
//           <FaUserPlus className="text-6xl" />
//           <CardContent>
//             <div className="flex flex-col items-center gap-2">
//               <h3 className="text-2xl font-semibold tracking-tight">USERS</h3>
//               <p className="text-4xl font-bold">{usersCount}</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// }