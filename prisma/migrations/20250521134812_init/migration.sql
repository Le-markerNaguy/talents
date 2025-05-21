-- CreateTable
CREATE TABLE "Recommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recommenderName" TEXT NOT NULL,
    "recommenderEmail" TEXT NOT NULL,
    "recommenderPhone" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "talentName" TEXT NOT NULL,
    "talentEmail" TEXT,
    "talentPhone" TEXT NOT NULL,
    "talentLocation" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "sectorId" TEXT NOT NULL,
    "talentTitle" TEXT NOT NULL,
    "talentDescription" TEXT NOT NULL,
    "talentAchievements" TEXT,
    "acceptedTerms" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Talent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "sectorId" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "portfolio" TEXT,
    "acceptedTerms" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
