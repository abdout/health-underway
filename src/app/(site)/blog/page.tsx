'use client';

import React from 'react';
import SiteHeading from '@/components/atom/site-heading';
import { getAllArticles, deleteArticle } from '@/components/article/action';
import ArticleHoverEffect from '@/components/atom/card-article';
import { CreateArticleButton } from '@/components/article/dialog';
import { Article } from '@/components/article/type';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/atom/modal/context';
import Modal from '@/components/atom/modal/modal';
import CreateArticle from '@/components/article/create';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import Loading from '@/components/atom/loading';
import { useSession } from 'next-auth/react';

export default function AllArticlesPage() {
  const router = useRouter();
  const { modal, openModal, closeModal } = useModal();
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [editingArticleId, setEditingArticleId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { data: session } = useSession();
  
  const fetchArticles = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const dbArticles = await getAllArticles();
      setArticles(dbArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("Failed to load articles", {
        position: "bottom-right"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  
  const handleEdit = (id: string) => {
    setEditingArticleId(id);
    openModal(null);
  };
  
  const handleDelete = async (id: string) => {
    toast(
      "Are you sure you want to delete this article?",
      {
        action: {
          label: "Delete",
          onClick: async () => {
            try {
              await deleteArticle(id);
              await fetchArticles(); // Refresh the articles list
              toast.success("Article deleted successfully", {
                position: "bottom-right"
              });
            } catch (error) {
              console.error('Error deleting article:', error);
              toast.error("Failed to delete article", {
                position: "bottom-right"
              });
            }
          },
        },
        cancel: {
          label: "Cancel",
          onClick: () => {
            // Do nothing on cancel
          },
        },
        duration: 5000,
        position: "bottom-right"
      }
    );
  };
  
  const handleShare = (item: any) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.origin + `/blog/${item.slug}`,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.origin + `/blog/${item.slug}`);
      toast.success("Link copied to clipboard", {
        position: "bottom-right",
      });
    }
  };

  // Handle newly created article
  const handleArticleCreated = async (newArticle: Article) => {
    await fetchArticles(); // Refresh the articles list
    toast.success("Article created successfully", {
      position: "bottom-right"
    });
  };

  // Handle updated article
  const handleArticleUpdated = async (updatedArticle: Article) => {
    await fetchArticles(); // Refresh the articles list
    toast.success("Article updated successfully", {
      position: "bottom-right"
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  // Transform articles to match ArticleHoverEffect expected format
  const formattedArticles = articles.map(article => ({
    id: article.id,
    title: article.title,
    description: article.description,
    link: `/blog/${article.slug}`,
    image: article.image,
    date: new Date(article.createdAt).toLocaleDateString(),
    author: article.author
  }));

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col mb-4">
        <SiteHeading 
          title="Articles" 
          description="Latest articles and updates from our medical team" 
          align="start"
        />
        {session?.user && <CreateArticleButton />}
      </div>

      {articles.length > 0 ? (
        <ArticleHoverEffect
          items={formattedArticles}
          onEdit={session?.user ? handleEdit : undefined}
          onDelete={session?.user ? handleDelete : undefined}
          onShare={handleShare}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found.</p>
          {session?.user && (
            <Button onClick={() => openModal(null)} className="mt-4">
              Create your first article
            </Button>
          )}
        </div>
      )}

      {modal.open && (
        <Modal content={
          <CreateArticle
            onClose={closeModal}
            onArticleCreated={handleArticleCreated}
            onArticleUpdated={handleArticleUpdated}
            editArticleId={editingArticleId || undefined}
          />
        } />
      )}
    </div>
  );
} 