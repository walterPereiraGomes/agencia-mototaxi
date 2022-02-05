import { Repository } from 'typeorm';
import { InternalServerErrorException, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MotoristaEntity } from './entity/motorista.entity';
import { MotoristaDto } from './dto/motorista.dto';

@Injectable()
export class MotoristasService {
  constructor(
    @InjectRepository(MotoristaEntity)
    private readonly motoristaRepository: Repository<MotoristaEntity>
  ) {}

  async findAll() {
    try {
      return await this.motoristaRepository.find()
    } catch(error: any) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: string) {
    const motorista: MotoristaEntity = await this.motoristaRepository.findOne(id)

    if(!motorista) throw new BadRequestException('Motorista não encontrado')
    
    return motorista

  }

  async create(data: MotoristaDto): Promise<MotoristaEntity> {
    try {
      const createdData = this.motoristaRepository.create(data)
      return await this.motoristaRepository.save(createdData)

    } catch(error: any) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async updateById(id: string, data) {
    const motorista = await this.findOne(id)

    this.motoristaRepository.merge(motorista, data)

    return await this.motoristaRepository.save(motorista)

  }

  async deleteById(id: string) {
    try {
      await this.motoristaRepository.findOne(id)
  
      await this.motoristaRepository.softDelete(id)

    } catch (error: any) {
      throw new InternalServerErrorException(error.message)
    }

  }

}
