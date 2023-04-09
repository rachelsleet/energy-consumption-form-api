import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Answer } from './Answer'

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createdAt: string

  @OneToMany(() => Answer, (answer: Answer) => answer.submissionId, {
    cascade: true,
  })
  answers: Answer[]
}
