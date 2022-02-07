import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotoristaEntity } from './entity/motorista.entity';
import { MotoristasController } from './motoristas.controller';
import { MotoristasService } from './motoristas.service';
import { PontuacaoEntity } from './pontuacao/entity/pontuacao.entity';
import { PontuacaoService } from './pontuacao/pontuacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([MotoristaEntity, PontuacaoEntity])],
  controllers: [MotoristasController],
  providers: [MotoristasService, PontuacaoService],
  exports: [MotoristasService]
})
export class MotoristasModule {}
