import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';

import { generateSlug } from 'src/common/utils/slug.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { UploadService } from 'src/upload/upload.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  private async generateUniqueSlug(name: string): Promise<string> {
    const slug = generateSlug(name);

    const exists = await this.prisma.category.findUnique({
      where: { slug },
    });

    if (!exists) {
      return slug;
    }

    return `${slug}-${createId().slice(0, 4)}`;
  }

  async create(data: CreateCategoryDTO) {
    const slug = await this.generateUniqueSlug(data.name);
    return this.prisma.category.create({
      data: { ...data, slug },
      include: { _count: { select: { children: true } } },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany({
      where: { parentId: null },
      select: { id: true, slug: true, name: true, thumbnail: true },
    });
  }

  async getAdminCategories() {
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        thumbnail: true,
        _count: {
          select: { children: true },
        },
      },
    });

    return categories;
  }

  async update(slug: string, data: UpdateCategoryDTO) {
    let uniqueSlug: string | null = null;

    if (data.name) {
      uniqueSlug = await this.generateUniqueSlug(data.name);
    }

    return this.prisma.category.update({
      where: { slug },
      data: { ...data, slug: uniqueSlug || slug },
    });
  }

  async delete(slug: string) {
    const deletedCategory = await this.prisma.category.delete({
      where: { slug },
    });

    if (deletedCategory.thumbnail)
      await this.uploadService.deleteFile(deletedCategory.thumbnail);

    return deletedCategory;
  }
}
