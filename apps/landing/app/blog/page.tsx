'use client';

import Image from 'next/image';
import Link from 'next/link';

import { PrivacyHeader } from '../../components/PrivacyHeader';

const articles = [
  {
    slug: '10-side-hustles-for-2026',
    title:
      '10 Side Hustles Filipinos Can Start With Little to No Capital in 2026',
    date: 'March 6, 2026',
    readTime: '8 min read',
    excerpt:
      'Discover practical side hustles you can start today with minimal investment — from home cleaning to freelancing — and how platforms like Hanapp help you find customers in your area.',
    image: '/blog-1.jpg',
    tags: ['Side Hustles', 'Extra Income', 'Philippines'],
  },
  {
    slug: 'home-cleaning-business-guide',
    title: 'How to Start a Home Cleaning Business That Earns Repeat Customers',
    date: 'February 20, 2026',
    readTime: '6 min read',
    excerpt:
      'A practical guide to launch a small cleaning service with tips on pricing, marketing, and delivering consistent quality to keep customers returning.',
    image: '/blog-2.jpg',
    tags: ['Cleaning', 'Small Biz', 'Tips'],
  },
  {
    slug: 'grow-with-little-capital',
    title: 'Grow a Local Service Business With Little Capital',
    date: 'January 15, 2026',
    readTime: '7 min read',
    excerpt:
      'Lean strategies to expand your local service offering without heavy upfront investment — focusing on reputation, referrals, and platform tools.',
    image: '/blog-3.jpg',
    tags: ['Growth', 'Local', 'Business'],
  },
];

const Blog = () => {
  return (
    <>
      <PrivacyHeader />

      <div className="min-h-screen bg-white pt-20">
        <div className="bg-gray-100 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0f2b42]">
              Hanapp Blog
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Tips, guides, and ideas to help Filipinos earn more, build skills,
              and connect with their community.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map(article => (
              <article
                key={article.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-44 bg-gray-200 w-full relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-sm text-blue-600 font-medium"
                    >
                      Read Article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
