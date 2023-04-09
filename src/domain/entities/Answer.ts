import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Submission } from './Submission'

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  questionId: string

  @ManyToOne(() => Submission, (submission: Submission) => submission.id)
  submissionId: number

  @Column()
  content: string
}
