import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let productRepository: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOneBy: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(async () => {
    productRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: productRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('debe crear un nuevo producto', async () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stock: 10,
      };

      const mockProduct = { id: 1, ...createProductDto };
      productRepository.create.mockReturnValue(mockProduct);
      productRepository.save.mockResolvedValue(mockProduct);

      const result = await service.create(createProductDto);

      expect(productRepository.create).toHaveBeenCalledWith(createProductDto);
      expect(productRepository.save).toHaveBeenCalledWith(mockProduct);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('debe retornar un array de productos', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 99.99, stock: 10 },
        { id: 2, name: 'Product 2', price: 49.99, stock: 5 },
      ];

      productRepository.find.mockResolvedValue(mockProducts);

      const result = await service.findAll();

      expect(productRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
      expect(result).toHaveLength(2);
    });
  });

  describe('findOne', () => {
    it('debe retornar un producto por id', async () => {
      const mockProduct = {
        id: 1,
        name: 'Test Product',
        price: 99.99,
        stock: 10,
      };

      productRepository.findOneBy.mockResolvedValue(mockProduct);

      const result = await service.findOne(1);

      expect(productRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('debe actualizar un producto', async () => {
      const updateProductDto = { name: 'Updated Product' };

      productRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateProductDto);

      expect(productRepository.update).toHaveBeenCalledWith(
        1,
        updateProductDto,
      );
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove', () => {
    it('debe eliminar un producto', async () => {
      productRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(productRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
