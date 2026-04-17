'use client';
import { useEffect, useState } from 'react';
import { Plus, Users, Zap, Heart, Target } from 'lucide-react';
import FriendCard from '@/components/FriendCard';

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const response = await fetch('/friends.json');
        const data = await response.json();
        setFriends(data.friends);
      } catch (error) {
        console.error('Failed to load friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const stats = [
    {
      icon: Users,
      label: 'Total Friends',
      value: friends.length,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      label: 'On Track',
      value: friends.filter((f) => f.status === 'on-track').length,
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      label: 'Almost Due',
      value: friends.filter((f) => f.status === 'almost-due').length,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Heart,
      label: 'Overdue',
      value: friends.filter((f) => f.status === 'overdue').length,
      color: 'from-red-500 to-pink-500',
    },
  ];

  return (







    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Banner Section */}
      <div className="mb-16 animate-fade-in">
        <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Friends to keep close in your life
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Track your friendships, never miss an important connection, and maintain the relationships that matter most
          </p>
          <button className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-emerald-500/50">
            <Plus className="w-5 h-5" />
            Add a Friend
          </button>
        </div>
      </div>

      {/* Stats Cards */}

{!loading && (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map(({ icon: Icon, label, value, color }, index) => (
          <div
            key={label}
            className="card group"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br ${color} text-white mb-4 group-hover:scale-110 transition-transform`}>
              <Icon className="w-6 h-6" />
            </div> */}
            <p className="text-gray-400 text-3xl mb-1">{label}</p>
            <p className="font-display text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>


)}


      {/* Friends Section */}
      <div>
        <h2 className="font-display text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Users className="w-6 h-6 text-emerald-400" />
          Your Friends
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array()].map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton h-40 mb-4 rounded-lg" />
                <div className="skeleton h-6 w-3/4 mb-2 rounded" />
                <div className="skeleton h-4 w-full mb-3 rounded" />
              </div>
            ))}
          </div>
        ) : friends.length === 0 ? (
          <div className="card text-center py-12">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No friends added yet. Start by adding your first friend!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {friends.map((friend, index) => (
              <div
                key={friend.id}
                style={{
                  animation: `fadeIn 0.5s ease-out forwards`,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <FriendCard {...friend} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}




// initial project setup
// added navbar component
// added banner section
// added friends json data
// added friend card component
// created friend details page
// implemented timeline page
// added stats chart