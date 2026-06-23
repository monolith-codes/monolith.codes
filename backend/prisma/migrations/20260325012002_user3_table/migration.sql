-- CreateTable
CREATE TABLE "User3" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User3_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User3_email_key" ON "User3"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User3_name_key" ON "User3"("name");
