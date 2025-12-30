import React from 'react';
import { SearchBar } from './SearchBar';
import { FilterGroup } from './FilterGroup';

interface ControlsProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  searchValue,
  onSearchChange,
  activeFilter,
  onFilterChange
}) => {
  return (
    <div className="p-8 bg-gray-50 flex gap-4 flex-wrap items-center">
      <SearchBar value={searchValue} onChange={onSearchChange} />
      <FilterGroup activeFilter={activeFilter} onFilterChange={onFilterChange} />
    </div>
  );
};
