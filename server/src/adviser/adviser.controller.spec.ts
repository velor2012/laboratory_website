import { Test, TestingModule } from '@nestjs/testing';
import { AdviserController } from './adviser.controller';
import { AdviserService } from './adviser.service';

describe('AdviserController', () => {
  let controller: AdviserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdviserController],
      providers: [AdviserService],
    }).compile();

    controller = module.get<AdviserController>(AdviserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
