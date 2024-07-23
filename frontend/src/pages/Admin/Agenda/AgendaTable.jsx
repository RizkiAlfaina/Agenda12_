import React, { useState } from 'react';
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

const AgendaTable = ({ agendas, deleteAgenda, currentPage, itemsPerPage }) => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedAgendas = [...agendas].sort((a, b) => {
    if (sortColumn === 'hari') {
      const dateTimeA = formatDateTime(a.tanggal, a.time);
      const dateTimeB = formatDateTime(b.tanggal, b.time);
      return sortDirection === 'asc' ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
    } else if (sortColumn === 'loc' || sortColumn === 'UPS') {
      return sortDirection === 'asc'
        ? a[sortColumn].localeCompare(b[sortColumn])
        : b[sortColumn].localeCompare(a[sortColumn]);
    } else {
      return 0;
    }
  });

  const renderSortIcon = (column) => {
    if (sortColumn !== column) return null;
    if (sortDirection === 'asc') return <FaSortUp className="inline ml-1" />;
    return <FaSortDown className="inline ml-1" />;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead onClick={() => handleSort('hari')}>
            Hari {renderSortIcon('hari')}
          </TableHead>
          <TableHead>Waktu</TableHead>
          <TableHead>Agenda</TableHead>
          <TableHead onClick={() => handleSort('UPS')}>
            Unit Pengirim Surat {renderSortIcon('UPS')}
          </TableHead>
          <TableHead onClick={() => handleSort('loc')}>
            Lokasi {renderSortIcon('loc')}
          </TableHead>
          <TableHead>Disposisi</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedAgendas.map((agenda, index) => {
          const agendaNumber = startIndex + index + 1;
          return (
            <TableRow className="bg-accent" key={agenda.id}>
              <TableCell>{agendaNumber}</TableCell>
              <TableCell>
                <Badge className="text-xs" variant="secondary">
                  {formatDate(agenda.tanggal)}
                </Badge>
              </TableCell>
              <TableCell>{agenda.time}</TableCell>
              <TableCell>{agenda.agenda}</TableCell>
              <TableCell>{agenda.UPS}</TableCell>
              <TableCell>{agenda.loc}</TableCell>
              <TableCell>
                {agenda.disposisis && agenda.disposisis.length > 0 ? (
                  agenda.disposisis.map((d, i) => (
                    <span key={d.id} className="mr-1">
                      {d.jabatan}{i < agenda.disposisis.length - 1 && ', '}
                    </span>
                  ))
                ) : (
                  <span>No Disposisi</span>
                )}
              </TableCell>
              <TableCell>{agenda.status}</TableCell>
              <TableCell className="flex flex-row">
                <Link to={`/agenda/edit-agenda/${agenda.id}`} className="button is-small is-info">
                  <Dialog id="edit">
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2 rounded-xl bg-green-500 text-primary hover:text-foreground hover:bg-green-600">
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                </Link>
                <Dialog id="trash">
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2 rounded-xl bg-red-500 text-primary hover:text-foreground hover:bg-red-600 ml-4">
                      <Trash2 className="h-4 w-4" />Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete</DialogTitle>
                    </DialogHeader>
                    Delete this data?
                    <DialogFooter>
                      <Button onClick={() => deleteAgenda(agenda.id)} type="submit">Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AgendaTable;
