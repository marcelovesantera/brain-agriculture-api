import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdutoresService } from '../services/produtores.service';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { UpdateProdutorDto } from '../dto/update-produtor.dto';

@Controller('produtores')
export class ProdutoresController {
  constructor(private readonly produtoresService: ProdutoresService) {}

  @Post()
  create(@Body() createProdutorDto: CreateProdutorDto) {
    return this.produtoresService.create(createProdutorDto);
  }

  @Get()
  findAll() {
    return this.produtoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produtoresService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProdutorDto: UpdateProdutorDto,
  ) {
    return this.produtoresService.update(id, updateProdutorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtoresService.remove(id);
  }

  @Get('Dashboard')
  getTotals() {
    return this.produtoresService.getTotals();
  }
}
