import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto, userId: string) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const itemDetailsMap = new Map<
          string,
          { price: number; name: string; quantity: number }
        >();
        let totalAmount = 0;

        for (let item of createSaleDto.items) {
          const product = await tx.product.findUnique({
            where: { id: item.productId },
            select: { id: true, name: true, stock_quantity: true, price: true },
          });

          if (!product || product.stock_quantity < item.quantity) {
            throw new BadRequestException(
              `Insufficient stock for ${product?.name || 'product'}`,
            );
          }

          const itemPrice = Number(product.price);
          totalAmount += itemPrice * item.quantity;

          itemDetailsMap.set(product.id, {
            price: itemPrice,
            name: product.name,
            quantity: item.quantity,
          });

          await tx.product.update({
            where: { id: item.productId },
            data: { stock_quantity: { decrement: item.quantity } },
          });
        }

        const saleItemsCreateInput = Array.from(itemDetailsMap.entries()).map(
          ([productId, details]) => ({
            productId: productId,
            quantity: details.quantity,
            price: details.price,
          }),
        );

        return tx.sale.create({
          data: {
            userId,
            totalAmount: totalAmount,
            items: {
              create: saleItemsCreateInput,
            },
          },
          include: { items: true },
        });
      });
      return {
        success: true,
        message: "Sale created successfully!",
        data: result
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async findAll() {
    try {
      const result = await this.prisma.sale.findMany({
        include: {
          items: true
        }
      });

      if (!result) {
        throw new BadRequestException();
      }

      return {
        success: true,
        message: "Sales fetched successfully!",
        data: result
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prisma.sale.findUnique({
        where: {
          id
        },
        include: {
          items: true
        }
      });

      if (!result) {
        throw new BadRequestException();
      }

      return {
        success: true,
        message: "Sale fetched successfully!",
        data: result
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
