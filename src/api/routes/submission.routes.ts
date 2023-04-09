import { Router, Request, Response } from 'express'
import { AppDataSource } from '../../infra/datasource'
import { Submission } from '../../domain/entities/Submission'
import { validate } from '../../domain/helpers/validator'
import { form } from '../../domain/form'
import { isAnswerDto } from '../../types'
import { createSubmission } from '../../domain/services/submission'

const INVALID_BODY_MESSAGE = `Invalid request. Body must be array of answers of shape {"questionId": string, "content": string}`

const router = Router()

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const submissions = await AppDataSource.getRepository(Submission).find({
    relations: {
      answers: true,
    },
  })
  res.status(200).send(submissions)
})

router.post('/', async (req, res) => {
  if (!Array.isArray(req.body)) {
    res.status(400).send(INVALID_BODY_MESSAGE)
    return
  }

  if (req.body.find((element) => !isAnswerDto(element))) {
    res.status(400).send(INVALID_BODY_MESSAGE)
    return
  }

  const validationResult = validate(req.body, form)

  if (validationResult.hasErrors) {
    res.status(400).send(validationResult.errorMessages)
    return
  }

  const submission = await createSubmission(req.body)

  res.status(201).send(submission)
})

export { router }
