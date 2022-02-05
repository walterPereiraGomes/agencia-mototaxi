import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'motorista' })
export class MotoristaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  nome: string

  @Column()
  cpf: string

  @Column()
  idade: string

  @Column({type: 'tinyint', width: 1 })
  ativo: number

  @CreateDateColumn({ name: 'created_at'})
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: string

  @DeleteDateColumn({ name: 'deleted_at'})
  deletedAt: string
}