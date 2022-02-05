import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoristaEntity } from './entity/motorista.entity';
import { MotoristasController } from './motoristas.controller';
import { MotoristasService } from './motoristas.service';

@Module({
  imports: [TypeOrmModule.forFeature([MotoristaEntity])],
  controllers: [MotoristasController],
  providers: [MotoristasService],
  exports: [MotoristasService]
})
export class MotoristasModule {}
