'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ThumbsUp, Award, BookOpen, FileText, Star, FileStack } from 'lucide-react';
import { Ngo } from '@/components/atom/icon';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchPaediatricDoctorForReview } from '@/components/paediatric/review/action';
import PDFViewer from './pdf-viewer';

// Helper function to format dates with English month names
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

type UserSkillsData = {
  skills?: string[];
  interests?: string[];
  cv?: string | null;
  portfolio?: string | null;
  additionalFile?: string | null;
  contribute?: string | null;
};

// Custom SVG icons as React components
const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5 text-primary">
    <path fill="currentColor" d="M12 22q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-4-3v-2h8v2zm.25-3q-1.725-1.025-2.738-2.75T4.5 9.5q0-3.125 2.188-5.312T12 2t5.313 2.188T19.5 9.5q0 2.025-1.012 3.75T15.75 16z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="h-5 w-5 text-primary">
    <defs>
      <mask id="ipSCheckOne0">
        <g fill="none" strokeLinejoin="round" strokeWidth="4">
          <path fill="#fff" stroke="#fff" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"/>
          <path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"/>
        </g>
      </mask>
    </defs>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne0)"/>
  </svg>
);

const HandHelpingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="h-5 w-5 text-primary">
    <defs>
      <mask id="ipSCheckOne1">
        <g fill="none" strokeLinejoin="round" strokeWidth="4">
          <path fill="#fff" stroke="#fff" d="M24 44a19.94 19.94 0 0 0 14.142-5.858A19.94 19.94 0 0 0 44 24a19.94 19.94 0 0 0-5.858-14.142A19.94 19.94 0 0 0 24 4A19.94 19.94 0 0 0 9.858 9.858A19.94 19.94 0 0 0 4 24a19.94 19.94 0 0 0 5.858 14.142A19.94 19.94 0 0 0 24 44Z"/>
          <path stroke="#000" strokeLinecap="round" d="m16 24l6 6l12-12"/>
        </g>
      </mask>
    </defs>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSCheckOne1)"/>
  </svg>
);

const MembershipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5 text-primary">
    <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const DollarSignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="h-5 w-5 text-primary">
    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm.88 15.76v.36c0 .48-.39.88-.88.88c-.48 0-.88-.39-.88v-.42c-.63-.15-1.93-.61-2.69-2.1c-.23-.44-.01-.99.45-1.18l.07-.03c.41-.17.87 0 1.08.39c.32.61.95 1.37 2.12 1.37c.93 0 1.98-.48 1.98-1.61c0-.96-.7-1.46-2.28-2.03c-1.1-.39-3.35-1.03-3.35-3.31c0-.1.01-2.4 2.62-2.96v-.36c0-.49.4-.88.88-.88s.88.39.88.88v.37c1.07.19 1.75.76 2.16 1.3c.34.44.16 1.08-.36 1.3c-.36.15-.78.03-1.02-.28c-.28-.38-.78-.77-1.6-.77c-.7 0-1.81.37-1.81 1.39c0 .95.86 1.31 2.64 1.9c2.4.83 3.01 2.05 3.01 3.45c0 2.63-2.5 3.13-3.02 3.22z"/>
  </svg>
);

// Content for appendix items with title info
const createAppendixContent = (
  userData: UserSkillsData | null
) => {
  return {
    resume: {
      title: "Resume",
    },
    docs: {
      title: "Portfolio",
    },
    certificates: {
      title: "Certificates",
    },
    projects: {
      title: "Projects",
    }
  };
};

