-- CreateTable
CREATE TABLE "SystemConfiguration" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "activeProfessors" TEXT NOT NULL,
    "preRequisites" TEXT NOT NULL,
    "minCredits" INTEGER NOT NULL,
    "minPeriods" INTEGER NOT NULL,
    "reminderTemplate" TEXT NOT NULL,
    "reminderDaysBefore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemConfiguration_pkey" PRIMARY KEY ("id")
);
