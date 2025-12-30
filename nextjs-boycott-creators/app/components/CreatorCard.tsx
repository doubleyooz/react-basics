import React from 'react';
import { Creator } from '../models/creator.model';

interface CreatorCardProps {
  creator: Creator;
}

const impactStyles = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
  'very-high': 'bg-red-600 text-white'
};

const impactLabels = {
  low: 'Low Impact',
  medium: 'Medium Impact',
  high: 'High Impact',
  'very-high': 'Very High Impact'
};

export const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-500 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-15 h-15 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {creator.logo ? (
            <img src={creator.logo} alt={creator.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            creator.initials || creator.name.substring(0, 2).toUpperCase()
          )}
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold text-gray-800 mb-1">{creator.name}</div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${impactStyles[creator.impact]}`}>
            {impactLabels[creator.impact]}
          </span>
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed mb-4 flex-1">
        {creator.description}
      </p>
      <span className="inline-block px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-700 mt-2 w-fit">
        {creator.platform}
      </span>
    </div>
  );
};