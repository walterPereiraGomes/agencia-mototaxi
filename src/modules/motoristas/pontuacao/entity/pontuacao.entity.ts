import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'pontuacao' })
export class PontuacaoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'motorista_id'})
  motoristaId: string

  @Column({ name: 'nota', type: 'float'})
  nota: number

  @Column()
  observacao: string

  @CreateDateColumn({ name: 'created_at'})
  createdAt: string

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: string

  @DeleteDateColumn({ name: 'deleted_at'})
  deletedAt: string
}