-- CreateTable
CREATE TABLE "Church" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "leader" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cnpj" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Church_email_key" ON "Church"("email");

-- AddForeignKey
ALTER TABLE "Church" ADD CONSTRAINT "Church_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
