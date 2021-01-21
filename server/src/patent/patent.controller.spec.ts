import { Test, TestingModule } from '@nestjs/testing';
import { PatentController } from './patent.controller';
import { PatentService } from './patent.service';

describe('PatentController', () => {
  let controller: PatentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatentController],
      providers: [PatentService],
    }).compile();

    controller = module.get<PatentController>(PatentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
