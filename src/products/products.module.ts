import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity'; // Importar Entity

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // ¡Importante!
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
