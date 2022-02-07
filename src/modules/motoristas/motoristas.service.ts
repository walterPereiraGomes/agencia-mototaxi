import { FindOneOptions, Not, Repository } from 'typeorm';
import { InternalServerErrorException, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotoristaEntity } from './entity/motorista.entity';
import { MotoristaDto } from './dto/motorista.dto';
import { PontuacaoService } from './pontuacao/pontuacao.service';

@Injectable()
export class MotoristasService {
  constructor(
    @InjectRepository(MotoristaEntity)
    private readonly motoristaRepository: Repository<MotoristaEntity>,
    private readonly pontuacaoService: PontuacaoService
  ) {}

  async findAll(): Promise<MotoristaEntity[]> {
    try {
      return await this.motoristaRepository.find()
    } catch(error: any) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findByFilter(filter: FindOneOptions<MotoristaEntity>) {
    return await this.motoristaRepository.findOne(filter)
  }

  async findOne(id: string): Promise<MotoristaEntity> {
    const motorista: MotoristaEntity = await this.motoristaRepository.findOne(id)

    
    if(!motorista) throw new BadRequestException('Motorista não encontrado')

    const pontuacaoMedia = await this.pontuacaoService.getPontuacaoMediaMotorista(id)
    
    return {...motorista, pontuacao: pontuacaoMedia}

  }

  async create(data: MotoristaDto): Promise<MotoristaEntity> {

    await this.verificaMotoristaComMesmoCPF(data.cpf)

    const createdData = this.motoristaRepository.create(data)

    return await this.motoristaRepository.save(createdData)
  }

  async updateById(id: string, data: MotoristaDto): Promise<MotoristaEntity> {
    const motorista = await this.findOne(id)

    await this.verificaMotoristaComMesmoCPF(data.cpf, id)

    this.motoristaRepository.merge(motorista, data)

    return await this.motoristaRepository.save(motorista)

  }

  async deleteById(id: string): Promise<void> {
    await this.motoristaRepository.findOne(id)

    await this.motoristaRepository.softDelete(id)

  }

  async verificaMotoristaComMesmoCPF(cpf: string, idDiferente?: string) {
    const filter: FindOneOptions<MotoristaEntity> = idDiferente ? ({
      where: { cpf: cpf, id: Not(idDiferente)}
    }) : ({
      where: { cpf: cpf}
    })

    const motoristaComMesmoCpf = await this.findByFilter(filter)

    if(motoristaComMesmoCpf) throw new BadRequestException('Já existe um motorista cadastrado com este cpf')
  }

}
