import { Min, Max, IsNotEmpty } from 'class-validator'

export class PontuacaoDto {

  @IsNotEmpty()
  motoristaId: string

  @IsNotEmpty()
  @Min(0)
  @Max(5)
  nota: number

  observacao: string
}