import { IsNotEmpty } from 'class-validator'

export class MotoristaDto {

  @IsNotEmpty()
  nome: string

  @IsNotEmpty()
  cpf: string

  @IsNotEmpty()
  idade: string
}