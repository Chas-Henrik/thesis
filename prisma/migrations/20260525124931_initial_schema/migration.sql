-- CreateTable
CREATE TABLE "settings" (
    "key" TEXT NOT NULL DEFAULT 'global',
    "from_date" TEXT NOT NULL,
    "to_date" TEXT NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT,
    "date" TEXT,
    "description" TEXT NOT NULL,
    "job_link" TEXT,
    "employer_name" TEXT,
    "employment_type" TEXT,
    "working_hours_type" TEXT,
    "af_job_id" TEXT NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jobs_af_job_id_key" ON "jobs"("af_job_id");
