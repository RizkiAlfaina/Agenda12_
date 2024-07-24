import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Multiselect } from 'multiselect-react-dropdown';
import { validateForm } from './formValidation';

const EditAgenda = ({ apiUrl }) => {
  const [tanggal, setTanggal] = useState("");
  const [time, setTime] = useState("");
  const [agenda, setAgenda] = useState("");
  const [UPS, setUPS] = useState("");
  const [loc, setLoc] = useState("");
  const [disposisiOptions, setDisposisiOptions] = useState([]);
  const [selectedDisposisi, setSelectedDisposisi] = useState([]);
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [estimatedMinutes, setEstimatedMinutes] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getAgendaById();
    fetchDisposisiOptions();
  }, []);

  const fetchDisposisiOptions = async () => {
    try {
      const response = await axios.get(`${apiUrl}/disposisi`);
      setDisposisiOptions(response.data);
    } catch (error) {
      console.log('Error fetching disposisi options:', error);
    }
  };

  const handleDisposisiChange = (selectedList) => {
    setSelectedDisposisi(selectedList);
  };

  const updateAgenda = async (e) => {
    e.preventDefault();

    const estimatedTime = (estimatedHours * 60) + estimatedMinutes;

    const formData = {
      tanggal,
      time,
      agenda,
      UPS,
      loc,
      estimatedTime,
      disposisiIds: selectedDisposisi.map(d => d.id),
      status,
    };

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.patch(`${apiUrl}/agendas/${id}`, formData);
      navigate("/agenda");
    } catch (error) {
      console.log('Error updating agenda:', error);
    }
  };

  const getAgendaById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/agendas/${id}`);
      if (response.data) {
        setTanggal(response.data.tanggal);
        setTime(response.data.time);
        setAgenda(response.data.agenda);
        setUPS(response.data.UPS);
        setLoc(response.data.loc);
        setEstimatedHours(Math.floor(response.data.estimatedTime / 60));
        setEstimatedMinutes(response.data.estimatedTime % 60);
        setSelectedDisposisi(response.data.disposisis.map(d => ({ id: d.id, jabatan: d.jabatan })));
        setStatus(response.data.status);
      }
    } catch (error) {
      console.log('Error fetching agenda:', error);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="fle mb-2">
        <h1 className="text-lg font-semibold md:text-2xl">Edit Agenda</h1>
      </div>
      <div className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm w-full">
        <form className="flex flex-col gap-4 w-full max-w-full" onSubmit={updateAgenda}>
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
            <label htmlFor="estimated_time" className="label text-lg font-semibold">Estimasi Waktu (jam dan menit)</label>
            <div className="flex gap-4">
              <select
                className="input border-4 rounded px-3 py-2"
                value={estimatedHours}
                onChange={(e) => setEstimatedHours(Number(e.target.value))}
                id="estimated_hours"
              >
                {[...Array(24).keys()].map(hour => (
                  <option key={hour} value={hour}>{hour} jam</option>
                ))}
              </select>
              <input
                type="number"
                className="input border-4 rounded px-3 py-2"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                id="estimated_minutes"
                min="0"
                max="59"
                placeholder="Menit"
              />
            </div>
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

          <Button type="submit" className="mt-2 bg-green-500 text-white hover:bg-green-700 rounded-xl py-2 px-6 self-end text-lg w-full md:w-auto self-center lg:self-end text-lg font-sans rounded-lg rounded-xl text-primary hover:text-foreground hover:bg-green-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg">Update</Button>
        </form>
      </div>
    </main>
  );
};

export default EditAgenda;
