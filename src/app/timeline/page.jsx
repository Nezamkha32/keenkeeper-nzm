'use client';

import { useEffect, useState } from 'react';
import { Phone, MessageSquare, Video, Calendar, Filter } from 'lucide-react';

export default function TimelinePage() {
  const [entries, setEntries] = useState(() => {
    if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('timelineEntries');
    return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  // Listen for storage changes to update timeline in real-time

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('timelineEntries');
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredEntries = entries.filter((entry) =>
    filter === 'all' ? true : entry.type === filter
  );

  const sortedEntries = [...filteredEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const getIcon = (type) => {
    switch (type) {
      case 'call':
        return Phone;
      case 'text':
        return MessageSquare;
      case 'video':
        return Video;
      default:
        return Phone;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'call':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'text':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'video':
        return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          Timeline
        </h1>
        <p className="text-gray-400">
          All your interactions with friends in one place
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            filter === 'all'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:text-white'
          }`}
        >
          <Filter className="w-4 h-4" />
          All
        </button>
        <button
          onClick={() => setFilter('call')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            filter === 'call'
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
              : 'bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:text-white'
          }`}
        >
          <Phone className="w-4 h-4" />
          Calls
        </button>
        <button
          onClick={() => setFilter('text')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            filter === 'text'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Texts
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            filter === 'video'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:text-white'
          }`}
        >
          <Video className="w-4 h-4" />
          Videos
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="card skeleton h-24 rounded-lg" />
            ))}
          </div>
        ) : sortedEntries.length === 0 ? (
          <div className="card text-center py-12">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {filter === 'all'
                ? 'No interactions yet. Start logging your interactions!'
                : `No ${filter} interactions yet.`}
            </p>
          </div>
        ) : (
          sortedEntries.map((entry, index) => {
            const IconComponent = getIcon(entry.type);
            const typeColor = getTypeColor(entry.type);
            const entryDate = new Date(entry.date);
            const today = new Date();
            const isToday =
              entryDate.toDateString() === today.toDateString();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const isYesterday =
              entryDate.toDateString() === yesterday.toDateString();

            let dateLabel = entryDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });

            if (isToday) dateLabel = 'Today';
            if (isYesterday) dateLabel = 'Yesterday';

            return (
              <div
                key={index}
                className="card group hover:border-emerald-500/30"
                style={{
                  animation: `fadeIn 0.5s ease-out forwards`,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border ${typeColor}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">
                      {entry.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{dateLabel}</span>
                    </div>
                  </div>

                  {/* Type Badge */}
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${typeColor}`}
                  >
                    {entry.type}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
