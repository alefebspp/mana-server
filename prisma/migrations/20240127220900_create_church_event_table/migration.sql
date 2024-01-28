-- CreateTable
CREATE TABLE "ChurchEvent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL,
    "hour" TEXT NOT NULL,
    "church_id" TEXT NOT NULL,

    CONSTRAINT "ChurchEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChurchEvent" ADD CONSTRAINT "ChurchEvent_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
