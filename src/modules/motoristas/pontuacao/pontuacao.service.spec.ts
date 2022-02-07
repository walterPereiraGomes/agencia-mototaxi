import { Test, TestingModule } from '@nestjs/testing';
import { PontuacaoService } from './pontuacao.service';

describe('PontuacaoService', () => {
  let service: PontuacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PontuacaoService],
    }).compile();

    service = module.get<PontuacaoService>(PontuacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
