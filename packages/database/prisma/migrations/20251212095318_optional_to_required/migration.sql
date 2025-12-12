/*
  Warnings:

  - Made the column `barcode` on table `ProductVariant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `thumbnailURL` on table `ProductVariant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "barcode" SET NOT NULL,
ALTER COLUMN "thumbnailURL" SET NOT NULL;
