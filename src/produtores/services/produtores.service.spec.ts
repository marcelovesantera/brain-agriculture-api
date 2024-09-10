import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoresService } from './produtores.service';
import { Repository } from 'typeorm';
import { Produtor } from '../entities/produtor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProdutoresService', () => {
  let service: ProdutoresService;
  let repository: Repository<Produtor>;

  const mockRepository = {
    count: jest.fn().mockResolvedValue(10),
    createQueryBuilder: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      getRawOne: jest
        .fn()
        .mockResolvedValueOnce({ total: 500 })
        .mockResolvedValueOnce({ agricultavel: 300, vegetacao: 200 }),
      getRawMany: jest
        .fn()
        .mockResolvedValueOnce([
          { estado: 'SP', total: 5 },
          { estado: 'PR', total: 3 },
        ])
        .mockResolvedValueOnce([
          { cultura: 'Soja', total: 6 },
          { cultura: 'Milho', total: 4 },
        ]),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoresService,
        {
          provide: getRepositoryToken(Produtor),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProdutoresService>(ProdutoresService);
    repository = module.get<Repository<Produtor>>(getRepositoryToken(Produtor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve retornar os totais corretamente', async () => {
    const result = await service.getTotals();

    expect(repository.count).toHaveBeenCalled();
    expect(repository.createQueryBuilder).toHaveBeenCalledTimes(4);

    expect(result.totalFazendas).toEqual(10);
    expect(result.totalHectares).toEqual(500);
    expect(result.totalPorEstado).toEqual([
      { estado: 'SP', total: 5 },
      { estado: 'PR', total: 3 },
    ]);
    expect(result.totalAgricultavelPorVegetacao).toEqual({
      agricultavel: 300,
      vegetacao: 200,
    });
  });
});
