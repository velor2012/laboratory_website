import { Controller, Get, Post, Body, Put, Param, Delete, Req, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { CreateResearcherDto } from './dto/create-researcher.dto';
import { UpdateResearcherDto } from './dto/update-researcher.dto';
import { ApiTags } from '@nestjs/swagger';
import Auth from 'src/lib/decorator/auth.decorator';
import { UserService } from 'src/user/user.service';
import SearchDTO from 'src/lib/common_dto/search.dto';

@ApiTags("researchers")
@Controller('researchers')
export class ResearcherController {
  constructor(private readonly researcherService: ResearcherService,
    private readonly userService: UserService
    ) {}

  @Post()
  @Auth("添加研究员信息",['1'],"jwt")
  async create(@Body() createResearcherDto: CreateResearcherDto) {
    return await this.researcherService.create(createResearcherDto);
  }

  @Get()
  @Auth("查找所有研究员信息")
  async findAll(@Query() searchDto: SearchDTO) {
    let {  pageSize, page } = searchDto 
    return await this.researcherService.findAll(+pageSize, +page);
  }

  @Get(':id')
  @Auth("查找一位研究员信息")
  async findOne(@Param('id') id: string) {
    return this.researcherService.findOne(+id);
  }

  @Put(':id')
  @Auth("修改研究员信息",['1','2','3'],"jwt")
  async update(@Param('id') id: string, @Body() updateResearcherDto: UpdateResearcherDto,@Req() req) {
    let { userId,role,username} = req.user
    const auth = await this.userService.user_auth_check(+userId,+role,+id)
    if(auth){
      return await this.researcherService.update(+id, updateResearcherDto);
    }
    throw new HttpException("权限不足",HttpStatus.FORBIDDEN)

  }
  @Delete(':id')
  @Auth("修改研究员信息",['1','2'],"jwt")
  async remove(@Param('id') id: string) {
    return await this.researcherService.remove(+id);
  }
}
