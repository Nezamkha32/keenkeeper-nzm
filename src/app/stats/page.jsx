'use client';

import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart3, Phone, MessageSquare, Video } from 'lucide-react';

export default function StatsPage() {
   const [entries, setEntries] = useState(() => {
    if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('timelineEntries');
    return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  // Calculate interaction counts
  const callCount = entries.filter((e) => e.type === 'call').length;
  const textCount = entries.filter((e) => e.type === 'text').length;
  const videoCount = entries.filter((e) => e.type === 'video').length;
  const totalInteractions = entries.length;

  const chartData = [
    { name: 'Calls', value: callCount, color: '#3b82f6' },
    { name: 'Texts', value: textCount, color: '#10b981' },
    { name: 'Videos', value: videoCount, color: '#a855f7' },
  ].filter((item) => item.value > 0);

  const stats = [
    {
      icon: Phone,
      label: 'Total Calls',
      value: callCount,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: MessageSquare,
      label: 'Total Texts',
      value: textCount,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Video,
      label: 'Total Videos',
      value: videoCount,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-emerald-400" />
          Friendship Analytics
        </h1>
        <p className="text-gray-400">
          Insights into your interaction patterns with friends
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card group">
            <div
              className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br ${color} text-white mb-4 group-hover:scale-110 transition-transform`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <p className="text-gray-400 text-sm mb-1">{label}</p>
            <p className="font-display text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="card">
          <h2 className="font-semibold text-white mb-8">
            Interaction Type Distribution
          </h2>

          {loading ? (
            <div className="skeleton h-80 rounded-lg" />
          ) : totalInteractions === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  No interactions logged yet. Start logging to see analytics!
                </p>
              </div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  No interaction types recorded yet.
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => [`${value} interactions`, 'Count']}
                />
                <Legend
                  wrapperStyle={{ color: '#d1d5db' }}
                  formatter={(value) => <span style={{ color: '#d1d5db' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Stats Summary */}
        <div className="card">
          <h2 className="font-semibold text-white mb-6">Summary</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
              <span className="text-gray-400">Total Interactions</span>
              <span className="font-display text-2xl font-bold text-emerald-400">
                {totalInteractions}
              </span>
            </div>

            {chartData.length > 0 ? (
              chartData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-400">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-white">{item.value}</span>
                    <span className="text-gray-500 text-sm w-12 text-right">
                      {totalInteractions > 0
                        ? `${((item.value / totalInteractions) * 100).toFixed(0)}%`
                        : '0%'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">
                No data to display
              </p>
            )}

            {/* Insight */}
            {totalInteractions > 0 && (
              <div className="mt-8 pt-6 border-t bg-linear-to-r from-emerald-500/10 to-teal-500/10 rounded-lg p-4 border border-emerald-500/20">
                <p className="text-emerald-300 text-sm">
                  💡 <strong >Insight:</strong > You have logged {totalInteractions} interactions with your friends so far. Keep it up!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {totalInteractions > 0 ? Math.round(callCount / totalInteractions * 100) : 0}%
          </div>
          <p className="text-gray-400">Are Phone Calls</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-emerald-400 mb-2">
            {totalInteractions > 0 ? Math.round(textCount / totalInteractions * 100) : 0}%
          </div>
          <p className="text-gray-400">Are Text Messages</p>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {totalInteractions > 0 ? Math.round(videoCount / totalInteractions * 100) : 0}%
          </div>
          <p className="text-gray-400">Are Video Calls</p>
        </div>
      </div>
    </div>
  );
}
