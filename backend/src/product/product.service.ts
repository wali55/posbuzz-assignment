import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const {name, sku, price, stock_quantity} = createProductDto;
      const result = await this.prisma.product.create({
        data: {
          name,
          sku,
          price: Number(price),
          stock_quantity: Number(stock_quantity)
        }
      })

      if (!result) {
        throw new BadRequestException();
      }

      return {
        success: true,
        message: "Product created successfully!",
        data: result
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.product.findMany();

      if (!result) {
        throw new BadRequestException();
      }

      return {
        success: true,
        message: "Products fetched successfully!",
        data: result
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.product.findUnique({
        where: {
          id
        }
      });

      if (!result) {
        throw new BadRequestException();
      }

      return {
        success: true,
        message: "Product fetched successfully!",
        data: result
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const {name, sku, price, stock_quantity} = updateProductDto;
      const result = await this.prisma.product.update({
        where: {
          id
        },
        data: {
          name,
          sku,
          price,
          stock_quantity
        }
      });

      if (!result) {
        throw new BadRequestException();
      }

      return {
        success: true,
        message: "Product updated successfully!",
        data: result
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prisma.product.delete({
        where: {
          id
        }
      });

      if (!result) {
        throw new BadRequestException("No product");
      }

      return {
        success: true,
        message: "Product deleted successfully!",
        data: result
      }
    } catch (error) {
      console.log(error);
      if (error.code === "P2003") {
        throw new BadRequestException(
          'Cannot delete this product. Sale is created with this product!',
        );
      }
      throw new BadRequestException();
    }
  }
}
