import { Test, TestingModule } from '@nestjs/testing';
import { StuService } from './stu.service';

describe('StuService', () => {
  let service: StuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StuService],
    }).compile();

    service = module.get<StuService>(StuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
