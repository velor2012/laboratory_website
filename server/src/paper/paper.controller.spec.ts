import { Test, TestingModule } from '@nestjs/testing';
import { PaperController } from './paper.controller';
import { PaperService } from './paper.service';

describe('PaperController', () => {
  let controller: PaperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaperController],
      providers: [PaperService],
    }).compile();

    controller = module.get<PaperController>(PaperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
