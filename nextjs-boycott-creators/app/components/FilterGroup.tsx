// FilterGroup.tsx
import React from 'react';
import { Button } from './Button';

interface FilterGroupProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { value: 'all', label: 'All' },
  { value: 'low', label: 'Low Impact' },
  { value: 'medium', label: 'Medium Impact' },
  { value: 'high', label: 'High Impact' },
  { value: 'very-high', label: 'Very High Impact' }
];

export const FilterGroup: React.FC<FilterGroupProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map(filter => (
        <Button
          key={filter.value}
          label={filter.label}
          active={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        />
      ))}
    </div>
  );
};