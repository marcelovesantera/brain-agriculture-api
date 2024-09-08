import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoresController } from './produtores.controller';

describe('ProdutoresController', () => {
  let controller: ProdutoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoresController],
    }).compile();

    controller = module.get<ProdutoresController>(ProdutoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
