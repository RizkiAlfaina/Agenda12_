import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from 'axios';

const DisposisiTable = ({ apiUrl, searchTerm, currentPage, itemsPerPage, setTotalPages }) => {
  const [disposisiList, setDisposisiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDisposisiId, setSelectedDisposisiId] = useState(null);

  useEffect(() => {
    fetchDisposisi();
  }, [currentPage, searchTerm, itemsPerPage]);

  const fetchDisposisi = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/disposisiPagination`, {
        params: {
          search: searchTerm,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setDisposisiList(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteDisposisi = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/disposisi/${id}`);
      if (response.status === 200) {
        setDisposisiList(disposisiList.filter(item => item.id !== id));
      } else {
        console.error('Error deleting disposisi');
      }
    } catch (error) {
      console.error('Error deleting disposisi:', error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Disposisi</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disposisiList.map((disposisi, index) => (
            <TableRow key={disposisi.id}>
              <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
              <TableCell>{disposisi.jabatan}</TableCell>
              <TableCell className="flex flex-row">
                <Dialog id="trash">
                  <DialogTrigger asChild>
                    <Button
                      className="flex items-center gap-2 rounded-xl bg-red-500 text-primary hover:text-foreground hover:bg-red-600 ml-4 hover:text-white transition transform hover:scale-105 hover:shadow-lg"
                      onClick={() => setSelectedDisposisiId(disposisi.id)}
                    >
                      <Trash2 className="h-4 w-4" />Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete</DialogTitle>
                    </DialogHeader>
                    Delete this data?
                    <DialogFooter>
                      <Button 
                        type="submit"
                        className="bg-black text-white hover:text-foreground hover:bg-black hover:text-white transition transform hover:scale-105 hover:shadow-lg"
                        onClick={() => {
                          deleteDisposisi(selectedDisposisiId);
                        }}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisposisiTable;
