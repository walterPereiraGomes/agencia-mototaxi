import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { MotoristaDto } from './dto/motorista.dto';
import { PontuacaoDto } from './dto/pontuacao.dto';
import { MotoristaEntity } from './entity/motorista.entity';
import { MotoristasService } from './motoristas.service';
import { PontuacaoService } from './pontuacao/pontuacao.service';

@Controller('api/motoristas')
export class MotoristasController {

  constructor(
    private readonly motoristaService: MotoristasService,
    private readonly pontuacaoService: PontuacaoService
  ) {}

  @Get()
  async index(): Promise<MotoristaEntity[]> {
    return await this.motoristaService.findAll()
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<MotoristaEntity> {
    return await this.motoristaService.findOne(id)
  }

  @Post()
  create (@Body() data: MotoristaDto): Promise<MotoristaEntity> {
    return this.motoristaService.create(data)
  }

  @Put(':id')
  async updateById(@Param('id', new ParseUUIDPipe()) id: string, @Body() data: MotoristaDto): Promise<MotoristaEntity> {
    return await this.motoristaService.updateById(id, data)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.motoristaService.deleteById(id)
  }

  @Post('/pontuar')
  async pontuarMotorista(@Body() pontuacaoDto: PontuacaoDto) {
    return await this.pontuacaoService.pontuarMotorista(pontuacaoDto)
  }
}
