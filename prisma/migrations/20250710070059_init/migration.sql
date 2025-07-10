-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DEVELOPER', 'DOCTOR', 'PAEDIATRIC_DOCTOR', 'NURSE', 'PATIENT', 'USER', 'MEMBER', 'MEMBERSHIP', 'FINANCE', 'CONTENT');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('pending', 'scheduled', 'cancelled');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "gender" "Gender" NOT NULL,
    "address" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactNumber" TEXT NOT NULL,
    "primaryPhysician" TEXT NOT NULL,
    "insuranceProvider" TEXT NOT NULL,
    "insurancePolicyNumber" TEXT NOT NULL,
    "allergies" TEXT,
    "currentMedication" TEXT,
    "familyMedicalHistory" TEXT,
    "pastMedicalHistory" TEXT,
    "identificationType" TEXT,
    "identificationNumber" TEXT,
    "identificationDocument" TEXT,
    "privacyConsent" BOOLEAN,
    "treatmentConsent" BOOLEAN,
    "disclosureConsent" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "schedule" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "primaryPhysician" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "cancellationReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contribute" TEXT,
    "bio" TEXT,
    "cv" TEXT,
    "portfolio" TEXT,
    "cover" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "twitter" TEXT,
    "facebook" TEXT,
    "linkedin" TEXT,
    "telegram" TEXT,
    "instagram" TEXT,
    "tiktok" TEXT,
    "link" TEXT,
    "birthDate" TIMESTAMP(3),
    "birthCountry" TEXT,
    "birthState" TEXT,
    "birthLocality" TEXT,
    "birthAdminUnit" TEXT,
    "birthNeighborhood" TEXT,
    "birthMonth" INTEGER,
    "birthYear" INTEGER,
    "currentCountry" TEXT,
    "currentState" TEXT,
    "currentLocality" TEXT,
    "currentAdminUnit" TEXT,
    "currentNeighborhood" TEXT,
    "originalCountry" TEXT,
    "originalState" TEXT,
    "originalLocality" TEXT,
    "originalAdminUnit" TEXT,
    "originalNeighborhood" TEXT,
    "nationalityId" TEXT,
    "maritalStatus" TEXT,
    "gender" TEXT,
    "religion" TEXT,
    "educationLevel" TEXT,
    "institution" TEXT,
    "yearOfCompletion" INTEGER,
    "major" TEXT,
    "studentYear" INTEGER,
    "bachelorInstitution" TEXT,
    "bachelorMajor" TEXT,
    "bachelorCompletionYear" INTEGER,
    "masterInstitution" TEXT,
    "masterMajor" TEXT,
    "masterCompletionYear" INTEGER,
    "phdInstitution" TEXT,
    "phdMajor" TEXT,
    "phdCompletionYear" INTEGER,
    "professorInstitution" TEXT,
    "professorMajor" TEXT,
    "professorCompletionYear" INTEGER,
    "currentOccupation" TEXT,
    "employmentSector" TEXT,
    "workplaceAddress" TEXT,
    "companyName" TEXT,
    "studentInstitution" TEXT,
    "studentFaculty" TEXT,
    "partyMember" BOOLEAN NOT NULL DEFAULT false,
    "partyName" TEXT,
    "partyStartDate" TIMESTAMP(3),
    "partyEndDate" TIMESTAMP(3),
    "unionMember" BOOLEAN NOT NULL DEFAULT false,
    "unionName" TEXT,
    "unionStartDate" TIMESTAMP(3),
    "unionEndDate" TIMESTAMP(3),
    "ngoMember" BOOLEAN NOT NULL DEFAULT false,
    "ngoName" TEXT,
    "ngoActivity" TEXT,
    "clubMember" BOOLEAN NOT NULL DEFAULT false,
    "clubName" TEXT,
    "clubType" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "emergencyName1" TEXT,
    "emergencyRelation1" TEXT,
    "emergencyPhone1" TEXT,
    "emergencyName2" TEXT,
    "emergencyRelation2" TEXT,
    "emergencyPhone2" TEXT,
    "referralSource" TEXT,
    "acquaintanceName" TEXT,
    "donationAmount" DOUBLE PRECISION,
    "donationDate" TIMESTAMP(3),
    "oathAcknowledged" BOOLEAN DEFAULT false,
    "onboardingStatus" TEXT DEFAULT 'PENDING',
    "onboardingStep" INTEGER DEFAULT 1,
    "applicationStatus" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewNotes" TEXT,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaediatricDoctor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullNameEnglish" TEXT NOT NULL,
    "fullNameArabic" TEXT NOT NULL,
    "namePrefix" TEXT NOT NULL,
    "stageOfCareer" TEXT NOT NULL,
    "placeOfBirth" TEXT,
    "dateOfBirth" TEXT,
    "originalHomeTownOrVillage" TEXT,
    "personalEmail" TEXT NOT NULL,
    "agreeToEmailPublication" BOOLEAN NOT NULL,
    "universityOfPrimaryGraduation" TEXT NOT NULL,
    "countryOfUniversityOfPrimaryGraduation" TEXT NOT NULL,
    "yearOfGraduationFromMedicine" TEXT NOT NULL,
    "awardsDuringPrimaryMedicalDegree" TEXT,
    "universityOfPostGraduation" TEXT,
    "countryOfUniversityOfPostGraduation" TEXT,
    "yearOfPostGraduation" TEXT,
    "awardsPostGraduate" TEXT,
    "otherQualifications" TEXT,
    "qualifications" TEXT[],
    "otherQualification" TEXT,
    "paediatricsSubspecialty" TEXT[],
    "otherSubspecialty" TEXT,
    "subspecialtyCertified" TEXT NOT NULL,
    "subspecialtyDegreeName" TEXT,
    "currentPosition" TEXT NOT NULL,
    "currentInstitution" TEXT NOT NULL,
    "countryOfWork" TEXT NOT NULL,
    "yearsInPosition" TEXT,
    "academicPositionCurrentOrPast" TEXT,
    "pastCareerPositions" TEXT,
    "scientificPapersPublished" TEXT,
    "booksEdited" TEXT,
    "chaptersEditedInPaediatricsBooks" TEXT,
    "majorCareerAchievement" TEXT,
    "recognitionOfServices" TEXT,
    "secondNationality" TEXT,
    "agreeToPhotoPublication" BOOLEAN NOT NULL DEFAULT false,
    "hobbiesOrInterests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "nameOfSpouse" TEXT,
    "workOfSpouse" TEXT,
    "childrenNamesAndStatus" TEXT,
    "specialOccasionOrRole" TEXT,
    "extendedRequestFamilyPhoto" TEXT,
    "scientificPapersFiles" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "personalPhotos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "updatedCV" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "onboardingStatus" TEXT DEFAULT 'PENDING',
    "onboardingStep" INTEGER DEFAULT 1,
    "applicationStatus" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewNotes" TEXT,

    CONSTRAINT "PaediatricDoctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT,
    "doctorId" TEXT,
    "type" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT,
    "thumbnailUrl" TEXT,
    "size" INTEGER,
    "width" INTEGER,
    "height" INTEGER,
    "format" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "Patient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "Doctor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PaediatricDoctor_userId_key" ON "PaediatricDoctor"("userId");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_doctorId_idx" ON "Notification"("doctorId");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "Notification"("isRead");

-- CreateIndex
CREATE UNIQUE INDEX "Image_fileId_key" ON "Image"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_slug_idx" ON "Article"("slug");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaediatricDoctor" ADD CONSTRAINT "PaediatricDoctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
