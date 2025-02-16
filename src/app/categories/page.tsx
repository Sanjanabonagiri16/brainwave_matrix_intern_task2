import Link from 'next/link'

const categories = [
  {
    id: 'technology',
    title: 'Technology',
    description: 'Stay up-to-date with the latest tech trends, innovations, and breakthroughs. From artificial intelligence and blockchain to cybersecurity and IoT, explore in-depth articles about cutting-edge technologies.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBgColor: 'bg-blue-900/30',
    iconColor: 'text-blue-500',
    postCount: '2.5k',
    topics: ['Artificial Intelligence', 'Cloud Computing', 'Cybersecurity', 'IoT', 'Blockchain']
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Discover the art and science of digital design. From UI/UX principles and design systems to typography and color theory, learn from expert designers and elevate your creative skills.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    iconBgColor: 'bg-purple-900/30',
    iconColor: 'text-purple-500',
    postCount: '1.8k',
    topics: ['UI/UX Design', 'Design Systems', 'Typography', 'Color Theory', 'Design Tools']
  },
  {
    id: 'development',
    title: 'Development',
    description: 'Master the craft of software development. From web and mobile development to backend architecture and DevOps, find comprehensive guides and best practices for building better software.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    iconBgColor: 'bg-green-900/30',
    iconColor: 'text-green-500',
    postCount: '3.2k',
    topics: ['Web Development', 'Mobile Development', 'Backend', 'DevOps', 'APIs']
  },
  {
    id: 'tutorial',
    title: 'Tutorials',
    description: 'Step-by-step guides and hands-on tutorials to help you learn new skills and technologies. From beginner-friendly introductions to advanced masterclasses, enhance your knowledge through practical learning.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    iconBgColor: 'bg-yellow-900/30',
    iconColor: 'text-yellow-500',
    postCount: '2.1k',
    topics: ['Beginner Guides', 'Code Examples', 'Best Practices', 'Tips & Tricks', 'Project Tutorials']
  },
  {
    id: 'career',
    title: 'Career',
    description: 'Navigate your tech career path with confidence. From job hunting and interview preparation to professional development and leadership skills, get advice from industry professionals.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    iconBgColor: 'bg-red-900/30',
    iconColor: 'text-red-500',
    postCount: '1.5k',
    topics: ['Job Search', 'Interview Prep', 'Career Growth', 'Leadership', 'Freelancing']
  },
  {
    id: 'productivity',
    title: 'Productivity',
    description: 'Optimize your workflow and maximize efficiency. From time management and organization tools to mental health and work-life balance, discover strategies to boost your productivity.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBgColor: 'bg-indigo-900/30',
    iconColor: 'text-indigo-500',
    postCount: '1.3k',
    topics: ['Time Management', 'Tools & Apps', 'Work-Life Balance', 'Mental Health', 'Remote Work']
  }
]

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Explore Categories</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover a wealth of knowledge across various tech-related categories. Each category offers in-depth articles, tutorials, and insights from industry experts.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={`/categories/${category.id}`}
              className="bg-[#1e1e1e] rounded-xl p-8 hover:bg-[#252525] transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className={`${category.iconBgColor} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <div className={category.iconColor}>
                    {category.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                    <span className="text-gray-400">{category.postCount} posts</span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic) => (
                      <span 
                        key={topic}
                        className={`px-3 py-1 rounded-full text-sm ${category.iconBgColor} ${category.iconColor}`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1e1e1e] rounded-xl p-8 text-center">
            <div className="text-4xl font-bold mb-2">12.4K+</div>
            <div className="text-gray-400">Total Articles</div>
          </div>
          <div className="bg-[#1e1e1e] rounded-xl p-8 text-center">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-gray-400">Expert Writers</div>
          </div>
          <div className="bg-[#1e1e1e] rounded-xl p-8 text-center">
            <div className="text-4xl font-bold mb-2">6</div>
            <div className="text-gray-400">Main Categories</div>
          </div>
        </div>
      </div>
    </main>
  )
} 