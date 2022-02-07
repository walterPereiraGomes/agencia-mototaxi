import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PontuacaoDto } from '../dto/pontuacao.dto';
import { MotoristaEntity } from '../entity/motorista.entity';
import { MotoristasService } from '../motoristas.service';
import { PontuacaoEntity } from './entity/pontuacao.entity';

@Injectable()
export class PontuacaoService {
  constructor(
    @InjectRepository(PontuacaoEntity)
    private readonly pontuacaoRepository: Repository<PontuacaoEntity>,
    @Inject(forwardRef(() => MotoristasService)) private readonly motoristaService: MotoristasService
  ) {}

  async pontuarMotorista(pontuacao: PontuacaoDto) {

    await this.motoristaService.findOne(pontuacao.motoristaId)

    const createdData = this.pontuacaoRepository.create(pontuacao)

    return await this.pontuacaoRepository.save(createdData)
  }

  async getPontuacaoMediaMotorista(motorista_id: string) {
    const [{ pontuacao }] = await this.pontuacaoRepository.createQueryBuilder()
      .select('avg(pontuacao.nota) as pontuacao')
      .from(PontuacaoEntity, 'pontuacao')
      .where('pontuacao.motorista_id = :id', {id: motorista_id}) 
      .execute()
  
    return pontuacao
  }
}
