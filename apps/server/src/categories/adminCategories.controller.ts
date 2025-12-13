import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@repo/db';
import { Roles } from 'src/common/decorators/roles.decorator';

import { JwtAuthGuard } from 'src/common/guards/jwtAuth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dtos';

@Controller('/admin/categories')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories() {
    return this.categoriesService.getAdminCategories();
  }

  @Post()
  async create(@Body() data: CreateCategoryDTO) {
    return this.categoriesService.create(data);
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return this.categoriesService.delete(slug);
  }

  @Put(':slug')
  async update(@Param('slug') slug: string, @Body() body: UpdateCategoryDTO) {
    return this.categoriesService.update(slug, body);
  }
}
