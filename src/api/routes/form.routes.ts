import { Router, Request, Response } from 'express'
import { form } from '../../domain/form'

const router = Router()

router.get('/', (req: Request, res: Response): void => {
  res.status(200).send(form)
})

export { router }
