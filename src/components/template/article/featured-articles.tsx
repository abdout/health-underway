import Head from '@/components/atom/site-heading'
import React from 'react'
import { featuredArticles } from './constant'
import { ArticleHoverEffect } from '@/components/atom/card-article'

// Temporary English articles for paediatric department with Unsplash images
const paediatricArticles = [
  {
    title: 'The Importance of Early Childhood Vaccination',
    description: 'A comprehensive overview of why timely vaccination is crucial for paediatric health.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    date: '2024-06-01',
    author: 'Dr. Sarah Ahmed',
  },
  {
    title: 'Nutrition Tips for Growing Children',
    description: 'Essential nutrition advice for parents to support healthy growth and development.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    date: '2024-05-20',
    author: 'Dr. John Smith',
  },
  {
    title: 'Recognizing Early Signs of Autism',
    description: 'How to identify early indicators of autism spectrum disorder in children.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
    date: '2024-05-10',
    author: 'Dr. Lina Hassan',
  },
  {
    title: 'Managing Childhood Asthma',
    description: 'Best practices for parents and caregivers to manage asthma in children.',
    link: '#',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
    date: '2024-04-28',
    author: 'Dr. Michael Lee',
  },
]

const FeaturedArticles = () => {
  return (
    <div className=''>
      <Head title="Articles" description="Latest insights and tips for paediatric" />
      <div className="-mt-10">
        <ArticleHoverEffect items={paediatricArticles} />
      </div>
    </div>
  )
}

export default FeaturedArticles