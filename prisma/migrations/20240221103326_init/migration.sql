-- CreateTable
CREATE TABLE "Prescription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "premedication" TEXT NOT NULL,
    "right_nasal_cavity" TEXT NOT NULL,
    "inferior_turbinate_and_meatus" TEXT NOT NULL,
    "uncinate_process" TEXT NOT NULL,
    "indication" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);
