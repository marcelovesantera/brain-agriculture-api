import { Module } from '@nestjs/common';
import { ProdutoresService } from './services/produtores.service';
import { ProdutoresController } from './controllers/produtores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtor } from './entities/produtor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produtor])],
  providers: [ProdutoresService],
  controllers: [ProdutoresController],
  exports: [ProdutoresService],
})
export class ProdutoresModule {}
