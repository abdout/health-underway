import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ReviewContainerProps } from './type';
import { ReviewActions } from './review-action';
import React from 'react';

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4 text-sm">{children}</CardContent>
    </Card>
  );
}

function KeyValue({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground">{label}</p>
      <p>{value ?? 'Not specified'}</p>
    </div>
  );
}

export function ReviewContainer({ data, isSubmitting, handleSubmit, hideActions = false }: ReviewContainerProps & { hideActions?: boolean; }) {
  return (
    <div className="min-h-screen -mt-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Info */}
            <SectionCard title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <KeyValue label="Full Name (EN)" value={data?.fullNameEnglish} />
                <KeyValue label="Full Name (AR)" value={data?.fullNameArabic} />
                <KeyValue label="Name Prefix" value={data?.namePrefix} />
                <KeyValue label="Stage of Career" value={data?.stageOfCareer} />
                <KeyValue label="Place of Birth" value={data?.placeOfBirth} />
                <KeyValue label="Date of Birth" value={data?.dateOfBirth} />
                <KeyValue label="Original Home Town" value={data?.originalHomeTownOrVillage} />
                <KeyValue label="Personal Email" value={data?.personalEmail} />
                <KeyValue label="Agree to Email Publication" value={data?.agreeToEmailPublication ? 'Yes' : 'No'} />
              </div>
            </SectionCard>

            {/* Education */}
            <SectionCard title="Education">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <KeyValue label="University of Primary Graduation" value={data?.universityOfPrimaryGraduation} />
                <KeyValue label="Country of University" value={data?.countryOfUniversityOfPrimaryGraduation} />
                <KeyValue label="Year of Graduation" value={data?.yearOfGraduationFromMedicine} />
                <KeyValue label="Awards During Degree" value={data?.awardsDuringPrimaryMedicalDegree} />
              </div>
            </SectionCard>

            {/* Professional Info */}
            <SectionCard title="Professional Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <KeyValue label="Current Position" value={data?.currentPosition} />
                <KeyValue label="Country of Work" value={data?.countryOfWork} />
                <KeyValue label="Academic Position (Current/Past)" value={data?.academicPositionCurrentOrPast} />
                <KeyValue label="Past Career Positions" value={data?.pastCareerPositions} />
              </div>
            </SectionCard>

            {/* Research & Achievements */}
            <SectionCard title="Research & Achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                <KeyValue label="Scientific Papers Published" value={data?.scientificPapersPublished} />
                <KeyValue label="Books Edited" value={data?.booksEdited} />
                <KeyValue label="Chapters Edited" value={data?.chaptersEditedInPaediatricsBooks} />
                <KeyValue label="Major Career Achievement" value={data?.majorCareerAchievement} />
                <KeyValue label="Recognition of Services" value={data?.recognitionOfServices} />
              </div>
            </SectionCard>
          </div>

          {/* Side Column */}
          <div className="space-y-8">
            {/* Qualifications */}
            <SectionCard title="Qualifications">
              <KeyValue label="Qualifications" value={data?.qualifications?.join(', ')} />
              <KeyValue label="Other Qualification" value={data?.otherQualification} />
              <KeyValue label="Post Graduate Studies" value={data?.postGraduateStudies} />
              <KeyValue label="Other Qualifications" value={data?.otherQualifications} />
            </SectionCard>

            {/* Subspecialties */}
            <SectionCard title="Subspecialties">
              <KeyValue label="Subspecialties" value={data?.paediatricsSubspecialty?.join(', ')} />
              <KeyValue label="Other Subspecialty" value={data?.otherSubspecialty} />
              <KeyValue label="Subspecialty Certified" value={data?.subspecialtyCertified} />
              <KeyValue label="Subspecialty Degree Name" value={data?.subspecialtyDegreeName} />
            </SectionCard>

            {/* Attachments */}
            <SectionCard title="Attachments & Photos">
              <KeyValue label="Agree to Photo Publication" value={data?.agreeToPhotoPublication ? 'Yes' : 'No'} />
              <KeyValue label="Scientific Papers Files" value={Array.isArray(data?.scientificPapersFiles) ? `${data?.scientificPapersFiles.length} file(s)` : '0'} />
              <KeyValue label="Personal Photos" value={Array.isArray(data?.personalPhotos) && data?.personalPhotos.length > 0 ? `${data?.personalPhotos.length} uploaded` : 'Not uploaded'} />
              <KeyValue label="Updated CV" value={data?.updatedCV ? 'Uploaded' : 'Not uploaded'} />
            </SectionCard>
          </div>
        </div>

        {/* Submit Button */}
        {!hideActions && (
          <ReviewActions isSubmitting={isSubmitting} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
} 