import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const AddDisposisi = ({ apiUrl }) => {
    const [jabatan, setJabatan] = useState(" ");
    const navigate = useNavigate();

    const saveDisposisi = async (e) => {
        e.preventDefault();

        const formData = {
            jabatan
        };

        try {
            await axios.post(`http://localhost:5000/disposisi`, formData);
            navigate('/disposisi');
        } catch (error) {
            console.error('Error saving disposisi:', error);
        }
    }


    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex">
                <h1 className="text-lg font-semibold md:text-2xl">Tambah Disposisi</h1>
            </div>
            <div className="flex flex-1 p-4 rounded-lg border border-dashed shadow-sm w-full">
                <form className="flex flex-col gap-4 w-full max-w-full" onSubmit={saveDisposisi}>
                    <div className="field w-full">
                        <label htmlFor="disposisi" className="label text-lg font-semibold">Disposisi</label>
                        <input
                        type="text"
                        className="input border-4 rounded px-3 py-2 w-full"
                        value={jabatan}
                        onChange={(e) => setJabatan(e.target.value)}
                        id="disposisi"
                        />
                    </div>
                    <Button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 py-2 px-6 w-full md:w-auto self-center lg:self-end text-lg font-sans rounded-lg text-primary hover:text-foreground hover:bg-blue-600 hover:text-white transition transform hover:scale-105 hover:shadow-lg">
                        Add
                    </Button>
                </form>
            </div>
        </main>
    )
}

export default AddDisposisi;