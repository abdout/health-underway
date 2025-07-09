import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaperListProps {
  papers: string[];
}

const PaperList = ({ papers }: PaperListProps) => {
  // Helper to detect if a Cloudinary/raw URL is a PDF
  const isPdfUrl = (url: string) => url.toLowerCase().endsWith('.pdf') || (url.includes('cloudinary.com') && url.includes('/raw/'));

  if (papers.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">No papers available.</p>
      </div>
    );
  }

  // Calculate grid layout dimensions
  const PAPER_CONTAINER_HEIGHT = 160; // Same as attachment component
  const V_GAP_PX = 8;
  const columns = 4; // Changed to 4 columns per row
  const rows = Math.ceil(papers.length / columns);
  const paperBoxHeight = (PAPER_CONTAINER_HEIGHT - (rows - 1) * V_GAP_PX) / rows;

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      style={{ 
        gridTemplateRows: `repeat(${rows}, ${paperBoxHeight}px)`,
        minHeight: `${PAPER_CONTAINER_HEIGHT}px`
      }}
    >
      {papers.map((paper, index) => {
        const fileName = paper.split('/').pop() || `Paper ${index + 1}`;
        
        return (
          <div key={paper} className="flex flex-col items-center">
            <div className="group relative bg-white dark:bg-gray-800 shadow hover:shadow-md transition-all w-full h-44 rounded-lg">
              {/* PDF Preview */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                {isPdfUrl(paper) ? (
                  <div className="relative w-full h-full bg-white">
                    <div className="absolute" style={{ width: '122%', height: '122%', left: '-5%', top: '-1%' }}>
                      <iframe
                        src={paper}
                        width="100%"
                        height="100%"
                        className="pointer-events-none w-full h-full"
                        title={`Paper ${index + 1} Preview`}
                        frameBorder="0"
                        scrolling="no"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileText className="h-12 w-12 text-blue-500" />
                  </div>
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg">
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(paper, '_blank')}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(paper, '_blank')}
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            {/* Filename below the card */}
            <p className="text-sm truncate text-center text-black dark:text-white mt-2 w-full">
              {fileName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PaperList; 