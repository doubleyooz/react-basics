import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-10 text-center">
      <h1 className="text-5xl font-bold mb-3">Content Creator Directory</h1>
      <p className="text-lg opacity-90">Discover and explore content creators across different platforms</p>
    </header>
  );
};