import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FaSortUp, FaSortDown } from 'react-icons/fa';

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'EEEE, dd-MM-yyyy', { locale: id });
};

const formatDateTime = (dateString, timeString) => {
  const date = parseISO(dateString);
  const [hours, minutes, seconds] = timeString.split(':');
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  return date;
};

const AgendaTable = ({ agendas, deleteAgenda, currentPage, itemsPerPage, handleSort, sortColumn, sortDirection }) => {

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    if (sortDirection === 'asc') return <FaSortUp className="inline ml-1" />;
    return <FaSortDown className="inline ml-1" />;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const formatEstimatedTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours === 0 && remainingMinutes === 0) {
      return '-';
    }
  
    if (remainingMinutes === 0) {
      return `${hours} jam`;
    }
    
    return hours > 0 ? `${hours} jam ${remainingMinutes} menit` : `${remainingMinutes} menit`;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden sm:table-cell">No</TableHead>
            <TableHead className="hidden sm:table-cell" onClick={() => handleSort('tanggal')}>
              Hari {renderSortIcon('tanggal')}
            </TableHead>
            <TableHead className="hidden sm:table-cell">Waktu</TableHead>
            <TableHead className="hidden sm:table-cell">Estimasi Waktu</TableHead>
            <TableHead>Agenda</TableHead>
            <TableHead className="hidden sm:table-cell" onClick={() => handleSort('UPS')}>
              Unit Pengirim Surat {renderSortIcon('UPS')}
            </TableHead>
            <TableHead className="hidden sm:table-cell" onClick={() => handleSort('loc')}>
              Lokasi {renderSortIcon('loc')}
            </TableHead>
            <TableHead className="hidden sm:table-cell">Disposisi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agendas.map((agenda, index) => {
            const agendaNumber = startIndex + index + 1;
            return (
              <TableRow className="bg-accent" key={agenda.id}>
                <TableCell className="hidden sm:table-cell">{agendaNumber}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {formatDate(agenda.tanggal)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{agenda.time}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {formatEstimatedTime(agenda.estimatedTime)}
                </TableCell>
                <TableCell>
                  <div className="font-bold">{agenda.agenda}</div>
                  <div className="text-sm text-gray-500 lg:hidden">
                    <div>
                      <span className="font-semibold">Hari: </span>
                      <Badge className="text-xs" variant="secondary">
                        {formatDate(agenda.tanggal)}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-semibold">Waktu: </span>{agenda.time}
                    </div>
                    <div>
                      <span className="font-semibold">Estimasi Waktu: </span>
                      {formatEstimatedTime(agenda.estimatedTime)}
                    </div>
                    <div>
                      <span className="font-semibold">Unit Pengirim Surat: </span>{agenda.UPS}
                    </div>
                    <div>
                      <span className="font-semibold">Lokasi: </span>{agenda.loc}
                    </div>
                    <div>
                      <span className="font-semibold">Disposisi: </span>
                      {agenda.disposisis && agenda.disposisis.length > 0 ? (
                        agenda.disposisis.map((d, i) => (
                          <span key={d.id} className="mr-1">
                            {d.jabatan}{i < agenda.disposisis.length - 1 && ', '}
                          </span>
                        ))
                      ) : (
                        <span>Tidak Ada Disposisi</span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{agenda.UPS}</TableCell>
                <TableCell className="hidden sm:table-cell">{agenda.loc}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {agenda.disposisis && agenda.disposisis.length > 0 ? (
                    agenda.disposisis.map((d, i) => (
                      <span key={d.id} className="mr-1">
                        {d.jabatan}{i < agenda.disposisis.length - 1 && ', '}
                      </span>
                    ))
                  ) : (
                    <span>Tidak Ada Disposisi</span>
                  )}
                </TableCell>
                <TableCell>{agenda.status}</TableCell>
                <TableCell className="flex flex-col sm:flex-row sm:items-center">
                  <Link to={`/agenda/edit-agenda/${agenda.id}`} className="w-full sm:w-auto">
                    <Dialog id="edit">
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2 rounded-xl bg-green-500 text-primary hover:text-foreground hover:bg-green-600 w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2 hover:text-white transition transform hover:scale-105 hover:shadow-lg">
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </Link>
                  <Dialog id="trash">
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2 rounded-xl bg-red-500 text-primary hover:text-foreground hover:bg-red-600 w-full sm:w-auto hover:text-white transition transform hover:scale-105 hover:shadow-lg">
                        <Trash2 className="h-4 w-4" />Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Hapus</DialogTitle>
                      </DialogHeader>
                      Hapus data ini?
                      <DialogFooter>
                        <Button onClick={() => deleteAgenda(agenda.id)} type="submit">Hapus</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AgendaTable;
