'use client';

import Head from '@/components/atom/site-heading';
import React from 'react';
import { ArticleHoverEffect } from '@/components/atom/card-article';
import { getAllArticles } from '@/components/article/action';
import { Article } from '@/components/article/type';
import Loading from '@/components/atom/loading';

interface ArticleItem {
  title: string;
  description: string;
  link: string;
  image: string;
  date: string;
  author: string;
  id?: string;
}

const FeaturedArticles = () => {
  const [articles, setArticles] = React.useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const allArticles = await getAllArticles();
        const recentArticles = allArticles.slice(0, 4);
        
        const formattedArticles: ArticleItem[] = recentArticles.map(article => ({
          id: article.id,
          title: article.title,
          description: article.description,
          link: `/blog/${article.slug}`,
          image: article.image,
          date: new Date(article.createdAt).toLocaleDateString(),
          author: article.author
        }));
        
        setArticles(formattedArticles);
      } catch (error) {
        console.error('Error fetching featured articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className=''>
      <Head 
        title="Articles" 
        description="Insights and updates" 
      />
      <div className="-mt-10">
        <ArticleHoverEffect items={articles} />
      </div>
      {articles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No articles available at the moment.
        </div>
      )}
    </div>
  );
};

export default FeaturedArticles;