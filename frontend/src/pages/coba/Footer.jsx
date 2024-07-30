import React from 'react';

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-center items-center bg-muted py-2 border-t">
      <p className="text-center text-sm md:text-base text-gray-400 font-medium">
        Copyright &copy; 2024
        <span className="mx-2 text-lg font-bold text-gray-500 hidden md:inline-block">•</span>
        <span className="block md:inline">Institut Teknologi Sumatera</span>
        <span className="mx-2 text-lg font-bold text-gray-500 hidden md:inline-block">•</span>
        <span className="block md:inline">PKL Ardoni Y.R.G & M.RIZKI.A</span>
      </p>
    </footer>
  );
}
