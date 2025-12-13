import { Module } from '@nestjs/common';

import { UploadModule } from 'src/upload/upload.module';
import { AdminCategoriesController } from './adminCategories.controller';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [UploadModule],
  controllers: [CategoriesController, AdminCategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
