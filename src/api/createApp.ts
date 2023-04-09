import express, { Application } from 'express'

import 'reflect-metadata'
import { router as formRoutes } from './routes/form.routes'
import { router as submissionRoutes } from './routes/submission.routes'
import { AppDataSource } from '../infra/datasource'
import bodyParser from 'body-parser'

export const createApp = async () => {
  await AppDataSource.initialize() // shouldn't be here
  const app: Application = express()

  app.use(bodyParser.json())

  app.use('/form', formRoutes)

  app.use('/submissions', submissionRoutes)

  return app
}
