'use client';

import React from 'react';
import SiteHeading from '@/components/atom/site-heading';
import { getAllArticles, deleteArticle } from '@/components/article/action';
import { articles as staticArticles } from '@/components/template/article/constant';
import ArticleHoverEffect from '@/components/atom/card-article';
import { CreateArticleButton } from '@/components/article/dialog';
import { Article, ArabicMonths } from '@/components/article/type';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/atom/modal/context';
import Modal from '@/components/atom/modal/modal';
import CreateArticle from '@/components/article/create';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { ARABIC_MONTH_NAMES } from '@/components/article/constant';
import Loading from '@/components/atom/loading';
import { useSession } from 'next-auth/react';

export default function AllArticlesPage() {
  const router = useRouter();
  const { modal, openModal, closeModal } = useModal();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [editingArticleId, setEditingArticleId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { data: session } = useSession();
  
  React.useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        // Fetch articles from database
        const dbArticles = await getAllArticles();
        
        // If there are no DB articles, fall back to static articles for demo purposes
        // In production, you would remove this fallback
        const articlesData = dbArticles.length > 0 
          ? dbArticles 
          : staticArticles.map((article, index) => ({
              id: `static-${index + 1}`,
              title: article.title,
              slug: `article-${index + 1}`,
              description: article.description,
              image: article.image,
              body: "This is the full article content that will be displayed on the article page.",
              author: article.author,
              createdAt: new Date(),
              updatedAt: new Date(),
            }));
            
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, []);

  // Transform articles to match ArticleHoverEffect expected format
  // Remove the formattedArticles mapping and related code
  // Only use paediatricArticles for ArticleHoverEffect and empty state
  
  const handleEdit = (id: string) => {
    setEditingArticleId(id);
    openModal(null);
  };
  
  const handleDelete = async (id: string) => {
    toast(
      "هل تريد حذف هذا المقال؟",
      {
        action: {
          label: "حذف",
          onClick: async () => {
            try {
              await deleteArticle(id);
              // Remove article from local state
              setArticles(articles.filter(article => article.id !== id));
              toast.success("تم حذف المقال بنجاح", {
                position: "bottom-right",
                style: { backgroundColor: 'rgb(239, 68, 68)', color: 'white' }
              });
            } catch (error) {
              console.error('Error deleting article:', error);
              toast.error("حدث خطأ أثناء حذف المقال", {
                position: "bottom-right"
              });
            }
          },
        },
        cancel: {
          label: "إلغاء",
          onClick: () => {
            // Do nothing on cancel
          },
        },
        duration: 10000, // Give the user 10 seconds to decide
        position: "bottom-right",
        style: { 
          backgroundColor: 'rgb(239, 68, 68)', 
          color: 'white',
          width: '280px', // Reduce toast width
          maxWidth: '280px'
        },
        classNames: {
          actionButton: "!bg-white !text-red-500 font-bold hover:!bg-gray-100",
          cancelButton: "bg-transparent text-white border border-white hover:bg-red-600"
        }
      }
    );
  };
  
  const handleShare = (item: any) => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.origin + item.link,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.origin + item.link);
      toast.success("تم نسخ الرابط إلى الحافظة", {
        position: "bottom-right",
      });
    }
  };
  
  const editingArticle = editingArticleId ? articles.find(article => article.id === editingArticleId) : null;

  // Handle newly created article
  const handleArticleCreated = (newArticle: Article) => {
    setArticles(prevArticles => [newArticle, ...prevArticles]);
  };

  // Handle updated article
  const handleArticleUpdated = (updatedArticle: Article) => {
    setArticles(prevArticles => 
      prevArticles.map(article => 
        article.id === updatedArticle.id ? updatedArticle : article
      )
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  // Demo articles for paediatric department with Unsplash images
  const paediatricArticles = [
    {
      id: '1',
      title: 'The Importance of Early Childhood Vaccination',
      description: 'A comprehensive overview of why timely vaccination is crucial for paediatric health.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      date: 'June 1, 2024',
      author: 'Dr. Sarah Ahmed',
    },
    {
      id: '2',
      title: 'Nutrition Tips for Growing Children',
      description: 'Essential nutrition advice for parents to support healthy growth and development.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
      date: 'May 20, 2024',
      author: 'Dr. John Smith',
    },
    {
      id: '3',
      title: 'Recognizing Early Signs of Autism',
      description: 'How to identify early indicators of autism spectrum disorder in children.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      date: 'May 10, 2024',
      author: 'Dr. Lina Hassan',
    },
    {
      id: '4',
      title: 'Managing Childhood Asthma',
      description: 'Best practices for parents and caregivers to manage asthma in children.',
      link: '#',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80',
      date: 'April 28, 2024',
      author: 'Dr. Michael Lee',
    },
  ];

  return (
    <div className="">
      <div className="pl-8">
        <SiteHeading 
          title="Articles" 
          description="" 
          align="start"
        />
      </div>
      <div className="max-w-5xl mx-auto -mt-14">
        <div className="flex justify-between items-center md:mt-6 mt-10">
          {/* {session && session.user?.role === "USER" && ( */}
            <Button variant='outline' onClick={() => {
              setEditingArticleId(null);
              openModal(null);
            }}>
              Add Article
            </Button>
          {/* )} */}
        </div>
        <ArticleHoverEffect 
          items={paediatricArticles} 
          onEdit={session && session.user?.role === "CONTENT" ? handleEdit : undefined}
          onDelete={session && session.user?.role === "CONTENT" ? handleDelete : undefined}
          onShare={handleShare}
        />
        {paediatricArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No articles found. Create your first paediatric article by clicking the button above.
            </p>
          </div>
        )}
      </div>
      {modal.open && (
        <Modal content={
          editingArticleId ? (
            <CreateArticle 
              onClose={() => {
                closeModal();
                setEditingArticleId(null);
              }} 
              editArticleId={editingArticleId}
              onArticleUpdated={handleArticleUpdated}
            />
          ) : (
            <CreateArticle 
              onClose={() => {
                closeModal();
                setEditingArticleId(null);
              }} 
              onArticleCreated={handleArticleCreated} 
            />
          )
        } />
      )}
    </div>
  );
} 