import Link from 'next/link'

const Hero = () => {
  return (
    <div className="w-full min-h-[600px] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold mb-6">
        Share Your Stories with the World
      </h1>
      <p className="text-xl mb-8 max-w-3xl">
        Create, publish, and engage with a community of passionate writers and readers
      </p>
      <div className="flex gap-4">
        <Link href="/write" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
          Start Writing
        </Link>
        <Link href="/blog" className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Hero; 