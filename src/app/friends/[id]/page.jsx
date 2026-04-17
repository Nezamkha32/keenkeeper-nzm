'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  Archive,
  Trash2,
  Clock,
  Phone,
  MessageSquare,
  Video,
  Edit2,
  Calendar,
  Mail,
  Tag,
  Target,
  ArrowLeft,
} from 'lucide-react';

export default function FriendDetail() {
  const params = useParams();
  const router = useRouter();
  const friendId = Number(params.id);

  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allFriends, setAllFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const response = await fetch('/friends.json');
        const data = await response.json();
        setAllFriends(data.friends);

        const foundFriend = data.friends.find((f) => f.id === friendId);
        if (!foundFriend) {
          router.push('/not-found');
        } else {
          setFriend(foundFriend);
        }
      } catch (error) {
        console.error('Failed to load friend:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [friendId, router]);

  const handleInteraction = (type) => {
    if (!friend) return;

    const typeLabels = {
      call: 'Call',
      text: 'Text',
      video: 'Video',
    };

    const newInteraction = {
          id: Date.now(),
          friendId: friend.id,
          friendName: friend.name,
          type,
      date: new Date().toISOString(),
      title: `${typeLabels[type]} with ${friend.name}`,
    };

    // Update local friend object
    setFriend({
      ...friend,
      interactions: [...(friend.interactions || []), newInteraction],
    });

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('timelineEntries') || '[]');
    const updated = [newInteraction, ...existing]
    localStorage.setItem('timelineEntries', JSON.stringify(updated));

    // Show toast
    toast.success(`${typeLabels[type]} with ${friend.name} logged!`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track':
        return 'status-on-track';
      case 'almost-due':
        return 'status-almost-due';
      case 'overdue':
        return 'status-overdue';
      default:
        return 'status-on-track';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'on-track':
        return 'On Track';
      case 'almost-due':
        return 'Almost Due';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="card skeleton h-96 rounded-lg" />
          <div className="lg:col-span-2 space-y-6">
            <div className="card skeleton h-48 rounded-lg" />
            <div className="card skeleton h-48 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!friend) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-400 text-lg">Friend not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Friend Info Card */}
        <div>
          <div className="card">
            {/* Profile Picture */}
            <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
              <Image
                src={friend.picture}
                alt={friend.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Name and Status */}
            <h1 className="font-display text-2xl font-bold text-white mb-3">
              {friend.name}
            </h1>

            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${getStatusColor(friend.status)}`}>
              {getStatusLabel(friend.status)}
            </div>

            {/* Tags */}
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-gray-500 text-sm mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {friend.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-slate-700/50 text-gray-300 border border-slate-600/50"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6 pb-6 border-b border-slate-700/50">
              <p className="text-gray-400 text-sm">{friend.bio}</p>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 mb-6 text-gray-400">
              <Mail className="w-4 h-4 text-emerald-400" />
              <a href={`mailto:${friend.email}`} className="hover:text-white transition-colors">
                {friend.email}
              </a>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-gray-300 hover:text-white transition-all border border-slate-600/50">
                <Clock className="w-4 h-4" />
                Snooze 2 Weeks
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-gray-300 hover:text-white transition-all border border-slate-600/50">
                <Archive className="w-4 h-4" />
                Archive
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 transition-all border border-red-700/50">
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="card">
              <p className="text-gray-500 text-xs mb-2">Days Since Contact</p>
              <p className="font-display text-2xl font-bold text-emerald-400">
                {friend.days_since_contact}
              </p>
            </div>
            <div className="card">
              <p className="text-gray-500 text-xs mb-2">Contact Goal</p>
              <p className="font-display text-2xl font-bold text-blue-400">
                {friend.goal} days
              </p>
            </div>
            <div className="card">
              <p className="text-gray-500 text-xs mb-2">Next Due Date</p>
              <p className="font-display text-sm font-bold text-yellow-400 truncate">
                {new Date(friend.next_due_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Relationship Goal Card */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-400" />
                Relationship Goal
              </h3>
              <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 mb-4">
              Contact {friend.name} at least every {friend.goal} days to maintain connection.
            </p>
            <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
              <div
                className="bg-linear-to-r from-emerald-400 to-teal-500 h-full transition-all"
                style={{
                  width: `${Math.min((friend.goal - friend.days_since_contact) / friend.goal * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Quick Check-In Card */}
          <div className="card">
            <h3 className="font-semibold text-white mb-4">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleInteraction('call')}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-linear-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-300 hover:text-blue-200 transition-all border border-blue-500/30 hover:border-blue-500/50"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Call</span>
              </button>
              <button
                onClick={() => handleInteraction('text')}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-linear-to-r from-emerald-500/20 to-emerald-600/20 hover:from-emerald-500/30 hover:to-emerald-600/30 text-emerald-300 hover:text-emerald-200 transition-all border border-emerald-500/30 hover:border-emerald-500/50"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Text</span>
              </button>
              <button
                onClick={() => handleInteraction('video')}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-linear-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 text-purple-300 hover:text-purple-200 transition-all border border-purple-500/30 hover:border-purple-500/50"
              >
                <Video className="w-4 h-4" />
                <span className="text-sm font-medium">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}