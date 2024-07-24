import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Multiselect } from 'multiselect-react-dropdown';
import { validateForm } from './formValidation';

const AddAgenda = ({ apiUrl }) => {
  const [tanggal, setTanggal] = useState("");
  const [time, setTime] = useState("");
  const [agenda, setAgenda] = useState("");
  const [UPS, setUPS] = useState("");
  const [loc, setLoc] = useState("");
  const [disposisiOptions, setDisposisiOptions] = useState([]);
  const [selectedDisposisi, setSelectedDisposisi] = useState([]);
  const [status, setStatus] = useState("Rapat Mendatang");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDisposisi = async () => {
      try {
        const response = await axios.get(`${apiUrl}/disposisi`);
        setDisposisiOptions(response.data);
      } catch (error) {
        console.error('Error fetching disposisi options:', error);
      }
    };

    fetchDisposisi();
  }, [apiUrl]);

  const handleDisposisiChange = (selectedList) => {
    setSelectedDisposisi(selectedList);
  };

  const saveAgenda = async (e) => {
    e.preventDefault();

    const formData = {
      tanggal,
      time,
      agenda,
      UPS,
      loc,
      disposisiIds: selectedDisposisi.map(d => d.id),
      status,
    };

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(`${apiUrl}/agendas`, formData);
      navigate("/agenda");
    } catch (error) {
      console.error('Error saving agenda:', error);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex">
        <h1 className="text-lg font-semibold md:text-2xl">Tambah Agenda</h1>
      </div>
      <div className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm w-full">
        <form className="flex flex-col gap-4 w-full max-w-full" onSubmit={saveAgenda}>
          <div className="field w-full">
            <label htmlFor="hari" className="label text-lg font-semibold">Hari</label>
            <input
              type="date"
              className="input border-4 rounded px-3 py-2 w-full"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              id="hari"
            />
            {errors.tanggal && <p className="text-red-500">{errors.tanggal}</p>}
          </div>

          <div className="field w-full">
            <label htmlFor="waktu" className="label text-lg font-semibold">Waktu</label>
            <input
              type="time"
              className="input border-4 rounded px-3 py-2 w-full"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              id="waktu"
            />
            {errors.time && <p className="text-red-500">{errors.time}</p>}
          </div>

          <div className="field w-full">
            <label htmlFor="agenda" className="label text-lg font-semibold">Agenda</label>
            <input
              type="text"
              className="input border-4 rounded px-3 py-2 w-full"
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              id="agenda"
            />
            {errors.agenda && <p className="text-red-500">{errors.agenda}</p>}
          </div>

          <div className="field w-full">
            <label htmlFor="unit_surat" className="label text-lg font-semibold">Unit Pengirim Surat</label>
            <input
              className="input border-4 rounded px-3 py-2 w-full"
              value={UPS}
              onChange={(e) => setUPS(e.target.value)}
              id="unit_surat"
            />
            {errors.UPS && <p className="text-red-500">{errors.UPS}</p>}
          </div>

          <div className="field w-full">
            <label htmlFor="lokasi" className="label text-lg font-semibold">Lokasi</label>
            <select
              className="input border-4 rounded px-3 py-2 w-full"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              id="lokasi"
            >
              <option value="">--- PILIH ---</option>
              <option value="RUANG PERTEMUAN BENDUNGAN SUTAMI">RUANG PERTEMUAN BENDUNGAN SUTAMI</option>
              <option value="RUANG PERTEMUAN BENDUNGAN TUGU">RUANG PERTEMUAN BENDUNGAN TUGU</option>
              <option value="RUANG RAPAT PPK PROGRAM">RUANG RAPAT PPK PROGRAM</option>
              <option value="RUANG PERTEMUAN GUNUNG SEMERU (PJSA BAWAH)">RUANG PERTEMUAN GUNUNG SEMERU (PJSA BAWAH)</option>
              <option value="RUANG RAPAT SEMANTOK (PJSA ATAS/BENDUNGAN)">RUANG RAPAT SEMANTOK (PJSA ATAS/BENDUNGAN)</option>
              <option value="RUANG RAPAT BENDUNGAN NIPAH">RUANG RAPAT BENDUNGAN NIPAH</option>
              <option value="RUANG RAPAT SATKER PJPA (PJSA ATAS)">RUANG RAPAT SATKER PJPA (PJSA ATAS)</option>
              <option value="RUANG RAPAT BIDANG KPI SDA">RUANG RAPAT BIDANG KPI SDA</option>
              <option value="RUANG PERTEMUAN BENDUNGAN BAGONG (BID.OP)">RUANG PERTEMUAN BENDUNGAN BAGONG (BID.OP)</option>
              {/* Add other options here */}
            </select>
            {errors.loc && <p className="text-red-500">{errors.loc}</p>}
          </div>

          <div className="field w-full">
            <label htmlFor="disposisi" className="label text-lg font-semibold">Disposisi</label>
            <Multiselect
              options={disposisiOptions}
              selectedValues={selectedDisposisi}
              onSelect={handleDisposisiChange}
              onRemove={handleDisposisiChange}
              displayValue="jabatan"
              placeholder="Select Disposisi"
              className="multiselect"
            />
            {errors.disposisi && <p className="text-red-500">{errors.disposisi}</p>}
          </div>

          <div className="field w-full">
            <label htmlFor="status" className="label text-lg font-semibold">Status</label>
            <select
              className="input border-4 rounded px-3 py-2 w-full"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="status"
            >
              <option value="Rapat Mendatang">Rapat Mendatang</option>
              <option value="30 Menit Lagi">30 Menit Lagi</option>
              <option value="15 Menit Lagi">15 Menit Lagi</option>
              <option value="Saatnya Rapat">Saatnya Rapat</option>
              <option value="Sedang Rapat">Sedang Rapat</option>
              <option value="Sudah Rapat">Sudah Rapat</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>

          <Button type="submit" className="mt-2 bg-blue-500 text-white hover:bg-blue-600 py-2 px-6 w-full md:w-auto self-center lg:self-end text-lg font-sans rounded-xl rounded-lg text-primary hover:text-foreground hover:bg-blue-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg">
            Add
          </Button>
        </form>
      </div>
    </main>
  );
};

export default AddAgenda;
