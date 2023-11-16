import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, unique: true })
  userName: string

  @Column({ nullable: false })
  password: string
}
