import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSaleDto: CreateSaleDto, @Request() req) {
    const userId = req.user.sub;
    return this.saleService.create(createSaleDto, userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleService.findOne(id);
  }
}
