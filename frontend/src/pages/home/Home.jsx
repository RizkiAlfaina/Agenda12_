import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, differenceInMinutes, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import AuthService from "../LoginandRegist/auth.service";
import EventBus from "../LoginandRegist/EventBus";

export default function Home({ apiUrl }) {
  const [agendas, setAgendas] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const getAgendas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/agendas`);
        const fetchedAgendas = response.data.data;
        const updatedAgendas = await updateAgendaStatuses(fetchedAgendas);
        setAgendas(updatedAgendas);
      } catch (error) {
        console.error('Error fetching agendas:', error.message);
      }
    };

    const updateAgendaStatuses = async (currentAgendas = agendas) => {
      const updatedAgendas = await Promise.all(currentAgendas.map(async (agenda) => {
        const agendaDateTime = parseISO(`${agenda.tanggal}T${agenda.time}`);
        const minutesDifference = differenceInMinutes(agendaDateTime, currentTime);
        let newStatus = agenda.status;

        if (agenda.status === "Dibatalkan") {
          return agenda; // Skip updating if the status is "Dibatalkan"
        }

        newStatus = "Rapat Mendatang";
        if (minutesDifference <= 30 && minutesDifference > 15) {
          newStatus = "30 Menit Lagi";
        } else if (minutesDifference <= 15 && minutesDifference > 0) {
          newStatus = "15 Menit Lagi";
        } else if (minutesDifference === 0) {
          newStatus = "Saatnya Rapat";
        } else if (minutesDifference < 0 && minutesDifference >= -180) {
          newStatus = "Sedang Rapat";
        } else if (minutesDifference < -180) {
          newStatus = "Sudah Rapat";
        }

        if (newStatus !== agenda.status) {
          try {
            await axios.patch(`${apiUrl}/agendas/${agenda.id}`, {
              status: newStatus
            });
          } catch (error) {
            console.error(`Error updating agenda with ID ${agenda.id}:`, error.message);
          }
        }

        return {
          ...agenda,
          status: newStatus
        };
      }));

      return updatedAgendas.filter(agenda => {
        if (agenda.status === "Sudah Rapat") {
          const agendaDateTime = parseISO(`${agenda.tanggal}T${agenda.time}`);
          const minutesSinceEnd = differenceInMinutes(currentTime, agendaDateTime);
          return minutesSinceEnd <= 180; // Exclude agendas that ended more than 4 hours ago
        }
        return true;
      });
    };

    getAgendas();

    // Update current time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Update agenda statuses every minute
    const statusUpdateInterval = setInterval(() => {
      getAgendas();
    }, 60000); // Every 60 seconds

    return () => {
      clearInterval(timeInterval);
      clearInterval(statusUpdateInterval);
    };
  }, [currentTime]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, dd-MM-yyyy', { locale: id });
  };

  const groupAgendasByDate = (agendas) => {
    return agendas.reduce((groups, agenda) => {
      const date = agenda.tanggal;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(agenda);
      return groups;
    }, {});
  };

  const groupedAgendas = groupAgendasByDate(agendas);

  const getNotification = (agendaTime) => {
    const agendaDateTime = parseISO(`${agendaTime.tanggal}T${agendaTime.time}`);
    const minutesDifference = differenceInMinutes(agendaDateTime, currentTime);
    if (minutesDifference <= 30 && minutesDifference > 15) {
      return "Rapat dimulai 30 Menit Lagi";
    } else if (minutesDifference <= 15 && minutesDifference > 0) {
      return "Rapat dimulai 15 Menit Lagi";
    } else if (minutesDifference === 0) {
      return "Saatnya Rapat";
    } else if (minutesDifference < 0 && minutesDifference >= -180) {
      return "Sedang Rapat";
    } else if (minutesDifference < -180) {
      return "Sudah Rapat";
    }
    return null;
  };

  function handleClick() {
    window.location.replace("/admin/login");
  }

  function dashboardClick() {
    window.location.replace("/control/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="z-10 bg-white/50 flex items-center h-16 content-center border-b bg-background px-4 md:px-6">
      {currentUser ? (
          <div className="flex items-center space-x-4 ml-auto">
            <div onClick={dashboardClick} className="text-black cursor-pointer">
              Dashboard
            </div>
            <Button onClick={logOut} className="px-4 py-2 bg-blue-500 text-white rounded-lg rounded-xl text-primary hover:text-foreground hover:bg-blue-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg">
              Logout
            </Button>
          </div>        
        ) : (
          <div className="navbar-nav ml-auto">
              <Button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg rounded-xl text-primary hover:text-foreground hover:bg-blue-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg">
                Login
              </Button>

          </div>
        )}                
        {/* <div className="ml-auto flex items-center">
          <Button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Login
          </Button>
        </div> */}
      </header>
      <div className="grid grid-cols-3 items-center gap-2 mb-0.1 mt-0.1">
        <div className="flex items-center col-span-1">
            <img src="/pupr.jpg" className="ml-4 w-12 md:w-16" alt="Logo" />
            <div className="ml-2 text-foreground text-xl md:text-2xl sm:text-xl font-bold transition-colors hover:text-foreground">
                BBWS BRANTAS
            </div>
        </div>
        <h1 className="col-span-3 md:col-span-2 lg:col-span-1 text-center text-xl md:text-2xl lg:text-2xl font-bold mt-4 mb-5">
            AGENDA RAPAT BIDANG KPISDA
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Carousel showArrows={true} showThumbs={false} infiniteLoop={true} autoPlay={true} interval={10000} transitionTime={1500}>
          {Object.keys(groupedAgendas).map((date, index) => {
            const agendaChunks = [];
            for (let i = 0; i < groupedAgendas[date].length; i += 5) {
              agendaChunks.push(groupedAgendas[date].slice(i, i + 5));
            }
            return agendaChunks.map((chunk, chunkIndex) => (
              <div key={`${date}-${chunkIndex}`} className="p-4">
                <h2 className="text-left font-bold text-lg md:text-2xl mb-1">
                  {formatDate(date)}
                </h2>
                <Table className="min-w-full border border-gray-300">
                  <TableHeader className="bg-blue-800 font-bold mt-1 border-b border-gray-300">
                    <TableRow>
                      <TableCell className="w-0.5/12 text-white border-r border-gray-300 text-center text-sm md:text-lg">No.</TableCell>
                      <TableCell className="w-1.5/12 text-white border-r border-gray-300 text-center text-sm md:text-lg">Waktu</TableCell>
                      <TableCell className="w-3.5/12 text-white border-r border-gray-300 text-center text-sm md:text-lg">Agenda</TableCell>
                      <TableCell className="w-2/12 text-white border-r border-gray-300 text-center text-sm md:text-lg">Unit Pengirim Surat</TableCell>
                      <TableCell className="w-1/12 text-white border-r border-gray-300 text-center text-sm md:text-lg">Lokasi</TableCell>
                      <TableCell className="w-3/12 text-white border-r border-gray-300 text-center text-sm md:text-lg">Disposisi</TableCell>
                      <TableCell className="w-1/12 text-white border-r border-gray-300 text-center text-sm md:text-lg">Status</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-300">
                    {chunk.map((agenda, idx) => {
                      const notification = getNotification(agenda);
                      let rowClass = "";
                      let textColor = "";
                      switch (agenda.status) {
                        case "30 Menit Lagi":
                        case "15 Menit Lagi":
                          rowClass = "bg-yellow-300"; // Brighter yellow for more contrast
                          textColor = "text-yellow-900 font-bold"; // Darker text color for readability
                          break;
                        case "Saatnya Rapat":
                          rowClass = "bg-green-300"; // Brighter green for more contrast
                          textColor = "text-green-900 font-bold"; // Darker text color for readability
                          break;
                        case "Sedang Rapat":
                          rowClass = "bg-blue-300"; // Brighter blue for more contrast
                          textColor = "text-blue-900 font-bold"; // Darker text color for readability
                          break;
                        case "Dibatalkan":
                          rowClass = "bg-red-300"; // Brighter red for more contrast
                          textColor = "text-red-900 font-bold"; // Darker text color for readability
                          break;
                        default:
                          rowClass = "";
                          textColor = "";
                      }
                      return (
                        <TableRow key={agenda.id} className={`border-t border-gray-300 ${rowClass}`}>
                          <TableCell className="font-medium border-r border-gray-300 text-center text-sm md:text-2xl">{idx + 1}</TableCell>
                          <TableCell className={`border-r border-gray-300 text-center text-sm md:text-2xl ${textColor}`}>
                            {agenda.time} WIB
                            {notification && (
                              <div className={`text-xs md:text-sm ${notification.includes('Rapat dimulai') ? 'text-red-600 font-bold' : 'text-yellow-600 font-bold'}`}>
                                {notification}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className={`border-r border-gray-300 text-center text-sm md:text-2xl ${textColor}`}>{agenda.agenda}</TableCell>
                          <TableCell className={`border-r border-gray-300 text-center text-sm md:text-2xl ${textColor}`}>{agenda.UPS}</TableCell>
                          <TableCell className={`border-r border-gray-300 text-center text-sm md:text-2xl ${textColor}`}>{agenda.loc}</TableCell>
                          <TableCell className={`border-r border-gray-300 text-center text-sm md:text-2xl ${textColor}`}>
                          {agenda.disposisis && agenda.disposisis.length > 0 && (
                            agenda.disposisis.map((d, i) => (
                              <span key={d.id} className="mr-1">
                                {d.jabatan}{i < agenda.disposisis.length - 1 && ', '}
                              </span>
                            ))
                          )}
                            </TableCell>
                          <TableCell className={`border-r border-gray-300 text-center text-sm md:text-2xl ${textColor}`}>{agenda.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            ));
          })}
        </Carousel>
      </div>
      <footer className="bg-blue-800 text-white p-2 shadow-lg mt-auto">
        <div className="w-full text-center font-medium text-lg sm:text-xl md:text-3xl">
          {currentTime.toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
          })} WIB
        </div>
      </footer>
    </div>
  );
}
