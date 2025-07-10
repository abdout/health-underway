'use client';

import { useEffect, useState } from 'react';
import SiteHeading from '@/components/atom/site-heading';

import Loading from '@/components/atom/loading';
import { getAllPapers } from '@/components/paper/action';
import type { PaperResponse } from '@/components/paper/action';
import { toast } from 'sonner';
import { SearchInput } from '@/components/ui/search-input';
import PaperList from '@/components/paper/content';

export default function PapersPage() {
  const [papers, setPapers] = useState<PaperResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setIsLoading(true);
        const papers = await getAllPapers();
        setPapers(papers);
      } catch (error) {
        console.error('Error fetching papers:', error);
        toast.error('Failed to load papers');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPapers();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Filter logic: match doctor name or paper file name
  const filteredPapers = papers
    .map((paper) => ({
      ...paper,
      scientificPapersFiles: paper.scientificPapersFiles.filter((file) => {
        const fileName = file.split('/').pop()?.toLowerCase() || '';
        return (
          fileName.includes(search.toLowerCase()) ||
          (paper.doctorName && paper.doctorName.toLowerCase().includes(search.toLowerCase()))
        );
      }),
    }))
    .filter((paper) => paper.scientificPapersFiles.length > 0 || (paper.doctorName && paper.doctorName.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="container mx-auto px-4 py-8">
      <SiteHeading
        title="Papers"
        description="Research papers from our paediatric doctors"
      />
      <div className="mb-8 flex justify-center">
        <SearchInput
          placeholder="Search papers or doctors..."
          className="w-full max-w-md"
          // Controlled input logic
          // The SearchInput component does not support value/onChange by default, so we need to wrap it
          // We'll use a hidden input overlayed for now
        />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="absolute opacity-0 pointer-events-none w-0 h-0"
          tabIndex={-1}
        />
      </div>
      {filteredPapers.map((paper, index) => (
        <div key={index} className="mb-8">
          {paper.doctorName && (
            <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
              Papers by {paper.doctorName}
            </h3>
          )}
          <PaperList papers={paper.scientificPapersFiles} />
        </div>
      ))}
      {filteredPapers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No scientific papers available.</p>
        </div>
      )}
    </div>
  );
}
