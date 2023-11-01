/*
  Warnings:

  - You are about to drop the `Topping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Topping" DROP CONSTRAINT "Topping_pizzaId_fkey";

-- AlterTable
ALTER TABLE "Pizza" ADD COLUMN     "toppings" TEXT[];

-- DropTable
DROP TABLE "Topping";
