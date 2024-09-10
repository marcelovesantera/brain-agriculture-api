import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProdutorDto } from 'src/produtores/dto/create-produtor.dto';
import { ProdutoresService } from 'src/produtores/services/produtores.service';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(private readonly produtoresService: ProdutoresService) {}

  async onModuleInit() {
    await this.seedProdutores();
  }

  async seedProdutores() {
    const produtores = [
      {
        cpfCnpj: '12345678901',
        nomeProdutor: 'José Silva',
        nomeFazenda: 'Fazenda Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        areaTotal: 500,
        areaAgricultavel: 300,
        areaVegetacao: 200,
        culturas: ['Soja', 'Milho'],
      },
      {
        cpfCnpj: '98765432101',
        nomeProdutor: 'Maria Oliveira',
        nomeFazenda: 'Fazenda Primavera',
        cidade: 'Curitiba',
        estado: 'PR',
        areaTotal: 800,
        areaAgricultavel: 600,
        areaVegetacao: 200,
        culturas: ['Café', 'Cana de Açúcar'],
      },
      {
        cpfCnpj: '82794712909',
        nomeProdutor: 'Fernanda Costa',
        nomeFazenda: 'Fazenda Kent',
        cidade: 'Curitiba',
        estado: 'PR',
        areaTotal: 450,
        areaAgricultavel: 250,
        areaVegetacao: 200,
        culturas: ['Café', 'Arroz', 'Milho'],
      },
      {
        cpfCnpj: '82827789000112',
        nomeProdutor: 'Bruno Guedes',
        nomeFazenda: 'Fazenda Grupo Guedes',
        cidade: 'Porto Alegre',
        estado: 'RS',
        areaTotal: 1200,
        areaAgricultavel: 800,
        areaVegetacao: 400,
        culturas: ['Café', 'Cana de Açúcar', 'Soja'],
      },
    ];

    for (const produtorData of produtores) {
      const produtorDto = produtorData as CreateProdutorDto;
      await this.produtoresService.create(produtorDto);
      console.log(`Created ${produtorDto.nomeFazenda}`);
    }
  }
}
