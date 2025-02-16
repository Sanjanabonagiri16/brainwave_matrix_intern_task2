'use client'

import { useState } from 'react'
import Link from 'next/link'

const StatCard = ({
  icon,
  value,
  label,
  iconBgColor,
  iconColor,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconBgColor: string;
  iconColor: string;
}) => (
  <div className="bg-[#1e1e1e] rounded-xl p-8 text-center">
    <div className={`${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
      <div className={`${iconColor}`}>
        {icon}
      </div>
    </div>
    <div className="text-4xl font-bold mb-2">{value}</div>
    <div className="text-gray-400">{label}</div>
  </div>
)

const MemberCard = ({
  initials,
  name,
  role,
  posts,
  bgColor,
  joinedDate,
  expertise,
}: {
  initials: string;
  name: string;
  role: string;
  posts: string;
  bgColor: string;
  joinedDate: string;
  expertise: string[];
}) => (
  <Link href={`/members/${name.toLowerCase().replace(' ', '-')}`} className="block">
    <div className="text-center bg-[#1e1e1e] rounded-xl p-6 hover:bg-[#252525] transition-all duration-300 group">
      <div className={`w-24 h-24 ${bgColor} rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 group-hover:scale-105 transition-transform duration-300`}>
        {initials}
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
      <p className="text-gray-400 mb-2">{role}</p>
      <p className={`text-${bgColor.split('-')[1]}-500 mb-3`}>{posts} Posts</p>
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        {expertise.map((skill) => (
          <span key={skill} className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300">
            {skill}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500">Joined {joinedDate}</p>
    </div>
  </Link>
)

const SortButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
    }`}
  >
    {label}
  </button>
)

export default function CommunityStats() {
  const [sortBy, setSortBy] = useState<'recent' | 'posts' | 'name'>('recent')
  const [filterRole, setFilterRole] = useState<string | null>(null)

  const allMembers = [
    {
      initials: "JD",
      name: "John Doe",
      role: "Tech Writer",
      posts: "250",
      bgColor: "bg-blue-500",
      joinedDate: "Jan 2024",
      expertise: ["React", "TypeScript", "Next.js"]
    },
    {
      initials: "AS",
      name: "Alice Smith",
      role: "UX Designer",
      posts: "180",
      bgColor: "bg-purple-500",
      joinedDate: "Feb 2024",
      expertise: ["UI/UX", "Figma", "Design Systems"]
    },
    {
      initials: "MJ",
      name: "Mike Johnson",
      role: "Developer",
      posts: "320",
      bgColor: "bg-green-500",
      joinedDate: "Dec 2023",
      expertise: ["Node.js", "Python", "AWS"]
    },
    {
      initials: "EW",
      name: "Emma Wilson",
      role: "Content Creator",
      posts: "290",
      bgColor: "bg-orange-500",
      joinedDate: "Mar 2024",
      expertise: ["Content Strategy", "SEO", "Marketing"]
    },
    {
      initials: "RK",
      name: "Ryan Kim",
      role: "Developer",
      posts: "215",
      bgColor: "bg-pink-500",
      joinedDate: "Jan 2024",
      expertise: ["React Native", "Mobile Dev", "UI Design"]
    },
    {
      initials: "SL",
      name: "Sarah Lee",
      role: "Tech Writer",
      posts: "175",
      bgColor: "bg-yellow-500",
      joinedDate: "Feb 2024",
      expertise: ["Documentation", "Technical Writing", "API Docs"]
    },
    {
      initials: "DM",
      name: "David Miller",
      role: "UX Designer",
      posts: "230",
      bgColor: "bg-indigo-500",
      joinedDate: "Dec 2023",
      expertise: ["Interaction Design", "Prototyping", "User Research"]
    },
    {
      initials: "OG",
      name: "Olivia Garcia",
      role: "Content Creator",
      posts: "195",
      bgColor: "bg-teal-500",
      joinedDate: "Mar 2024",
      expertise: ["Video Production", "Social Media", "Storytelling"]
    }
  ]

  const roles = Array.from(new Set(allMembers.map(member => member.role)))

  const sortedAndFilteredMembers = allMembers
    .filter(member => !filterRole || member.role === filterRole)
    .sort((a, b) => {
      switch (sortBy) {
        case 'posts':
          return parseInt(b.posts) - parseInt(a.posts)
        case 'name':
          return a.name.localeCompare(b.name)
        case 'recent':
        default:
          return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()
      }
    })

  return (
    <div className="py-20 text-white">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">Join Our Thriving Community</h2>
        <p className="text-gray-400 text-lg">Connect with fellow writers, share ideas, and grow together</p>
      </div>

      <div className="container mx-auto px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <StatCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            value="10K+"
            label="Active Members"
            iconBgColor="bg-blue-900/30"
            iconColor="text-blue-500"
          />
          <StatCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
            value="50K+"
            label="Daily Discussions"
            iconBgColor="bg-purple-900/30"
            iconColor="text-purple-500"
          />
          <StatCard
            icon={
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            value="100+"
            label="Active Groups"
            iconBgColor="bg-green-900/30"
            iconColor="text-green-500"
          />
        </div>

        {/* Featured Members Section */}
        <div className="bg-[#2a2a2a] rounded-xl p-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Featured Community Members</h2>
            <div className="flex flex-wrap gap-4">
              {/* Sort Options */}
              <div className="flex gap-2">
                <SortButton
                  label="Recent"
                  isActive={sortBy === 'recent'}
                  onClick={() => setSortBy('recent')}
                />
                <SortButton
                  label="Most Posts"
                  isActive={sortBy === 'posts'}
                  onClick={() => setSortBy('posts')}
                />
                <SortButton
                  label="Name"
                  isActive={sortBy === 'name'}
                  onClick={() => setSortBy('name')}
                />
              </div>
              {/* Role Filter Dropdown */}
              <select
                className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                value={filterRole || ''}
                onChange={(e) => setFilterRole(e.target.value || null)}
              >
                <option value="">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedAndFilteredMembers.map((member) => (
              <MemberCard
                key={member.initials}
                {...member}
              />
            ))}
          </div>
        </div>

        {/* Join Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
            Join Our Community
          </button>
        </div>
      </div>
    </div>
  )
} 