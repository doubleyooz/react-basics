import React from 'react';
import { CreatorCard } from './CreatorCard';
import { Category } from '../models/category.model';

interface CategorySectionProps {
  category: Category;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  if (category.creators.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-5 pb-3 border-b-4 border-purple-500">
        {category.icon} {category.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {category.creators.map(creator => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
};