import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FilePlus2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AgendaTable from './AgendaTable';
import PaginationControls from './PaginationControls';

export default function AgendaList({ apiUrl }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    getAgendas();
  }, [currentPage, itemsPerPage, searchTerm]);

  const getAgendas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/agendas`, {
        params: {
          search: searchTerm,
          page: currentPage,
          limit: itemsPerPage,
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

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex">
        <h1 className="text-lg font-semibold md:text-2xl">Agenda</h1>
      </div>
      <div className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm w-full">
        <div className="flex flex-col gap-1 w-full">
          <div className="flex flex-row gap-1 w-full">
            <Link to="/agenda/add-agenda">
              <Button variant="outline" className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-primary hover:text-foreground hover:bg-blue-600">
                <FilePlus2 className="h-4 w-4" /> Add
              </Button>
            </Link>
            <div className="relative w-full flex justify-end">
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
