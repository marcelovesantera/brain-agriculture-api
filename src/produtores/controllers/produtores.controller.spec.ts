import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoresController } from './produtores.controller';
import { ProdutoresService } from '../services/produtores.service';

describe('ProdutoresController', () => {
  let controller: ProdutoresController;
  let service: ProdutoresService;

  const mockProdutoresService = {
    getTotals: jest.fn().mockResolvedValue({
      totalFazendas: 10,
      totalHectares: 500,
      totalPorEstado: [
        { estado: 'SP', total: 5 },
        { estado: 'PR', total: 3 },
      ],
      totalPorCultura: [
        { cultura: 'Soja', total: 6 },
        { cultura: 'Milho', total: 4 },
      ],
      totalAgricultavelPorVegetacao: { agricultavel: 300, vegetacao: 200 },
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoresController],
      providers: [
        {
          provide: ProdutoresService,
          useValue: mockProdutoresService,
        },
      ],
    }).compile();

    controller = module.get<ProdutoresController>(ProdutoresController);
    service = module.get<ProdutoresService>(ProdutoresService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return totals from getTotals()', async () => {
    const result = await controller.getTotals();
    expect(service.getTotals).toHaveBeenCalled();
    expect(result).toEqual({
      totalFazendas: 10,
      totalHectares: 500,
      totalPorEstado: [
        { estado: 'SP', total: 5 },
        { estado: 'PR', total: 3 },
      ],
      totalPorCultura: [
        { cultura: 'Soja', total: 6 },
        { cultura: 'Milho', total: 4 },
      ],
      totalAgricultavelPorVegetacao: { agricultavel: 300, vegetacao: 200 },
    });
  });
});
