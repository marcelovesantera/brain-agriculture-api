import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produtor } from '../entities/produtor.entity';
import { CreateProdutorDto } from '../dto/create-produtor.dto';
import { UpdateProdutorDto } from '../dto/update-produtor.dto';

@Injectable()
export class ProdutoresService {
  constructor(
    @InjectRepository(Produtor)
    private readonly produtorRepository: Repository<Produtor>,
  ) {}

  async create(createProdutorDto: CreateProdutorDto): Promise<Produtor> {
    const produtor = this.produtorRepository.create(createProdutorDto);

    return this.produtorRepository.save(produtor);
  }

  async findAll(): Promise<Produtor[]> {
    return this.produtorRepository.find();
  }

  async findOne(id: number): Promise<Produtor> {
    const produtor = await this.produtorRepository.findOne({ where: { id } });

    if (!produtor) {
      throw new NotFoundException('Produtor não encontrado');
    }

    return produtor;
  }

  async update(
    id: number,
    updateProdutorDto: UpdateProdutorDto,
  ): Promise<Produtor> {
    const produtor = await this.produtorRepository.preload({
      id,
      ...updateProdutorDto,
    });

    if (!produtor) {
      throw new NotFoundException('Produtor não encontrado');
    }

    return this.produtorRepository.save(produtor);
  }

  async remove(id: number): Promise<void> {
    const result = await this.produtorRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Produtor não encontrado');
    }
  }

  async getTotals() {
    const totalFazendas = await this.produtorRepository.count();

    const totalHectares = await this.produtorRepository
      .createQueryBuilder('produtor')
      .select('SUM(produtor.areaTotal)', 'total')
      .getRawOne();

    const totalPorEstado = await this.produtorRepository
      .createQueryBuilder('produtor')
      .select('produtor.estado', 'estado')
      .addSelect('COUNT(produtor.id)', 'total')
      .groupBy('produtor.estado')
      .getRawMany();

    const totalPorCultura = await this.produtorRepository
      .createQueryBuilder('produtor')
      .select('UNNEST(produtor.culturas)', 'cultura')
      .addSelect('COUNT(produtor.id)', 'total')
      .groupBy('cultura')
      .getRawMany();

    const totalAgricultavelPorVegetacao = await this.produtorRepository
      .createQueryBuilder('produtor')
      .select('SUM(produtor.areaAgricultavel)', 'agricultavel')
      .addSelect('SUM(produtor.areaVegetacao)', 'vegetacao')
      .getRawOne();

    return {
      totalFazendas,
      totalHectares: totalHectares.total,
      totalPorEstado,
      totalPorCultura,
      totalAgricultavelPorVegetacao,
    };
  }

  async findOneByCpfCnpj(cpfCnpj: string): Promise<Produtor | undefined> {
    return this.produtorRepository.findOne({ where: { cpfCnpj } });
  }
}
