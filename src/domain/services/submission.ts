import { AppDataSource } from '../../infra/datasource'
import { AnswerDTO } from '../../types'
import { Answer } from '../entities/Answer'
import { Submission } from '../entities/Submission'

export const createSubmission = async (
  validatedAnswers: AnswerDTO[]
): Promise<Submission> => {
  const submission = new Submission()

  const answers: Answer[] = validatedAnswers.map((a) => {
    const answer = new Answer()
    answer.questionId = a.questionId
    answer.content = a.content

    return answer
  })

  submission.answers = answers

  const createdSubmission = await AppDataSource.getRepository(Submission).save(
    submission
  )

  return createdSubmission
}
