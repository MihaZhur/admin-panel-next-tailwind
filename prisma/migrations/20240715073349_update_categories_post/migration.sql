/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "CategoryPost" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "preview" TEXT NOT NULL,

    CONSTRAINT "CategoryPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoryPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
