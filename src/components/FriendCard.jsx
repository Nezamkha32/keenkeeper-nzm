'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Tag } from 'lucide-react'

export default function FriendCard({
  id,
  name,
  picture,
  days_since_contact,
  status,
  tags,
}) {

  const statusStyles = {
    "on-track": "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    "almost-due": "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    "overdue": "bg-red-500/20 text-red-400 border border-red-500/30"
  }

  const statusLabels = {
    "on-track": "On Track",
    "almost-due": "Almost Due",
    "overdue": "Overdue"
  }

  return (
    <Link href={`/friend/${id}`}>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-emerald-500/30 hover:shadow-lg transition-all group">

        {/* Image */}
        <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">

          <Image
            src={picture}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />

        </div>

        {/* Name */}
        <h3 className="text-white font-semibold text-lg mb-2 truncate">
          {name}
        </h3>

        {/* Last Contact */}
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">

          <Calendar size={16}/>

          <span>
            {days_since_contact} days ago
          </span>

        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">

          {tags.slice(0,2).map(tag => (

            <span
              key={tag}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-slate-800 text-gray-300 border border-slate-600"
            >

              <Tag size={12}/>
              {tag}

            </span>

          ))}

          {tags.length > 2 && (

            <span className="text-xs text-gray-400">
              +{tags.length - 2}
            </span>

          )}

        </div>

        {/* Status */}
        <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[status]}`}>

          {statusLabels[status]}

        </span>

      </div>

    </Link>
  )
}