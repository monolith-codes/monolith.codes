-- CreateTable
CREATE TABLE "TechStackItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "companyUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "TechStackItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechStackItem_name_key" ON "TechStackItem"("name");