export default function Achievements() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeAppendix, setActiveAppendix] = useState<string | null>(null);
  const [appendixContent, setAppendixContent] = useState({
    resume: { title: 'Resume' },
    papers: { title: 'Papers' },
    certificates: { title: 'Certificates' },
  });
  
  // Add state to track PDF loading errors
  const [pdfErrors, setPdfErrors] = useState<Record<string, boolean>>({});
  
  // Add state to track PDF loading state
  const [pdfLoading, setPdfLoading] = useState<Record<string, boolean>>({
    resume: true,
    docs: true,
    certificates: true,
    projects: true
  });

  // Helper function to get the appropriate PDF URL based on availability
  const getDocumentUrl = (originalUrl: string | null | undefined): string | null => {
    if (originalUrl) {
      return originalUrl;
    }
    return null;
  };

  // Function to handle opening a document
  const openDocument = (type: string) => {
    setActiveAppendix(type);
  };

  // Function to close the PDF viewer
  const closeViewer = () => {
    setActiveAppendix(null);
  };

  // Get current document URL based on active appendix
  const getCurrentDocumentUrl = (): string | null | undefined => {
    if (!userData || !activeAppendix) return null;
    
    switch (activeAppendix) {
      case 'resume':
        return userData.cv;
      case 'docs':
        return userData.portfolio;
      case 'certificates':
        return userData.additionalFile;
      default:
        return null;
    }
  };

  // Get current document title based on active appendix
  const getCurrentDocumentTitle = (): string => {
    if (!activeAppendix) return 'المستند';
    
    return appendixContent[activeAppendix as keyof typeof appendixContent]?.title || 'المستند';
  };

  // Get current document filename for download
  const getCurrentDocumentFilename = (): string => {
    switch (activeAppendix) {
      case 'resume':
        return 'resume.pdf';
      case 'docs':
        return 'portfolio.pdf';
      case 'certificates':
        return 'certificates.pdf';
      default:
        return 'document.pdf';
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setIsLoading(true);
        const { error, data } = await fetchPaediatricDoctorForReview();
        if (error) {
          setError(error);
        } else if (data) {
          setUserData(data);
        }
      } catch (error) {
        setError('Error loading data');
      } finally {
        setIsLoading(false);
      }
    };
    loadUserData();
  }, []);

  // Helper for rendering array fields as comma-separated or list
  const renderList = (arr: any, icon: React.ReactNode, label: string) =>
    Array.isArray(arr) && arr.length > 0 ? (
      <div className="flex items-start gap-2 text-sm">
        {icon}
        <span>
          <span className="font-semibold">{label}:</span> {arr.join(', ')}
        </span>
      </div>
    ) : null;

  return (
    <div className="space-y-6 py-4 pb-10">
      {/* Achievements */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Achievements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {userData?.majorCareerAchievement && (
            <div className="flex items-start gap-2 text-sm">
              <Award className="h-5 w-5 text-muted-foreground" />
              <span>{userData.majorCareerAchievement}</span>
            </div>
          )}
          {userData?.recognitionOfServices && (
            <div className="flex items-start gap-2 text-sm">
              <Award className="h-5 w-5 text-muted-foreground" />
              <span>{userData.recognitionOfServices}</span>
            </div>
          )}
          {userData?.awardsDuringPrimaryMedicalDegree && (
            <div className="flex items-start gap-2 text-sm">
              <Award className="h-5 w-5 text-muted-foreground" />
              <span>{userData.awardsDuringPrimaryMedicalDegree}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Research & Publications */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Research & Publications</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {userData?.scientificPapersPublished && (
            <div className="flex items-start gap-2 text-sm">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span>{userData.scientificPapersPublished}</span>
            </div>
          )}
          {userData?.booksEdited && (
            <div className="flex items-start gap-2 text-sm">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span>Books Edited: {userData.booksEdited}</span>
            </div>
          )}
          {userData?.chaptersEditedInPaediatricsBooks && (
            <div className="flex items-start gap-2 text-sm">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <span>Chapters Edited: {userData.chaptersEditedInPaediatricsBooks}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Skills & Interests */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <ThumbsUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Skills & Interests</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {renderList(userData?.skills, <ThumbsUp className="h-4 w-4 text-muted-foreground" />, 'Skills')}
          {renderList(userData?.hobbiesOrInterests, <ThumbsUp className="h-4 w-4 text-muted-foreground" />, 'Interests')}
        </CardContent>
      </Card>

      {/* Attachments */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-2">
            <FileStack className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-semibold">Attachments</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Resume */}
          {userData?.updatedCV && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <button onClick={() => setActiveAppendix('resume')} className="underline text-primary">View Resume</button>
            </div>
          )}
          {/* Papers */}
          {Array.isArray(userData?.scientificPapersFiles) && userData.scientificPapersFiles.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <button onClick={() => setActiveAppendix('papers')} className="underline text-primary">View Papers ({userData.scientificPapersFiles.length})</button>
            </div>
          )}
          {/* Certificates */}
          {userData?.additionalFile && (
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-muted-foreground" />
              <button onClick={() => setActiveAppendix('certificates')} className="underline text-primary">View Certificates</button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* PDF Viewer for attachments */}
      <PDFViewer
        isOpen={!!activeAppendix}
        onClose={() => setActiveAppendix(null)}
        url={(() => {
          if (!userData || !activeAppendix) return null;
          if (activeAppendix === 'resume') return userData.updatedCV;
          if (activeAppendix === 'papers') return Array.isArray(userData.scientificPapersFiles) ? userData.scientificPapersFiles[0] : null;
          if (activeAppendix === 'certificates') return userData.additionalFile;
          return null;
        })()}
        title={(() => {
          if (!activeAppendix) return 'Document';
          return appendixContent[activeAppendix as keyof typeof appendixContent]?.title || 'Document';
        })()}
        fileName={(() => {
          if (activeAppendix === 'resume') return 'resume.pdf';
          if (activeAppendix === 'papers') return 'papers.pdf';
          if (activeAppendix === 'certificates') return 'certificates.pdf';
          return 'document.pdf';
        })()}
      />
    </div>
  );
}
