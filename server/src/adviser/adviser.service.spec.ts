import { Test, TestingModule } from '@nestjs/testing';
import { AdviserService } from './adviser.service';

describe('AdviserService', () => {
  let service: AdviserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdviserService],
    }).compile();

    service = module.get<AdviserService>(AdviserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
