import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FilePlus2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AgendaTable from './AgendaTable';
import PaginationControls from './PaginationControls';

const daysOfWeek = [
  { value: '', label: 'Semua Hari' },
  { value: 'Minggu', label: 'Minggu' },
  { value: 'Senin', label: 'Senin' },
  { value: 'Selasa', label: 'Selasa' },
  { value: 'Rabu', label: 'Rabu' },
  { value: 'Kamis', label: 'Kamis' },
  { value: 'Jumat', label: 'Jumat' },
  { value: 'Sabtu', label: 'Sabtu' },
];

export default function AgendaList({ apiUrl }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dayFilter, setDayFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [agendas, setAgendas] = useState([]);
  const [sortColumn, setSortColumn] = useState('tanggal');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    getAgendas();
  }, [currentPage, itemsPerPage, searchTerm, sortColumn, sortDirection, dayFilter]);

  const getAgendas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/agendas`, {
        params: {
          search: searchTerm,
          page: currentPage,
          limit: itemsPerPage,
          sortColumn,
          sortDirection,
          dayFilter,
        },
      });
      setAgendas(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAgenda = async (id) => {
    try {
      await axios.delete(`${apiUrl}/agendas/${id}`);
      getAgendas(); // Refresh the list after deleting
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDayFilterChange = (e) => {
    setDayFilter(e.target.value);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex">
        <h1 className="text-lg font-semibold md:text-2xl">Agenda</h1>
      </div>
      <div className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row gap-1 w-full">
            <Link to="/agenda/add-agenda">
              <Button variant="outline" className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-primary hover:text-foreground hover:bg-blue-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg">
                <FilePlus2 className="h-4 w-4" /> Add
              </Button>
            </Link>
            <div className="relative w-full flex justify-end">

              <div className="relative ml-4 flex-1 md:grow-0">
                <select
                  className="w-full rounded-lg bg-background pl-2 md:w-[200px] lg:w-[336px]"
                  value={dayFilter}
                  onChange={handleDayFilterChange}
                >
                  {daysOfWeek.map((day) => (
                    <option key={day.value} value={day.value}>
                      {day.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <AgendaTable
            agendas={agendas}
            deleteAgenda={deleteAgenda}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handleSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
          <PaginationControls
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </main>
  );
}
