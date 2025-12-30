'use client';

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { CategorySection } from './components/CategorySection';
import { Category } from './models/category.model';
import { Creator } from './models/creator.model';

// Sample data
const sampleData: Category[] = [
  {
    id: 'youtube',
    title: 'YouTube Creators',
    icon: '📺',
    creators: [
      {
        id: '1',
        name: 'John Doe Gaming',
        impact: 'high',
        description: 'Popular gaming channel with 5M subscribers. Known for Let\'s Play videos and game reviews. Active in the gaming community with daily uploads.',
        platform: 'YouTube',
        initials: 'JD'
      },
      {
        id: '2',
        name: 'Tech Solutions',
        impact: 'medium',
        description: 'Technology review channel with 2M subscribers. Focuses on gadget reviews, tutorials, and tech news. Weekly content schedule.',
        platform: 'YouTube',
        initials: 'TS'
      },
      {
        id: '3',
        name: 'Cooking with Mary',
        impact: 'low',
        description: 'Home cooking channel with 500K subscribers. Shares easy recipes and kitchen tips. Family-friendly content posted weekly.',
        platform: 'YouTube',
        initials: 'MC'
      }
    ]
  },
  {
    id: 'twitch',
    title: 'Twitch Streamers',
    icon: '🎮',
    creators: [
      {
        id: '4',
        name: 'ProGamer',
        impact: 'very-high',
        description: 'Top-tier competitive gamer with 3M followers. Streams daily tournaments and gameplay. Major influence in the esports community.',
        platform: 'Twitch',
        initials: 'PG'
      },
      {
        id: '5',
        name: 'Casual Chill',
        impact: 'high',
        description: 'Variety streamer with 1.5M followers. Known for laid-back streams and community interaction. Streams 5 days a week.',
        platform: 'Twitch',
        initials: 'CC'
      }
    ]
  },
  {
    id: 'tiktok',
    title: 'TikTok Creators',
    icon: '📱',
    creators: [
      {
        id: '6',
        name: 'Dance Collective',
        impact: 'medium',
        description: 'Dance and choreography account with 10M followers. Creates viral dance trends and tutorials. Posts daily content.',
        platform: 'TikTok',
        initials: 'DC'
      },
      {
        id: '7',
        name: 'Life Hacks Central',
        impact: 'low',
        description: 'Practical tips and life hack videos with 3M followers. Focuses on DIY and productivity content. Regular posting schedule.',
        platform: 'TikTok',
        initials: 'LC'
      }
    ]
  },
  {
    id: 'podcast',
    title: 'Podcasters',
    icon: '🎙️',
    creators: [
      {
        id: '8',
        name: 'True Talk',
        impact: 'high',
        description: 'Interview podcast with industry leaders. 2M monthly listeners. Features deep conversations on business and life. Weekly episodes.',
        platform: 'Podcast',
        initials: 'TT'
      },
      {
        id: '9',
        name: 'Comedy Pod',
        impact: 'medium',
        description: 'Comedy and entertainment podcast with 800K monthly listeners. Light-hearted discussions and humor. Bi-weekly releases.',
        platform: 'Podcast',
        initials: 'CP'
      }
    ]
  }
];

export default function ContentCreatorDirectory() {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories = useMemo(() => {
    return sampleData.map(category => {
      const filteredCreators = category.creators.filter(creator => {
        const matchesSearch = 
          creator.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          creator.description.toLowerCase().includes(searchValue.toLowerCase());
        
        const matchesFilter = activeFilter === 'all' || creator.impact === activeFilter;
        
        return matchesSearch && matchesFilter;
      });

      return {
        ...category,
        creators: filteredCreators
      };
    }).filter(category => category.creators.length > 0);
  }, [searchValue, activeFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-700 p-5">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <Header />
        <Controls
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <div className="p-8">
          {filteredCategories.length > 0 ? (
            filteredCategories.map(category => (
              <CategorySection key={category.id} category={category} />
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl">No creators found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}